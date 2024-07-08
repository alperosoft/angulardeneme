import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderComponent} from "../../layouts/full/header/header.component";
import {UserService} from "../../services/users.service";
import {ToastrService} from "ngx-toastr";
import {
  DxButtonModule, DxCheckBoxModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxFormModule, DxListModule, DxSelectBoxModule,
  DxTreeViewModule
} from "devextreme-angular";
import {
  DxiColumnModule,
  DxoFilterRowModule,
  DxoPagingModule,
  DxoScrollingModule,
  DxoSelectionModule
} from "devextreme-angular/ui/nested";
import {MenuService} from "../../services/menu.service";
import {MenuItem} from "../../models/menunew";
import {distinct, map, Observable, of, pipe, toArray} from "rxjs";
import {type} from "devextreme/core/utils/type";
import {DemoMaterialModule} from "../../demo-material-module";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {CheckboxChangeEvent} from "primeng/checkbox";

@Component({
  selector: 'app-yetkilendirme',
  standalone: true,
  imports: [CommonModule, AppHeaderComponent, DxDataGridModule, DxDropDownBoxModule, DxiColumnModule, DxoFilterRowModule, DxoPagingModule, DxoScrollingModule, DxoSelectionModule, DxFormModule, DxButtonModule, DxTreeViewModule, DxListModule, DxSelectBoxModule, DxCheckBoxModule, DemoMaterialModule],
  templateUrl: './yetkilendirme.component.html',
  styleUrl: './yetkilendirme.component.scss'
})
export class YetkilendirmeComponent implements OnInit {
  isGridBoxOpenedComboUser = false;
  gridBoxValueComboUser: number[];
  @ViewChild('list') list: ElementRef;

  users: any[] = [];
  anaMenu: MenuItem[] = [];
  altMenu: MenuItem[] = [];
  altMenuRecovery: any[] = [];

  altMenuTanimlamalarRecovery: any[] = [];
  altMenuTanimlamalar: any[] = [];

  arrayObservable$: Observable<any[]>;

  menuitem: MenuItem;
  menuitem2: MenuItem;
  value: any;


  tanimlamalarAnamenuTitle: any = "";
  tanimlamalarAltMenuTitle?: any;

  constructor(private userService: UserService,
              private menunewService: MenuService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getMenunew();
  }

  gridBox_displayExprUser = (data) => {
    return data && data.us_ad ? `${data.us_ad}` : '';
  };

  protected onGridBoxValueChangedUser(e: any) {
  }

  protected onCheckBoxChangeAnaMenu(e: MatCheckboxChange, data: any) {
    this.anaMenuSelectedStateChangeMethod(data, e.checked);
  }

  protected anaMenuSelectedStateChangeMethod(data: any, state: boolean) {
    //Ana Menu...
    this.anaMenu.filter((menuItem: MenuItem) => menuItem.id === data.id).map(x => {
      x.selected = state;
    });

    //Alt Menu ve Tanımlamalar...
    data.items.map((r: any) => {
      this.altMenuRecovery.map(res => {
        for (let item of res) {
          if (item.id.startsWith(r.id)) {
            item.selected = state;
            item.items.map((data: any) => {
              data.selected = state;
              this.altMenuTanimlamalarRecovery.filter(f => f.id.startsWith(data.id)).map(tanim => {
                tanim.selected = state;
              });
            });
          }
        }
      });
    });

    //Alt Menu Bind işlemi...
    this.altMenu = [];
    this.altMenuRecovery.map(res => {
      for (let item of res) {
        if (item.id.startsWith(`${data.id}_`)) {
          this.altMenu.push({...item});
        }
      }
    });
  }

  protected onCheckBoxChangeAltMenu(e: MatCheckboxChange, data: any) {
    this.altMenuSelectedStateChangeMethod(data, e.checked);
  }

  protected altMenuSelectedStateChangeMethod(data: any, state: boolean) {
    this.altMenuRecovery.flatMap(item => {
      item.filter((f: MenuItem) => f.id === data.id).map((m: MenuItem) => {
        m.selected = state
      });
    });

    this.altMenuTanimlamalarRecovery.filter(f => f.id.startsWith(data.id)).map((tanim: MenuItem) => {
      tanim.selected = state;
    });

    const modifiedAnaMenuId = data.id.split('_');
    const filteredItems = this.altMenuRecovery.flatMap((item) =>
      item.filter((f: any) => f.id.startsWith(`${modifiedAnaMenuId[0]}_`))
    );
    const totalLength = filteredItems.filter(f => f.id.startsWith(`${modifiedAnaMenuId[0]}_`)).length;
    const checkedControl = filteredItems.filter(f => f.id.startsWith(`${modifiedAnaMenuId[0]}_`)).filter(item => item.selected).length;
    const uncheckedControl = filteredItems.filter(f => f.id.startsWith(`${modifiedAnaMenuId[0]}_`)).filter(item => !item.selected).length;
    if ((totalLength === checkedControl) || (totalLength === uncheckedControl) || ((totalLength - checkedControl) === 0) || (state && (checkedControl) === 1)) {
      this.anaMenu.filter(x => x.id === modifiedAnaMenuId[0]).map((x: MenuItem) => {
        x.selected = state;
      })
    }
  }
  protected onCheckBoxChangeTanimlamalar(e: MatCheckboxChange, data: any) {
    this.tanimlamalarSelectedStateChangeMethod(data, e.checked);
  }

  protected tanimlamalarSelectedStateChangeMethod(data: any, state: boolean) {
    const masterNumber = data.id.replace(/_[^_]+$/, ''); //Girdi:1_2_5 Çıktı:1_2 master numarası
    this.altMenuTanimlamalarRecovery.filter(f => f.id === data.id).map(tanim => {
      tanim.selected = state;
    });

    const totalLength = this.altMenuTanimlamalarRecovery.filter(f => f.id.startsWith(masterNumber)).length;
    const checkedControl = this.altMenuTanimlamalarRecovery.filter(f => f.id.startsWith(masterNumber)).filter(item => item.selected).length;
    const uncheckedControl = this.altMenuTanimlamalarRecovery.filter(f => f.id.startsWith(masterNumber)).filter(item => !item.selected).length;
    if ((totalLength === checkedControl) || (totalLength === uncheckedControl) || ((totalLength - checkedControl) === 0) || (state && (checkedControl) === 1)) {
      this.changeSubStateTanimlamalar(state, masterNumber)
    }
  }

  protected changeSubStateTanimlamalar(state: boolean, masterNumberAltMenu: any) {
    const modifiedAnaMenuId = masterNumberAltMenu.split('_');

    this.altMenuRecovery.map(item => {
      item.filter((f: any) => f.id.startsWith(masterNumberAltMenu)).map((m: any) => {
        m.selected = state;
      });
    });

    const filteredItems = this.altMenuRecovery.flatMap(item =>
      item.filter((f: any) => f.id.startsWith(`${modifiedAnaMenuId[0]}_`))
    );
    const totalLength = filteredItems.filter(f => f.id.startsWith(`${modifiedAnaMenuId[0]}_`)).length;
    const checkedControl = filteredItems.filter(f => f.id.startsWith(`${modifiedAnaMenuId[0]}_`)).filter(item => item.selected).length;
    const uncheckedControl = filteredItems.filter(f => f.id.startsWith(`${modifiedAnaMenuId[0]}_`)).filter(item => !item.selected).length;

    if ((totalLength === checkedControl) || (totalLength === uncheckedControl) || ((totalLength - checkedControl) === 0) || (state && (checkedControl) === 1)) {
      this.changeSubState(state, modifiedAnaMenuId[0]);
    }

    this.altMenu = [];
    this.altMenuRecovery.map((res: any) => {
      for (let item of res) {
        if (item.id.startsWith(`${modifiedAnaMenuId[0]}_`)) {
          this.altMenu.push({...item});
        }
      }
    });
  }

  //Ana menü state...
  protected changeSubState(state: boolean, masterNumberAltMenu: any) {
    this.anaMenu.filter((f: MenuItem) => f.id === masterNumberAltMenu).map((m: MenuItem) => {
      m.selected = state;
    });
  }

  protected onMouseMoveAnaMenu(event: MouseEvent) {
    const hoveredElement = event.target as HTMLElement;
    const trim = hoveredElement.innerText;
    const text = trim.trim();
    if (this.value !== text) {
      this.value = text;
      const itemElement = hoveredElement.querySelector(".list-item");
      if (itemElement) {
        this.altMenu = [];
        const id = itemElement.getAttribute('data-id');
        //const menuPrimno = itemElement.getAttribute('data-menuprimno');
        //this.tanimlamalarAnamenuTitle = text;
        this.altMenuRecovery.map(res => {
          for (let item of res) {
            if (item.id.startsWith(`${id}_`)) {
              this.altMenu.push({...item});
              //this.altMenuTanimlamalar = [];
              //this.altMenuTanimlamalar = this.altMenuTanimlamalarRecovery.filter(f => f.id.startsWith(`${id}_1`))
            }
          }
        });
      }
    }
  }

  protected onMouseMoveAltMenu(event: MouseEvent) {
    const hoveredElement = event.target as HTMLElement;
    const trim = hoveredElement.innerText;
    const text = trim.trim();

    const itemElement = hoveredElement.querySelector(".list-item-alt-menu");
    if (itemElement) {

      //this.tanimlamalarAltMenuTitle=text;

      this.altMenuTanimlamalar = [];
      const id = itemElement.getAttribute('data-id-alt-menu');
      const menuPrimno = itemElement.getAttribute('data-alt-menu');
      this.altMenuTanimlamalar = this.altMenuTanimlamalarRecovery.filter(f => f.id.startsWith(`${id}`))
    }
  }

  private getMenunew(): void {
    this.menunewService.getYetkilendirme().subscribe(x => {
        if (!x) {
          this.toastr.info('Veri bulunamadı', 'Bilgi', {
            positionClass: 'toast-top-right',
          });
        } else {
          if (x.statusCode === 200) {
            x.data.map((response) => {
              this.anaMenu.push({...response});
              this.altMenuRecovery.push(response.items);

              this.altMenuRecovery.map(x => {
                for (let item of x) {
                  const result = {...item};
                  result.items.map(x => {
                    this.altMenuTanimlamalarRecovery.push({...x})
                  });
                  this.arrayObservable$ = of(...this.altMenuTanimlamalarRecovery).pipe(distinct(item => item.id));
                  this.altMenuTanimlamalarRecovery = [];
                  this.arrayObservable$.pipe(toArray()).subscribe(
                    (uniqueItems: any[]) => {
                      this.altMenuTanimlamalarRecovery = uniqueItems;
                      //console.log(JSON.stringify(this.altMenuTanimlamalarRecovery));
                    }
                  );
                }
              });
            });
          } else if (x.statusCode === 500) {
            this.toastr.error('Bir hata oluştu!', 'Hata', {
              positionClass: 'toast-top-right',
            });
          }
        }
      },
      error => {
        this.toastr.error('Bir hata oluştu!', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(x => {
        if (!x) {
          this.toastr.info('Veri bulunamadı(Kullanıcı)', 'Bilgi', {
            positionClass: 'toast-top-right',
          });
        } else {
          if (x.statusCode === 200) {
            this.users = x.data;
          } else if (x.statusCode === 500) {
            this.toastr.error('Bir hata oluştu!(Kullanıcı)', 'Hata', {
              positionClass: 'toast-top-right',
            });
          }
        }
      },
      error => {
        this.toastr.error('Bir hata oluştu!(Kullanıcı)', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }
}

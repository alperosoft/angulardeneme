import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {DemoMaterialModule} from "../../demo-material-module"
import {ToastrService} from 'ngx-toastr';
import * as Constants from 'src/app/modals/cari-hesap-tanitimi/constants';
import { Firma } from 'src/app/models/firma';
import { DxTabsModule } from 'devextreme-angular';
import { FirmaService } from 'src/app/services/firma.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { GnstrService } from 'src/app/services/gnstr.service';
import { DovizService } from 'src/app/services/doviz.service';
import { PersonelService } from 'src/app/services/personel.service';
import { AmbalajService } from 'src/app/services/ambalaj.service';
import { FirmaDistService } from 'src/app/services/firmadist.service';
import { FirmagrpService } from 'src/app/services/firmagrp.service';
import { BankaService } from 'src/app/services/banka.service';

@Component({
  selector: 'app-cari-hesap-tanitimi',
  standalone: true,
  imports: [CommonModule, DemoMaterialModule, FormsModule, DxTabsModule],
  templateUrl: './cari-hesap-tanitimi.component.html',
  styleUrl: './cari-hesap-tanitimi.component.scss'
})
export class CariHesapTanitimiModalComponent {

  @Output() update = new EventEmitter<void>();

  responseData: any[] = [];
  saveAs: string = '';
  Constants = Constants;
  tabsWithText = Constants.tabsWithText;
  selectedIndex = 0;

  firma: Firma = new Firma(); 
  
  constructor(
    private dialogRef: MatDialogRef<CariHesapTanitimiModalComponent>,
    private toastr: ToastrService,
    private firmaService: FirmaService,
    private gnstrService: GnstrService,
    private dovizService: DovizService,
    private personelService: PersonelService,
    private ambalajService: AmbalajService,
    private distFirmaService: FirmaDistService,
    private firmagrpService: FirmagrpService,
    private bankaService: BankaService,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
  }

  ngOnInit(): void {

    this.firma.frm_yok = 0;
    this.firma.frm_stop = 0;
    this.firma.frm_ode_tip = 0;
    this.firma.frm_t3 = 0;
    this.firma.frm_nak_bedeli = 0;
    this.firma.frm_ahes_asim = 0;
    this.firma.frm_kcek_asim = 0;
    this.firma.frm_mcek_asim = 0;
    this.firma.frm_irs_asim = 0;
    this.firma.frm_sips_asim = 0;
    this.firma.frm_sipo_asim = 0;
    this.firma.frm_t1 = 0;
    this.firma.frm_frmd_kod = "";

    this.firma.frm_ahes = 0;
    this.firma.frm_kcek = 0;
    this.firma.frm_mcek = 0;
    this.firma.frm_irs = 0;
    this.firma.frm_sips = 0;
    this.firma.frm_sipo = 0;

    if(this.data) {
      this.firmaService.getFirma(this.data).subscribe(
        (response: any) => {
        if (response) {
          const data = response.data[0];
          this.firma={...data};
        } else {
          this.toastr.info('Kayıt yok.', ' ', {
            positionClass: 'toast-top-right',
          });
        }
      });
    };


    forkJoin([
      this.gnstrService.getGnstr(),
      this.dovizService.getDoviz(),
      this.personelService.getPersonel(),
      this.ambalajService.getAmbalaj(),
      this.distFirmaService.getDistFirma(),
      this.firmagrpService.getFirmagrp(),
      this.bankaService.getBanka(),
      this.gnstrService.getGnstr4(),
    ]).subscribe(
      (responses: any[]) => {
        this.responseData = responses.map((response) =>
          response.data ? response.data : response.json ? response.json : response,
        );   
        
        // Process PersonelService
        Constants.personel.push(
          ...responses[2].map((res: any) => ({
            value: Number(res.per_no),
            viewValue: res.per_ad + ' ' + res.per_soyad,
          })),
        );

      },
      (error) => {
        console.error('İstek çekme hatası:', error);
      },
    );
  }

  onCheckboxValueChanged(e: any, key: string) {
    this.firma[key] = e.value ? 1 : 0;
  }

  onClose() {
    this.dialogRef.close();
  }

  onFirmaAdiChange() {
    this.firma.frm_ksad = this.firma.frm_ad.substring(0, 15);
  }

  onTabClick(event: any): void {
    this.selectedIndex = event.itemIndex;
  }

  next() {
    this.firmaService.next(this.firma.frm_kod)
      .subscribe((x) => {
        if (x) {
          if (x.statusCode === 200) {
            this.firma={...x.data[0]};
          }
        }
      }, error => {
        if (error.error && error.error.error.includes("no elements")) {
          this.toastr.error('Böyle bir kayıt bulunamadı.', 'Hata', {
            positionClass: 'toast-top-right',
          });
         } else {
        this.toastr.error('Hata gerçekleşti', 'Hata', {
          positionClass: 'toast-top-right',
        });
      }
      });
  }

  previous() {
    this.firmaService.previous(this.firma.frm_kod)
      .subscribe((x) => {
        if (x) {
          if (x.statusCode === 200) {
            this.firma={...x.data[0]};
          }
        }
      }, error => {
        this.toastr.error('Hata gerçekleşti', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }

  onSave(): void {
    if(this.data) {
      this.firma.Where = { frm_kod: this.firma.frm_kod };
      this.firma.updt = new Date();
      this.firma.idt = this.firma.idt;
      this.firmaService.put(this.firma).subscribe(
        (response) => {
          console.warn(response);
          this.toastr.success('Başarıyla kayıt güncellendi!', '', {
            positionClass: 'toast-top-right',
          });
        },
        (error) => {
            this.toastr.error('Kayıt oluşturulurken hata çıktı!', 'Hata', {
              positionClass: 'toast-top-right',
            });;
        },
      );
    } else {
      this.firma.updt = new Date();
      this.firma.idt = new Date();
       this.firmaService.post(this.firma).subscribe(
        (response) => {
          console.warn(response);
          this.toastr.success('Başarıyla kayıt oluşturuldu!');
        },
        (error) => {
          if (error.error && error.error.errors.includes("unique")) {
            this.toastr.error('Bu firma kodunu kullanan başka bir kayıt mevcut.', 'Hata', {
              positionClass: 'toast-top-right',
            });
           } else {
          this.toastr.error('Kayıt oluşturulurken hata çıktı!', 'Hata', {
            positionClass: 'toast-top-right',
          });
           }
        },
      );
    }
  }

  onDelete(): void {
    if(!this.data) {
      this.toastr.error('Silinecek bir kayıt yok!', 'Hata', {
        positionClass: 'toast-top-right',
      });
    }
    if (confirm("Kayıtı silmek istediğinden emin misin?")) {
      this.firmaService.delete(this.data).subscribe(
        (response) => {
          console.warn(response);
          this.toastr.success('Başarıyla kayıt güncellendi!', '', {
            positionClass: 'toast-top-right',
          });
        },
        (error) => {
          console.warn(error);
          this.toastr.error('Kayıt oluşturulurken hata çıktı!', 'Hata', {
            positionClass: 'toast-top-right',
          });
        },
      );
  }
  }

}

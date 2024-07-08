import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Recete } from '../../models/recete';
import {
  DxChartModule,
  DxSelectBoxModule,
  DxChartComponent,
  DxRangeSelectorModule,
  DxPieChartModule,
  DxGanttModule,
  DxTreeMapModule,
  DxMenuModule,
  DxCheckBoxModule,
} from 'devextreme-angular';

import { FilterModel } from 'src/app/models/filter';
import { Stkfd } from 'src/app/models/stkfd';
import { Spwo } from 'src/app/models/spwo';
import { Sevkiyat } from 'src/app/models/sevkiyat';
import { Colors } from 'src/app/models/colors';
import { AppHeaderComponent } from '../../layouts/full/header/header.component';
import { SignalRService } from 'src/app/services/signalr.service';
import { FormatDateMethod } from 'src/app/global_methods/format-date.method';
import { KillJobMethod } from 'src/app/global_methods/killjob.method';
import {RaporModalComponent} from "../../modals/rapor-modal/rapor-modal.component";
import { Spd } from 'src/app/models/spd';

@Component({
  selector: 'app-aluminyum-rapor', // HTML şablonunda kullanılacak etiket adı
  standalone: true,
  templateUrl: './aluminyum-rapor.component.html', // Component'in HTML şablonunun belirlenmesi
  styleUrls: ['./aluminyum-rapor.component.scss'], // Component'e ait CSS stil dosyalarının belirlenmesi
  preserveWhitespaces: true,
  imports: [
    DemoMaterialModule,
    CommonModule,
    DxChartModule,
    DxSelectBoxModule,
    DxRangeSelectorModule,
    DxPieChartModule,
    DxGanttModule,
    DxTreeMapModule,
    DxMenuModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    AppHeaderComponent,
  ],
})
export class AluminyumRaporComponent implements OnInit {
  @ViewChild(DxChartComponent, { static: false }) chart: DxChartComponent;

  recete: Recete[];

  siparisDagilim: Spd[];

  sevkiyatDagilim: Sevkiyat[];

  aylikSevkiyatDagilim: Sevkiyat[];

  stkfd: Stkfd[];

  sevkiyatFason: Sevkiyat[];

  sevkiyatSatis: Sevkiyat[];


  uretim: Spwo[];

  filterValues: FilterModel = {};

  gelenRenk: Colors[];

  onayRenk: Colors[];

  tarihAraligi: string;
  toplamGelenUrun: number;
  toplamUretim: number;
  toplamSevkiyatFason: number;
  toplamSevkiyatSatis: number;
  toplamRecete: number;

  isLoading: boolean = false;
  us_kod: string = '';

  monthNames: { [key: number]: string } = {
    1: 'Ocak',
    2: 'Şubat',
    3: 'Mart',
    4: 'Nisan',
    5: 'Mayıs',
    6: 'Haziran',
    7: 'Temmuz',
    8: 'Ağustos',
    9: 'Eylül',
    10: 'Ekim',
    11: 'Kasım',
    12: 'Aralık'
  };

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private signalRService: SignalRService,
    private formatDate: FormatDateMethod,
    private killJobMethod: KillJobMethod
  ) {
    this.openSuzDialog();
  }

  customNumberFormat(value: any): string {
    const formatter = new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  }

  ngOnInit(): void {
    this.signalRService.connectHub();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.killJobMethod.killJob()
  }

  openSuzDialog() {
    const dialogRef = this.dialog.open(RaporModalComponent, {
      width: '530px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((submit) => {
      if (submit) {
        this.filterValues = submit;
        this.tarihAraligi = `${this.formatDate.FormatDate(
          'YYYY/MM/DD',
          this.filterValues.filterValue60,
        )} / ${this.formatDate.FormatDate(
          'YYYY/MM/DD',
          this.filterValues.filterValue61,
        )}`;
        this.isLoading = true;

        this.us_kod = this.filterValues.filterValue21;

        this.getHubData();
      } else {
        this.toastr.error('Hata oluştu');
      }
    });
  }

  getHubData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.signalRService.StartJob(this.filterValues).subscribe(
        (response) => {
          this.signalRService.receiveData(this.filterValues.filterValue21);

          this.signalRService.receivedData.subscribe({
            next: (data) => {
              console.log('gvbhnj')
              this.isLoading = false;

              this.recete = data.receteDTO.map((item) => {
                if (item.rt_turu === 'N') {
                  item.rt_turu = 'Normal';
                } else if (item.rt_turu === 'V') {
                  item.rt_turu = 'İlave';
                } else if (item.rt_turu === 'S') {
                  item.rt_turu = 'Söküm';
                } else if (item.rt_turu === 'T') {
                  item.rt_turu = 'Tamir';
                }
                return item;
              });
              this.toplamRecete = data.receteDTO.reduce((total, item) => {
                return total + item.cmpt_bakiye_kg;
              }, 0);

              this.uretim = data.spwoUretimDTO;
              this.toplamUretim = data.spwoUretimDTO.reduce((total, item) => {
                return total + item.cmpt_mkt_kg;
              }, 0);

              this.sevkiyatFason = data.sevkiyatFasonDTO;
              this.toplamSevkiyatFason = data.sevkiyatFasonDTO.reduce(
                (total, item) => {
                  return total + item.total_cmpt_mkt_kg;
                },
                0,
              );

              this.sevkiyatSatis = data.sevkiyatSatisDTO;
              this.toplamSevkiyatSatis = data.sevkiyatSatisDTO.reduce(
                (total, item) => {
                  return total + item.total_cmpt_mkt_kg;
                },
                0,
              );

              this.stkfd = data.stkfdGelenUrunDTO;
              this.toplamGelenUrun = data.stkfdGelenUrunDTO.reduce(
                (total, item) => {
                  return (
                    total + (item.total_fason_kg + item.total_satin_alim_kg)
                  );
                },
                0,
              );

              this.gelenRenk = data.gelenRenkDTO;
              this.onayRenk = data.onayRenkDTO;

              this.siparisDagilim = data.siparisDagilimData;
              this.sevkiyatDagilim = data.sevkiyatDagilimData;
              this.aylikSevkiyatDagilim = data.aylikSevkiyatDagilimData.map((item)=>{
                if (item.sfd_ay) {
                  item.sfd_ay = this.monthNames[item.sfd_ay] || 'Unknown';
                }
                return item;
              });
              console.warn(data)
              console.log(this.aylikSevkiyatDagilim)

              resolve();
            },
            error: (error) => {
              console.error('Error occurred in SignalR:', error);
              reject();
            },
            complete: () => {
              console.log('SignalR subscription completed');
              reject();
            },
          });
        },
        (error) => {
          console.log('Error while starting job.', error);
          reject();
        },
      );
    });
  }
}

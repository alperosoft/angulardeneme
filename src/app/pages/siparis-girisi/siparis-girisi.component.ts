import { CommonModule, DatePipe } from '@angular/common';
import { concatMap, forkJoin, isEmpty } from 'rxjs';
import { PersonelService } from '../../services/personel.service';
import { SpService } from '../../services/sp.service';
import { ModalFirmaComponent } from '../../modals/firma/firma.component';
import { ModalFirmaDistComponent } from '../../modals/firmadist/firmadist.component';
import { ToastrService } from 'ngx-toastr';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DemoMaterialModule } from '../../demo-material-module';
import { GnstrService } from '../../services/gnstr.service';
import { SpkategService } from '../../services/spkateg.service';
import { LbService } from '../../services/lb.service';
import { FirmaService } from '../../services/firma.service';
import { Sp } from '../../models/sp';
import { tableIdService } from '../../services/tableId.service';
import { ModalFisnoTableComponent } from 'src/app/modals/fis-no/table/modal.component';
import { FirmadrService } from 'src/app/services/firmadr.service';
import {
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxListModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextAreaModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { FirmaDistService } from 'src/app/services/firmadist.service';
import { daysAfter, formatDate } from 'src/app/utils/formattedDate';
import * as Constants from './constants';
import { AppHeaderComponent } from '../../layouts/full/header/header.component';
import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TableSiparisDetayComponent } from 'src/app/pages/siparis-girisi-detay/siparis-girisi-detay.component';
import { Stkf } from '../../models/stkf';

@Component({
  selector: 'app-siparis-girisi',
  standalone: true,
  imports: [
    CommonModule,
    AppHeaderComponent,
    DemoMaterialModule,
    TableSiparisDetayComponent,
    NgScrollbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxTextAreaModule,
    DxDropDownBoxModule,
    DxListModule,
  ],
  templateUrl: './siparis-girisi.component.html',
  styleUrl: './siparis-girisi.component.scss',
})
export class SiparisGirisiComponent implements OnInit {
  depo = 30;
  bicimNo = 150;
  yil = new Date().getFullYear();
  sirketNo = Number(localStorage.getItem('srk_no'));
  kullaniciKodu = localStorage.getItem('kullanici_adi');

  responseData: any[] = [];
  Constants = Constants;
  spOnay: string;
  spFatura: string;
  spTarih: string;
  spPrimno: number;
  days: number;
  frm = { frm_ksad: '', frm_kod: '', frmd_kod: '' };

  @ViewChild(TableSiparisDetayComponent, { static: false })
  siparisGirisiDetayComponent: TableSiparisDetayComponent;

  Values: Sp = {
    sp_srk_no: Number(localStorage.getItem('srk_no')),
    sp_bcmno: 150,
    sp_bitis: 'A',
    sp_sde_no: 51,
    sp_gsip_yil: 0,
    sp_gsip_no: 0,
    uk: this.kullaniciKodu,
    iuk: this.kullaniciKodu,
    sp_onay: 'H',
    sp_dept_no: 0,
    sp_per_no2: 0,
    sp_siptrh: new Date(),
    sp_frm_kod: '',
    sp_veren: '',
    sp_no1: this.yil,
    sp_no2: 0,
    sp_ihrc_tip: '',
    sp_cikis_trh: new Date(),
    sp_yuktrh: new Date(),
    sp_per_no: 0,
    sp_ode_plan: '',
    sp_aciklama1: '',
    sp_frmd_kod: '',
    sp_sk_kod: '',
    sp_label_kod: '',
    sp_liste: null,
    sp_st_kod: '',
    sp_referans: '',
    sp_fad_id: 0,
    sp_teslim: '',
    sp_asp_id: null,
    sp_dosya: '',
    sp_aciklama: '',
    sp_sevk_adres: '',
    sp_svkfrm_id: 0,
    sp_primno: 0,
    sp_afrm_id: 0,
    sp_rev: 0,
    updt: null,
    idt: null,
  };

  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private lbService: LbService,
    private spService: SpService,
    private toastr: ToastrService,
    private gnstrService: GnstrService,
    private firmaService: FirmaService,
    private spkategService: SpkategService,
    private firmadrService: FirmadrService,
    private tableIdService: tableIdService,
    private personelService: PersonelService,
    private firmaDistService: FirmaDistService,
  ) {}

  lbObservable = this.lbService.getLb();
  gnstrObservable = this.gnstrService.getGnstr();
  spkategObservable = this.spkategService.getSpkateg();
  personelObservable = this.personelService.getPersonel();

  ngOnInit() {
    this.Values.sp_st_kod = 'S';
    this.Values.sp_sk_kod = 'İÇP';

    forkJoin([
      this.gnstrObservable,
      this.spkategObservable,
      this.lbObservable,
      this.personelObservable,
    ]).subscribe(
      (responses: any[]) => {
        this.responseData = responses.map((response) =>
          response.data ? response.data : response,
        );

        responses[3].map((res) => {
          Constants.personel.push({
            value: Number(res.per_no),
            viewValue: res.per_ad + ' ' + res.per_soyad,
          });
        });
      },
      (error) => {
        console.error('İstek çekme hatası:', error);
      },
    );
  }

  onSevkAdres(frm_kod: any): void {
    this.firmadrService.getFirmadr(frm_kod).subscribe(
      (response: any) => {
        response.data.map((res) => {
          Constants.sevkAdresi.push({
            value: res.fad_id,
            viewValue: res.fad_tnm,
          });
        });
      },
      (error) => {
        console.error('Firmadr çekme hatası:', error);
      },
    );
  }

  onProje(frm_kod: any): void {
    this.spService.getSp(frm_kod).subscribe(
      (response: any) => {
        response.data.map((res) => {
          Constants.proje.push({
            value: res.sp_primno,
            viewValue: res.sp_aciklama,
          });
        });
      },
      (error) => {
        console.error('Firmadr çekme hatası:', error);
      },
    );
  }

  onInputChange() {
    sessionStorage.setItem('spValues', JSON.stringify(this.Values));
  }

  onFirma(frm_kod: any): void {
    this.firmaService.getFirma(frm_kod).subscribe(
      (response: any) => {
        response.data.map((res) => {
          this.Values.sp_frm_kod = res.frm_kod;
          this.Values.sp_per_no = res.frm_per_no;
          this.Values.sp_veren = res.frm_yetkili;
          this.frm.frm_ksad = res.frm_ksad;
          this.frm.frm_kod = res.frm_kod;
          this.onProje(res.frm_kod);
          this.onSevkAdres(res.frm_kod);
          this.onDistFirma(res.frm_frmd_kod);
          this.gnstrService.getGnstr3(res.frm_ode_id).subscribe((res: any) => {
            this.Values.sp_ode_plan = res.data;
          });
        });
      },
      (error) => {
        console.error('Firma çekme hatası:', error);
      },
    );
  }

  onDistFirma(frmd_kod: any): void {
    if (frmd_kod !== '') {
      this.firmaDistService.getFirmaDist(frmd_kod).subscribe(
        (res: any) => {
          this.Values.sp_frmd_kod = frmd_kod;
          this.frm.frmd_kod = res.data;
        },
        (error) => {
          console.error('Firma çekme hatası:', error);
        },
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalFirmaComponent, {
      backdropClass: 'custom-backdrop',
      width: '100%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.onFirma(result.frm_kod);
    });
  }

  openFirmadistDialog(): void {
    const dialogRef = this.dialog.open(ModalFirmaDistComponent, {
      backdropClass: 'custom-backdrop',
      width: '100%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.frmd_kod === '') {
        this.Values.sp_frmd_kod = '';
        this.frm.frmd_kod = '';
      } else {
        this.onDistFirma(result.frmd_kod);
      }
    });
  }

  openFisnoDialog(): void {
    const dialogRef = this.dialog.open(ModalFisnoTableComponent, {
      backdropClass: 'custom-backdrop',
      width: '100%',
      data: {},
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close('');
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) this.onFisNo(result.spd_no2);
    });
  }

  onDateChange(event: any): void {
    this.onInputChange();
  }

  onDateChangeOnerilenTarih(event: any): void {
    const selectedDate = event.value;
    if (selectedDate) {
      this.Values.sp_cikis_trh = this.datePipe.transform(
        selectedDate,
        'yyyy-MM-dd',
      );
    }

    this.onInputChange();
  }

  onDateChangeSiparisTarihi(event: any): void {
    const selectedDate = event.value;
    if (selectedDate) {
      this.Values.sp_siptrh = this.datePipe.transform(
        selectedDate,
        'yyyy-MM-dd',
      );
    }

    this.onInputChange();
  }

  onFisNo(spd_no: any): void {
    this.Values.sp_no2 = isNaN(spd_no) ? 0 : spd_no;
    this.spService
      .getSpSp(Number(this.Values.sp_no1), Number(spd_no))
      .subscribe((response: any) => {
        response.data.map((item: any) => {
          this.Values = {
            //sp_siptrh: new Date(item.sp_siptrh),
            sp_siptrh: this.datePipe.transform(item.sp_siptrh, 'yyyy-MM-dd'),
            sp_frm_kod: item.sp_frm_kod,
            sp_veren: item.sp_veren,
            sp_no1: item.sp_no1,
            sp_no2: item.sp_no2,
            sp_ihrc_tip: item.sp_ihrc_tip,
            sp_cikis_trh: item.sp_cikis_trh == null ? null : item.sp_cikis_trh,
            sp_yuktrh: item.sp_yuktrh == null ? null : item.sp_yuktrh,
            sp_per_no: item.sp_per_no,
            sp_ode_plan: item.sp_ode_plan,
            sp_aciklama1: item.sp_aciklama1,
            sp_frmd_kod: item.sp_frmd_kod,
            sp_sk_kod: item.sp_sk_kod,
            sp_label_kod: item.sp_label_kod,
            sp_liste: item.sp_liste,
            sp_st_kod: item.sp_st_kod,
            sp_referans: item.sp_referans,
            sp_fad_id: item.sp_fad_id,
            sp_teslim: item.sp_teslim,
            sp_asp_id: item.sp_asp_id,
            sp_dosya: item.sp_dosya,
            sp_aciklama: item.sp_aciklama,
            sp_sevk_adres: item.sp_sevk_adres,
            sp_primno: item.sp_primno,
            sp_frm_ksad: item.sp_frm_ksad,
            sp_srk_no: item.sp_srk_no,
            sp_bcmno: item.sp_bcmno,
            sp_gsip_yil: item.sp_gsip_yil,
            sp_gsip_no: item.sp_gsip_no,
            sp_aciklama2: item.sp_aciklama2,
            sp_svkfrm_id: item.sp_svkfrm_id,
          };

          // this.spOnay =
          //   item.sp_onay == 'E' ? 'Onaylı' : 'H' ? 'Onaysız' : 'İptal';
          // // this.spFatura = `Teklif No: ${item.sp_gsip_yil}.${item.sp_gsip_no} Rev: ${item.sp_rev}`;
          // this.spTarih = item.sp_onaytrh2
          //   ? formatDate(item.sp_onaytrh2) + ' müşteri onaylamıştır.'
          //   : '';
          // this.spPrimno = item.sp_primno;
          //
          // this.days = daysAfter(
          //   new Date(item.sp_siptrh),
          //   new Date(item.sp_yuktrh),
          // );
          // this.onFirma(item.sp_frm_kod);
          // this.onDistFirma(item.sp_frmd_kod);
        });
      });
  }

  add() {
  
    if (
      this.Values.sp_st_kod.trim() !== '' &&
      this.Values.sp_per_no !== 0 &&
      this.Values.sp_siptrh !== '' &&
      this.Values.sp_frm_kod.trim() !== '' &&
      this.Values.sp_sk_kod.trim() !== '' &&
      this.Values.sp_liste !== 0 &&
      this.Values.sp_yuktrh !== '' &&
      this.Values.sp_dosya !== '0'
    ) {
      const model = sessionStorage.getItem('spValues');
      const parsedModel = JSON.parse(model);
      let primno =
        parsedModel.sp_primno !== undefined ? Number(parsedModel.sp_primno) : 0;
      let no2 =
        parsedModel.sp_no2 !== undefined ? Number(parsedModel.sp_no2) : 0;
      let no1 =
        parsedModel.sp_no1 !== undefined ? Number(parsedModel.sp_no1) : 0;

      if (primno === 0) {
        this.tableIdService
          .getTableId(0, 0, 0, 'sp')
          .pipe(
            concatMap((result1: any) => {
              this.Values.sp_primno = result1[0].f_id + 1;

              this.onInputChange();
              return this.tableIdService.getTableId(
                this.sirketNo,
                this.bicimNo,
                this.yil,
                'sp',
                this.depo.toString(),
                'sp_no2',
              );
            }),
          )
          .subscribe(
            (result2: any) => {
              this.Values.uk = this.kullaniciKodu;
              this.Values.iuk = this.kullaniciKodu;
              this.Values.updt = new Date();
              this.Values.idt = new Date();

              this.Values.sp_asp_id = this.Values.sp_asp_id ?? 0;
              this.Values.sp_no2 = result2[0].f_id;
              this.Values.sp_rev = 0;
              this.onInputChange();

              this.spService
                .InsertSp(JSON.parse(sessionStorage.getItem('spValues')))
                .subscribe(
                  (response) => {
                    this.toastr.success('Kayıt başarılı', '', {
                      positionClass: 'toast-top-right',
                    });
                  },
                  (error) => {
                    this.toastr.error('Eklenirken sorun oluştu');
                  },
                );
            },
            (error) => {
              this.toastr.error('Kayıt sırasında hata gerçekleşti.', 'Hata', {
                positionClass: 'toast-top-right',
              });
            },
          );
      } else {
        this.Values.uk = this.kullaniciKodu;
        this.Values.updt = new Date();

        this.Values.Where = [
          {
            sp_no1: no1,
            sp_no2: no2,
            sp_primno: primno,
          },
        ];

        this.onInputChange();

        this.spService
          .updateSp(JSON.parse(sessionStorage.getItem('spValues')))
          .subscribe(
            (response) => {
              this.toastr.success('Kayıt güncellendi', '', {
                positionClass: 'toast-top-right',
              });
            },
            (error) => {
              console.log(error);
              this.toastr.error('Güncellenirken sorun oluştu');
            },
          );
      }
    } else {
      console.log('doldurun');
    }
  }

  new() {
    if (
      this.Values.sp_st_kod.trim() !== '' &&
      this.Values.sp_per_no !== 0 &&
      this.Values.sp_siptrh.trim() !== '' &&
      this.Values.sp_frm_kod.trim() !== '' &&
      this.Values.sp_sk_kod.trim() !== '' &&
      this.Values.sp_liste !== 0 &&
      this.Values.sp_yuktrh.trim() !== '' &&
      this.Values.sp_dosya !== '0'
    ) {
      this.newForm();
    } else {
      console.log('doldurun');
    }
  }

  newForm() {
    this.Values = {
      sp_srk_no: Number(localStorage.getItem('srk_no')),
      sp_bcmno: 150,
      sp_bitis: 'A',
      sp_sde_no: 51,
      sp_gsip_yil: 0,
      sp_gsip_no: 0,
      uk: localStorage.getItem('kullanici_adi'),
      iuk: localStorage.getItem('kullanici_adi'),
      sp_onay: 'H',
      sp_dept_no: 0,
      sp_per_no2: 0,
      sp_siptrh: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      sp_frm_kod: '',
      sp_veren: '',
      sp_no1: this.yil,
      sp_no2: 0,
      sp_ihrc_tip: '',
      sp_cikis_trh: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      sp_yuktrh: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      sp_per_no: 0,
      sp_ode_plan: '',
      sp_aciklama1: '',
      sp_frmd_kod: '',
      sp_sk_kod: '',
      sp_label_kod: '',
      sp_liste: 0,
      sp_st_kod: '',
      sp_referans: '',
      sp_fad_id: 0,
      sp_teslim: '',
      sp_asp_id: 0,
      sp_dosya: '',
      sp_aciklama: '',
      sp_sevk_adres: '',
      sp_svkfrm_id: 0,
      sp_primno: 0,
      sp_afrm_id: 0,
      sp_rev: 0,
    };
    this.days = 0;
    this.siparisGirisiDetayComponent.newDetail();
  }

  next() {
    const model = sessionStorage.getItem('spValues');
    const parsedModel = JSON.parse(model);
    let spNo2 =
      parsedModel.sp_no2 !== undefined ? Number(parsedModel.sp_no2) : 0;
    let spNo1 =
      parsedModel.sp_no1 !== undefined ? Number(parsedModel.sp_no1) : 0;
    this.spService.next(this.sirketNo, this.bicimNo, spNo2, spNo1).subscribe(
      (x) => {
        if (x) {
          if (x.statusCode === 200) {
            const data = { ...x.data[0] };
            this.setData(data);
          }
        }
      },
      (error) => {
        this.toastr.error('Hata gerçekleşti', 'Hata', {
          positionClass: 'toast-top-right',
        });
      },
    );
  }

  previous() {
    const model = sessionStorage.getItem('spValues');
    const parsedModel = JSON.parse(model);
    let spNo2 =
      parsedModel.sp_no2 !== undefined ? Number(parsedModel.sp_no2) : 0;
    let spNo1 =
      parsedModel.sp_no1 !== undefined ? Number(parsedModel.sp_no1) : 0;

    this.spService
      .previous(this.sirketNo, this.bicimNo, spNo2, spNo1)
      .subscribe(
        async (x) => {
          if (x) {
            if (x.statusCode === 200) {
              const data = { ...x.data[0] };
              await this.setData(data);
            }
          }
        },
        (error) => {
          this.toastr.error('Hata gerçekleşti', 'Hata', {
            positionClass: 'toast-top-right',
          });
        },
      );
  }

  async setData(data: any): Promise<void> {
    if (data.sp_primno !== 0) {
      this.Values = {
        sp_siptrh:
          data.sp_siptrh === null
            ? null
            : this.datePipe.transform(data.sp_siptrh, 'yyyy-MM-dd'),
        sp_frm_kod: data.sp_frm_kod,
        sp_veren: data.sp_veren,
        sp_no1: data.sp_no1,
        sp_no2: data.sp_no2,
        sp_ihrc_tip: data.sp_ihrc_tip,
        sp_cikis_trh:
          data.sp_cikis_trh === null
            ? null
            : this.datePipe.transform(data.sp_cikis_trh, 'yyyy-MM-dd'),
        sp_yuktrh:
          data.sp_yuktrh === null
            ? null
            : this.datePipe.transform(data.sp_yuktrh, 'yyyy-MM-dd'),
        sp_per_no: data.sp_per_no,
        sp_ode_plan: data.sp_ode_plan,
        sp_aciklama1: data.sp_aciklama1,
        sp_frmd_kod: data.sp_frmd_kod,
        sp_sk_kod: data.sp_sk_kod,
        sp_label_kod: data.sp_label_kod,
        sp_liste: data.sp_liste,
        sp_st_kod: data.sp_st_kod,
        sp_referans: data.sp_referans,
        sp_fad_id: data.sp_fad_id,
        sp_teslim: data.sp_teslim,
        sp_asp_id: data.sp_asp_id,
        sp_dosya: data.sp_dosya,
        sp_aciklama: data.sp_aciklama,
        sp_sevk_adres: data.sp_sevk_adres,
        sp_primno: data.sp_primno,
        sp_frm_ksad: data.sp_frm_ksad,
        sp_srk_no: data.sp_srk_no,
        sp_bcmno: data.sp_bcmno,
        sp_gsip_yil: data.sp_gsip_yil,
        sp_gsip_no: data.sp_gsip_no,
        sp_aciklama2: data.sp_aciklama2,
        sp_svkfrm_id: data.sp_svkfrm_id,
      };

      this.spOnay = data.sp_onay == 'E' ? 'Onaylı' : 'H' ? 'Onaysız' : 'İptal';
      // this.spFatura = `Teklif No: ${data.sp_gsip_yil === undefined ? 0 : data.sp_gsip_yil}.${data.sp_gsip_no === undefined ? 0 : data.sp_gsip_no} Rev: ${data.sp_rev === undefined ? 0 : data.sp_rev}`;
      this.spTarih = data.sp_onaytrh2
        ? formatDate(data.sp_onaytrh2) + ' müşteri onaylamıştır.'
        : '';
      this.spPrimno = data.sp_primno;

      const result = daysAfter(
        new Date(data.sp_siptrh),
        new Date(data.sp_yuktrh),
      );
      this.days = isNaN(result) ? 0 : result;

      if (data.sp_frm_kod !== undefined) this.onFirma(data.sp_frm_kod);
      else this.frm.frm_ksad = '';

      if (data.sp_frmd_kod !== undefined) {
        //this.frm.frm_kod = data.sp_frmd_kod;
        this.Values.sp_frm_kod = data.sp_frmd_kod;
        this.onDistFirma(data.sp_frmd_kod);
      } else {
        this.frm.frmd_kod = '';
        this.Values.sp_frm_kod = '';
      }
      await this.siparisGirisiDetayComponent.getDetail();
    }
  }

  delete() {
    this.deleteMaster();
  }

  deleteMaster() {
    const model = sessionStorage.getItem('spValues');
    const parsedModel = JSON.parse(model);
    let primno =
      parsedModel.sp_primno !== undefined ? Number(parsedModel.sp_primno) : 0;
    if (primno !== 0) {
      this.spService.delete(primno).subscribe(
        (response) => {
          this.newForm();
          this.toastr.success('Silme işlemi başarılı', '', {
            positionClass: 'toast-top-right',
          });
        },
        (error) => {
          this.toastr.error('Eklenirken sorun oluştu');
        },
      );
    }
  }
}

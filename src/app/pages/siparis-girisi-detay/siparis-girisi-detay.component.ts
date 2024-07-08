import {
  Component,
  EventEmitter,
  Input, OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoMaterialModule} from 'src/app/demo-material-module';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {FormsModule} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {ColorsService} from 'src/app/services/colors.service';
import {GnstrService} from 'src/app/services/gnstr.service';
import {AmbalajService} from 'src/app/services/ambalaj.service';
import {EbatService} from 'src/app/services/ebat.service';
import {DovizService} from 'src/app/services/doviz.service';
import {BirimService} from 'src/app/services/birim.service';
import {FytturService} from 'src/app/services/fyttur.service';
import {IsletmeService} from 'src/app/services/isletme.service';
import {
  DxDataGridModule,
  DxButtonModule,
  DxDateBoxModule,
  DxCheckBoxModule,
  DxTextAreaModule,
  DxDataGridComponent,
  DxSelectBoxModule,
  DxNumberBoxModule,
  DxTextBoxModule,
  DxDropDownBoxModule,
  DxListModule,
} from 'devextreme-angular';
import {ChangeDetectorRef} from '@angular/core';
import {Spd} from 'src/app/models/spd';
import {concatMap, forkJoin, from, mergeMap, switchMap, toArray} from 'rxjs';
import {MamlzService} from 'src/app/services/mamlz.service';
import {FilterModel} from 'src/app/models/filter';
import {StokPrtService} from 'src/app/services/stokprt.service';
import * as Constants from 'src/app/pages/siparis-girisi-detay/constants';
import {MatDialog} from '@angular/material/dialog';
import {SpdService} from 'src/app/services/spd.service';
import {SpgrpService} from 'src/app/services/spgrp.service';
import {ToastrService} from 'ngx-toastr';
import {tableIdService} from '../../services/tableId.service';
import {ModalTeklifIdComponent} from 'src/app/modals/teklif-id/teklif-id.component';
import {LfydService} from 'src/app/services/lfyd.service';
import {StkfCmpt, Stkfdtop} from "../../models/stkfdtop";
import {BosPrimNoService} from "../../services/bosprimno.service";

@Component({
  selector: 'app-siparis-girisi-detay',
  standalone: true,
  imports: [DemoMaterialModule,
    CommonModule,
    NgScrollbarModule,
    FormsModule,
    DxButtonModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxCheckBoxModule,
    DxTextAreaModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxTextBoxModule,
    DxDropDownBoxModule,
    DxListModule,],
  templateUrl: './siparis-girisi-detay.component.html',
  styleUrl: './siparis-girisi-detay.component.scss'
})

export class TableSiparisDetayComponent implements OnInit {
  @ViewChild(DxDataGridComponent, {static: false})
  dataGrid: DxDataGridComponent;
  selectedColumn = '';
  selectedSpdPrimno: number;
  Constants = Constants;

  @Input() primno: number;
  @Input() frm: any;
  @Output() teklifIdSelected = new EventEmitter<any>();

  sirketNo = Number(localStorage.getItem('srk_no'));
  kullaniciKodu = localStorage.getItem('kullanici_adi');
  bicimNo = 150;
  depo = 30;
  yil = new Date().getFullYear();
  spdSiparis: Spd[] = [];
  spdSiparisData: MatTableDataSource<Spd>;
  dataSource: Spd[] = [];
  events: Array<string> = [];
  clickedPrimNo: number;


  spdList: Spd[] = [];
  spd: Spd;
  spdRecovery: Spd;

  @ViewChild('grid', {static: false}) grid: DxDataGridComponent;

  constructor(
    public colorsService: ColorsService,
    public gnstrService: GnstrService,
    public ambalajService: AmbalajService,
    public ebatService: EbatService,
    public dovizService: DovizService,
    public birimService: BirimService,
    public fytturService: FytturService,
    public spdService: SpdService,
    public isletmeService: IsletmeService,
    public mamlzService: MamlzService,
    public stokPrtService: StokPrtService,
    private cdr: ChangeDetectorRef,
    private spgrpService: SpgrpService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private tableIdService: tableIdService,
    private lfydService: LfydService,
    private bosPrimnoService: BosPrimNoService,
  ) {
    const _filterModel = new FilterModel();
    _filterModel.filterValue1 = this.primno;
    this.spdSiparisData = new MatTableDataSource<Spd>(this.spdSiparis);
  }

  setCellValue(newData, value) {
    let column = <any>this;
    column.defaultSetCellValue(newData, value);
  }

  editingStart(spd: Spd) {
    this.spd = spd;
  }

  handleRowInserted(eventName: any, event: any) {
    const model = sessionStorage.getItem('spValues');
    const parsedModel = JSON.parse(model);
    let primno = parsedModel.sp_primno !== undefined ? Number(parsedModel.sp_primno) : 0;
    if (primno !== 0) {
      this.events.unshift(eventName)
      if (this.events.unshift(eventName) !== 1)
        event.data.spd_sira = 0;
    } else {
      this.toastr.info('Lütfen ilk önce masterı kaydediniz.', ' ', {
        positionClass: 'toast-bottom-full-width',
        enableHtml: true,
        closeButton: true
      });
    }
  }

  async funcStokSiparisNumber(
    bcmno: number,
    dpNo: number,
    mmPrimno: number,
    clPrimno: number,
    birim: string,
  ): Promise<number> {
    try {
      let d_data, d_spd_mkt: number;
      const stokPrtResponse: any = await this.stokPrtService
        .getStokPrtTotalSum(this.sirketNo, 150, 2019, 70, 43489, 11001, 'kg')
        .toPromise();

      d_data =
        stokPrtResponse.data[0]['total_sum'] === null
          ? 0
          : stokPrtResponse.data[0]['total_sum'];

      const spdResponse: any = await this.spdService
        .spdTotalSum(this.sirketNo, 1066, 6702)
        .toPromise();
      d_spd_mkt =
        spdResponse.data[0]['total_sum'] === null
          ? 0
          : spdResponse.data[0]['total_sum'];

      return d_data - d_spd_mkt;
    } catch (error) {
      throw error;
    }
  }

  async rofMamlzString(
    mmPrimno: number,
    params: string,
    param?: boolean,
  ): Promise<string> {
    try {
      const response: any = await this.mamlzService
        .getRofMamlz(mmPrimno, params)
        .toPromise();
      if (!param) {
        return response.data[0][params];
      } else {
        return response.data[0];
      }
    } catch (error) {
      throw error;
    }
  }

  async onRowUpdateOrAdd(rowData: any) {
    if (rowData.changes[0].type === 'remove') return;
    const row = rowData.changes.find((rowData: any) => rowData.data);

    if (row.key.spd_sira > 0) {
      this.updateDetail(row.key.sfd_sira, row);
    } else {
      const primno = await this.onSpdPrimno();
      const dataTalimatColors = await this.onTalimatBosPrimno();
      const dataProses = await this.onProsesBosPrimno();
      this.saveDetail(primno.f_id, [row.data], Number(dataTalimatColors.bos_primno), Number(dataProses.bos_primno));
    }
  }

  async onTalimatBosPrimno(): Promise<any> {
    const response = await this.bosPrimnoService.getBosPrimNo("colors", this.sirketNo, 402).toPromise();
    return response;
  }

  async onProsesBosPrimno(): Promise<any> {
    const response = await this.bosPrimnoService.getBosPrimNo("proses", this.sirketNo, 402).toPromise();
    return response;
  }

  saveDetail(primno: number, data: any, talimatId: any, prosesId: any): void {

    const row = {...data};
    this.spd = new Spd();

    const model = sessionStorage.getItem('spValues');
    const parsedModel = JSON.parse(model);
    let masterId = parsedModel.sp_primno !== undefined ? Number(parsedModel.sp_primno) : 0;
    let spno1 = parsedModel.sp_no1 !== undefined ? Number(parsedModel.sp_no1) : 0;
    let spno2 = parsedModel.sp_no2 !== undefined ? Number(parsedModel.sp_no2) : 0;

    const max = this.spdList.length > 0 ? Math.max(...this.spdList.map(item => item.spd_sira)) + 1 : 1;
    const spd_spg_primno = Constants.siparisGrubu.find(x => x.viewValue === '').value;
    const spd_des_primno = Constants.yalitimFitilKodu.find(x => x.viewValue === '').value; //Yalıtım Fitil Kodu
    const spd_amb_kod = Constants.paketTuru.find(x => x.viewValue === '').value;
    this.spd.spd_primno = primno === undefined ? 0 : primno;
    this.spd.spd_sira = max;
    this.spd.spd_srk_no = this.sirketNo;
    this.spd.spd_sp_primno = masterId;
    this.spd.spd_bcmno = parsedModel.sp_bcmno;
    this.spd.spd_dp_no = this.depo;
    this.spd.spd_amb_kod = row[0].spd_amb_kod;
    this.spd.spd_aciklama = row[0].spd_aciklama;
    this.spd.spd_amb_mkt = row[0].spd_amb_mkt == null ? 0 : Number(row[0].spd_amb_mkt);
    this.spd.spd_amb_partino = row[0].spd_amb_partino;
    this.spd.spd_as_iz = row[0].spd_as_iz == null ? 0 : Number(row[0].spd_as_iz);
    this.spd.spd_asp_no1 = row[0].spd_asp_no1;
    this.spd.spd_asp_no2 = row[0].spd_asp_no2;
    this.spd.spd_no1 = spno1;
    this.spd.spd_no2 = spno2;
    this.spd.spd_aspd_sira = row[0].spd_aspd_sira == null ? 0 : Number(row[0].spd_aspd_sira);
    this.spd.spd_bitis = row[0].spd_bitis || 'A';
    this.spd.spd_birim = row[0].spd_birim || '';
    this.spd.spd_cektest = row[0].spd_cektest;
    this.spd.spd_cl_primno = row[0].spd_cl_primno == null ? 1 : Number(row[0].spd_cl_primno);
    this.spd.spd_des_id2 = row[0].des_id2 == null ? 4 : Number(row[0].des_id2);
    this.spd.spd_des_primno = (row[0].spd_des_primno || 0) === 0 ? Number(spd_des_primno) : Number(row[0].spd_des_primno);
    this.spd.spd_donmezlik = row[0].spd_donmezlik == null ? 0 : Number(row[0].spd_donmezlik);
    this.spd.spd_fire = row[0].spd_fire == null ? 0 : Number(row[0].spd_fire);
    this.spd.spd_frm_sipno = parsedModel.sp_frm_sipno || 'T5';
    this.spd.spd_hmetretul = row[0].spd_hmetretul == null ? 0 : Number(row[0].spd_hmetretul);
    this.spd.spd_dvz_kod = row[0].spd_dvz_kod;
    this.spd.spd_eb_kod = row[0].spd_eb_kod;
    this.spd.spd_fayn = row[0].spd_fayn;
    this.spd.spd_fiyat = row[0].spd_fiyat;
    this.spd.spd_fyt_id = row[0].spd_fyt_id;
    this.spd.spd_hmetretul = row[0].spd_hmetretul == null ? 0 : Number(row[0].spd_hmetretul);
    this.spd.spd_hspbirim = row[0].spd_hspbirim;
    this.spd.spd_i2 = row[0].spd_i2;
    this.spd.spd_kartela = row[0].spd_kartela;
    this.spd.spd_kg_top = row[0].spd_kg_top == null ? 0 : Number(row[0].spd_kg_top);
    this.spd.spd_kod1 = row[0].spd_kod1;
    this.spd.spd_kod2 = row[0].spd_kod2;
    this.spd.spd_lotno = row[0].spd_lotno;
    this.spd.spd_masraf_tutar = row[0].spd_masraf_tutar;
    this.spd.spd_mkt = row[0].spd_mkt == null ? 0 : Number(row[0].spd_mkt);
    this.spd.spd_mm_kod = row[0].spd_mm_kod;
    this.spd.spd_mm_primno = row[0].spd_mm_primno == null ? 0 : Number(row[0].spd_mm_primno);
    this.spd.spd_mm_tur = row[0].spd_mm_tur || 0;

    this.spd.spd_mmetretul = row[0].spd_mmetretul == null ? 0 : Number(row[0].spd_mmetretul);
    this.spd.spd_onay = row[0].spd_onay;
    this.spd.spd_ormkt_kg = row[0].spd_ormkt_kg == null ? 0 : Number(row[0].spd_ormkt_kg);
    this.spd.spd_ormkt_mt = row[0].spd_ormkt_mt == null ? 0 : Number(row[0].spd_ormkt_mt);
    this.spd.spd_ormkt_top = row[0].spd_ormkt_top == null ? 0 : Number(row[0].spd_ormkt_top);
    this.spd.spd_paket_mkt = row[0].spd_paket_mkt == null ? 0 : Number(row[0].spd_paket_mkt);
    this.spd.spd_partino = row[0].spd_partino;
    this.spd.spd_referans = row[0].spd_referans;
    this.spd.spd_sevk_aciklama = row[0].spd_sevk_aciklama;
    this.spd.spd_sonuc = row[0].spd_sonuc;
    this.spd.spd_spg_primno = (row[0].spd_spg_primno || 0) === 0 ? Number(spd_spg_primno) : Number(row[0].spd_spg_primno);
    this.spd.spd_tertrh = row[0].spd_tertrh || new Date();
    this.spd.spd_tlmt_kod = row[0].spd_tlmt_kod;
    this.spd.spd_tolerans = row[0].spd_tolerans;
    this.spd.spd_tolerans_negatif = row[0].spd_tolerans_negatif == null ? 0 : Number(row[0].spd_tolerans_negatif);
    this.spd.spd_tolerans_pozitif = row[0].spd_tolerans_pozitif == null ? 0 : Number(row[0].spd_tolerans_pozitif);
    this.spd.spd_tup_may = row[0].spd_tup_may;
    this.spd.spd_urtt_id = row[0].spd_urtt_id;
    this.spd.spd_yuzey = row[0].spd_yuzey;
    this.spd.spd_yuzey_islem = row[0].spd_yuzey_islem;
    this.spd.spd_yuzey_kalinlik = row[0].spd_yuzey_kalinlik;
    this.spd.spd_sipno = (spno2 * 100) + max;
    this.spd.spd_sde_no = row[0].spd_sde_no || 51;
    this.spd.spd_frm_kod = parsedModel.sp_frm_kod || '';
    this.spd.spd_frmd_kod = parsedModel.sp_frmd_kod || '';
    this.spd.spd_st_kod = parsedModel.sp_st_kod || 0;
    this.spd.spd_sk_kod = parsedModel.sp_sk_kod || 0;
    this.spd.spd_gsip_yil = parsedModel.sp_gsip_yil || 0;
    this.spd.spd_gsip_no = parsedModel.sp_gsip_no || 0;
    this.spd.spd_gsip_sira = row[0].spd_gsip_sira || 0;
    this.spd.spd_bmkt = row[0].spd_bmkt || 0;
    this.spd.spd_mkt_kg = row[0].spd_mkt_kg == null ? 0 : Number(row[0].spd_mkt_kg);
    this.spd.spd_mkt_mt = row[0].spd_mkt_mt == null ? 0 : Number(row[0].spd_mkt_mt);
    this.spd.spd_iskonto = row[0].spd_iskonto || 0;
    this.spd.spd_iskonto2 = row[0].spd_iskonto2 || 0;
    this.spd.spd_iskonto3 = row[0].spd_iskonto3 || 0;
    this.spd.spd_hsptur = row[0].spd_hsptur || '';
    this.spd.spd_vade = row[0].spd_vade || 0;
    this.spd.spd_tlmt_primno = isNaN(row[0].spd_tlmt_primno) ? talimatId : Number(row[0].spd_tlmt_primno);
    this.spd.spd_cl_kod = row[0].spd_cl_kod || '';
    this.spd.spd_des_kod = row[0].spd_des_kod || '';
    this.spd.spd_hen = row[0].spd_hen || 0;
    this.spd.spd_men = row[0].spd_men || 0;
    this.spd.spd_cek = row[0].spd_cek || 0;
    this.spd.spd_ceken = row[0].spd_ceken || 0;
    this.spd.spd_cekboy = row[0].spd_cekboy || 0;
    this.spd.spd_pus = row[0].spd_pus || 0;
    this.spd.spd_spg_kod = row[0].spd_spg_kod ?? '';
    this.spd.spd_prs_primno = row[0].spd_prs_primno || 0;
    this.spd.spd_prs_kod = row[0].spd_prs_kod || '';
    this.spd.spd_maxen = row[0].spd_maxen || 0;
    this.spd.spd_minen = row[0].spd_minen || 0;
    this.spd.uk = this.kullaniciKodu;
    this.spd.iuk = this.kullaniciKodu;
    this.spd.updt = new Date();
    this.spd.idt = new Date();
    this.spd.spd_siptrh = row[0].spd_siptrh || new Date();
    this.spd.spd_mak_kod = row[0].spd_mak_kod || '';
    this.spd.spd_list_fiyat = row[0].spd_list_fiyat || 0;
    this.spd.spd_vade_farki = row[0].spd_vade_farki || 0;
    this.spd.spd_list_dvz_kod = row[0].spd_list_dvz_kod || '';
    this.spd.spd_faiz = row[0].spd_faiz || 0;
    this.spd.spd_gsip_primno = row[0].spd_gsip_primno || 0;
    this.spd.spd_dept_no = row[0].spd_dept_no || 0;
    this.spd.spd_oncelik = row[0].spd_oncelik || 0;
    this.spd.spd_cfyg_primno = row[0].spd_cfyg_primno || 5;
    this.spd.spd_cfyg_kod = row[0].spd_cfyg_kod || '';
    this.spd.spd_label_kod = row[0].spd_label_kod || '';
    this.spd.spd_ipluz = row[0].spd_ipluz || '';
    this.spd.spd_rev = row[0].spd_rev || 0;
    this.spd.spd_prs_primno = prosesId;

    console.warn("insertte", JSON.stringify(this.spd));
    this.spdService.save(this.spd).subscribe(x => {
        this.toastr.success('Başarıyla eklendi', '', {
          positionClass: 'toast-top-right',
        });
        this.getDetail();
      },
      (error) => {
        this.toastr.error('Kayıt sırasında hata gerçekleşti.', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }

  updateDetail(spd_sira: number, data: any): void {
    const row = {...data};
    const recordRow = this.spdList.find((x: Spd) => x.spd_sira === spd_sira);
    this.spd = new Spd();
    this.spd = recordRow;

    if (row.data && typeof row.data === 'object') {
      this.spd = {...this.spd, ...row.data};
    }
    this.spd.uk = this.kullaniciKodu;
    this.spd.iuk = this.kullaniciKodu;
    this.spd.updt = new Date();
    this.spd.idt = new Date();

    this.spd.Where = [{
      spd_no1: this.spd.spd_no1,
      spd_no2: this.spd.spd_no2,
      spd_primno: this.spd.spd_primno,
      spd_sira: spd_sira
    }];

    this.spdService.updateSpd(this.spd).subscribe(x => {
        this.toastr.success('Güncellendi', '', {
          positionClass: 'toast-top-right',
        });
        this.getDetail();
      },
      (error) => {
        this.toastr.error('Güncelleme sırasında hata gerçekleşti.', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });

  }

  async onSpdPrimno(): Promise<any> {
    const response = await this.tableIdService.getTableId(0, 0, 0, 'spd').toPromise();
    return response[0];
  }

  async onRowInserted() {
    const primno = await this.onSpdPrimno();
    this.insert(Number(primno), this.dataSource);
  }

  insert(primno: number, data: any): void {
    const sp = JSON.parse(sessionStorage.getItem('spValues'));

    //spd_mm_primno =>  zorunlu alandır(foreign key); Dilaraya sor...
    //spd_amb_kod => Paket Türü zorunlu alandır(foreign key);
    //spd_cfyg_id2  kullanılmamış hiçbir yerde...
    //spd_cl_primno Renk alanı  zorunlu alandır(foreign key);
    //spd_eb_kod kontrol et zorunlu değil gibi
    //spd_frm_kod kontrol et zorunlu değil gibi


    //Empty foreign key...
    const spd_spg_primno = Constants.siparisGrubu.find(x => x.viewValue === '').value;
    const spd_des_primno = Constants.yalitimFitilKodu.find(x => x.viewValue === '').value; //Yalıtım Fitil Kodu
    const spd_amb_kod = Constants.paketTuru.find(x => x.viewValue === '').value;

    data.forEach(async (data) => {
      //await this.findMaxSpdSira();
      const spdObject = {
        spd_cfyg_id2: 1,
        spd_primno: data.spd_primno || 0,
        spd_aciklama: data.spd_aciklama || '',
        spd_amb_kod: data.spd_amb_kod || '',
        spd_amb_mkt: data.spd_amb_mkt == null ? 0 : Number(data.spd_amb_mkt),
        spd_amb_partino: data.spd_amb_partino || '',
        spd_as_iz: data.spd_as_iz == null ? 0 : Number(data.spd_as_iz),
        spd_asp_no1: data.spd_asp_no1 || 0,
        spd_asp_no2: data.spd_asp_no2 || 0,
        spd_aspd_sira: data.spd_aspd_sira || 0,
        spd_birim: data.spd_birim || '',
        spd_bitis: data.spd_bitis || 'A',
        spd_cektest: data.spd_cektest || '',
        spd_cl_primno: data.spd_cl_primno || 1,
        spd_des_id2: data.des_id2 || 4,
        spd_des_primno: (data.spd_des_primno || 0) === 0 ? Number(spd_des_primno) : Number(data.spd_des_primno),
        spd_donmezlik: data.spd_donmezlik == null ? 0 : Number(data.spd_donmezlik),
        spd_dvz_kod: data.spd_dvz_kod || '',
        spd_eb_kod: data.spd_eb_kod || '',
        spd_fayn: data.spd_fayn || 0,
        spd_fire: data.spd_fire == null ? 0 : Number(data.spd_fire),
        spd_fiyat: data.spd_fiyat || 0,
        spd_frm_sipno: sp.sp_frm_sipno || 'T5',
        spd_fyt_id: data.spd_fyt_id || 0,
        spd_hmetretul: data.spd_hmetretul == null ? 0 : Number(data.spd_hmetretul),
        spd_hspbirim: data.spd_hspbirim || '',
        spd_i2: data.spd_i2 || 0,
        spd_kartela: data.spd_kartela || '',
        spd_kg_top: data.spd_kg_top == null ? 0 : Number(data.spd_kg_top),
        spd_kod1: data.spd_kod1 || '',
        spd_kod2: data.spd_kod2 || '',
        spd_lotno: data.spd_lotno || '',
        spd_masraf_tutar: data.spd_masraf_tutar || 0,
        spd_mkt: data.spd_mkt == null ? 0 : Number(data.spd_mkt),
        spd_mm_kod: data.spd_mm_kod || '',
        spd_mmetretul: data.spd_mmetretul == null ? 0 : Number(data.spd_mmetretul),
        spd_onay: data.spd_onay || '',
        spd_ormkt_kg: data.spd_ormkt_kg == null ? 0 : Number(data.spd_ormkt_kg),
        spd_ormkt_mt: data.spd_ormkt_mt == null ? 0 : Number(data.spd_ormkt_mt),
        spd_ormkt_top: data.spd_ormkt_top == null ? 0 : Number(data.spd_ormkt_top),
        spd_paket_mkt: data.spd_paket_mkt == null ? 0 : Number(data.spd_paket_mkt),
        spd_partino: data.spd_partino || '',
        spd_referans: data.spd_referans || '',
        spd_sevk_aciklama: data.spd_sevk_aciklama || '',
        //spd_sira: Number((await this.findMaxSpdSira()) + 1),
        spd_sonuc: data.spd_sonuc || '',
        spd_spg_primno: (data.spd_spg_primno || 0) === 0 ? Number(spd_spg_primno) : Number(data.spd_spg_primno),
        spd_tertrh: data.spd_tertrh || new Date(),
        spd_tlmt_kod: data.spd_tlmt_kod || '',
        spd_tolerans: data.spd_tolerans || 0,
        spd_tolerans_negatif: data.spd_tolerans_negatif == null ? 0 : Number(data.spd_tolerans_negatif),
        spd_tolerans_pozitif: data.spd_tolerans_pozitif == null ? 0 : Number(data.spd_tolerans_pozitif),
        spd_tup_may: data.spd_tup_may || '',
        spd_urtt_id: data.spd_urtt_id || 0,
        spd_yuzey: data.spd_yuzey || '',
        spd_yuzey_islem: data.spd_yuzey_islem || '',
        spd_yuzey_kalinlik: data.spd_yuzey_kalinlik || 0,
        spd_sp_primno: sp.sp_primno || 0,
        spd_srk_no: sp.sp_srk_no || 0,
        spd_bcmno: sp.sp_bcmno || 0,
        spd_no1: sp.sp_no1 || 0,
        spd_no2: sp.sp_no2 || 0,
        spd_sipno: data.spd_sipno || 0,
        spd_sde_no: data.spd_sde_no || 51,
        spd_frm_kod: sp.sp_frm_kod || '',
        spd_frmd_kod: sp.sp_frmd_kod || '',
        spd_st_kod: sp.sp_st_kod || 0,
        spd_sk_kod: sp.sp_sk_kod || 0,
        spd_gsip_yil: sp.sp_gsip_yil || 0,
        spd_gsip_no: sp.sp_gsip_no || 0,
        spd_gsip_sira: data.spd_gsip_sira || 0,
        spd_mm_primno: data.spd_mm_primno || 0,
        spd_mm_tur: data.spd_mm_tur || 0,
        spd_bmkt: data.spd_bmkt || 0,
        spd_mkt_kg: data.spd_mkt_kg == null ? 0 : Number(data.spd_mkt_kg),
        spd_mkt_mt: data.spd_mkt_mt == null ? 0 : Number(data.spd_mkt_mt),
        spd_iskonto: data.spd_iskonto || 0,
        spd_iskonto2: data.spd_iskonto2 || 0,
        spd_iskonto3: data.spd_iskonto3 || 0,
        spd_hsptur: data.spd_hsptur || '',
        spd_vade: data.spd_vade || 0,
        spd_tlmt_primno: data.spd_tlmt_primno || 0,
        spd_cl_kod: data.spd_cl_kod || '',
        spd_des_kod: data.spd_des_kod || '',
        spd_hen: data.spd_hen || 0,
        spd_men: data.spd_men || 0,
        spd_cek: data.spd_cek || 0,
        spd_ceken: data.spd_ceken || 0,
        spd_cekboy: data.spd_cekboy || 0,
        spd_pus: data.spd_pus || 0,
        spd_spg_kod: data.spd_spg_kod ?? '',
        spd_prs_primno: data.spd_prs_primno || 0,
        spd_prs_kod: data.spd_prs_kod || '',
        spd_maxen: data.spd_maxen || 0,
        spd_minen: data.spd_minen || 0,
        uk: 'ADMIN',
        iuk: '',
        spd_siptrh: data.spd_siptrh || new Date(),
        spd_mak_kod: data.spd_mak_kod || '',
        spd_list_fiyat: data.spd_list_fiyat || 0,
        spd_vade_farki: data.spd_vade_farki || 0,
        spd_list_dvz_kod: data.spd_list_dvz_kod || '',
        spd_faiz: data.spd_faiz || 0,
        spd_gsip_primno: data.spd_gsip_primno || 0,
        spd_dept_no: data.spd_dept_no || 0,
        spd_oncelik: data.spd_oncelik || 0,
        spd_cfyg_primno: data.spd_cfyg_primno || 5,
        spd_cfyg_kod: data.spd_cfyg_kod || '',
        spd_label_kod: data.spd_label_kod || '',
        spd_ipluz: data.spd_ipluz || '',
        spd_rev: data.spd_rev || 0,
      };


      // this.spdService.InsertSpd(spdObject).subscribe(
      //   (response) => {
      //     console.warn(response);
      //     this.toastr.success('Başarıyla eklendi');
      //   },
      //   (error) => {
      //     console.log(error);
      //     this.toastr.error('Eklenirken sorun oluştu');
      //   },
      // );
    });
  }

  newDetail() {
    this.spdList = [];
  }

  cellTemplate_spd_bitis(container, options) {
    const value = options.value;
    container.textContent = value === 'K' ? '✅' : '❌';
  }

  cellTemplate_spd_onay(container, options) {
    const value = options.value;
    container.textContent = value === 'T' ? '✅' : '❌';
  }

  cellTemplate_spd_fayn(container, options) {
    const value = options.value;
    container.textContent = value === 0 ? '✅' : '❌';
  }

  async ngOnChanges(changes: any) {
    if (changes.primno) {
      const _filterModel = new FilterModel();
      if ((_filterModel.filterValue1 = this.primno)) {
        try {
          _filterModel.filterValue1 = this.primno;
          const data: Spd[] = await this.getDetayData(_filterModel);
          this.dataSource = data;
          this.spdSiparisData.data = this.dataSource;
          this.cdr.detectChanges();
        } catch (error) {
          console.error('Detay verileri çekme hatası:', error);
        }
      }
    }
  }

  async ngOnInit() {

    forkJoin([
      this.colorsService.getColor(403, 1),
      this.colorsService.getColors(402),
      this.gnstrService.getGnstr2(),
      this.ambalajService.getAmbalaj(),
      this.ebatService.getEbat(),
      this.dovizService.getDoviz(),
      this.birimService.getBirim(),
      this.fytturService.getFyttur(),
      this.spgrpService.getSpgrp(),
      this.isletmeService.getIsletme(),
      this.colorsService.getColor(400, 1),
    ]).subscribe(
      (responses: any[]) => {
        // Process Color Services
        Constants.yalitimFitilKodu.push(
          ...responses[0].data.map((res: any) => ({
            value: res.cl_primno,
            viewValue: res.cl_kod !== '' ? ` ${res.cl_kod} ${res.cl_ad} ` : '',
          })),
        );

        Constants.urunTipi.push(
          ...responses[1].data.map((res: any) => ({
            value: res.cl_kod,
            viewValue: res.cl_kod !== '' ? ` ${res.cl_kod} ${res.cl_ad} ` : '',
          })),
        );

        // Process GnstrService
        Constants.korumaBandi.push(
          ...responses[2].data.map((res: any) => ({
            value: res.gs_kod,
            viewValue: res.gs_kod ? res.gs_kod + ' ' + res.gs_ad : res.gs_ad,
          })),
        );

        // Process AmbalajService
        Constants.paketTuru.push(
          ...responses[3].map((res: any) => ({
            value: res.ab_kod,
            viewValue: res.ab_ad,
          })),
        );
        // Process EbatService
        Constants.alasim.push(
          ...responses[4].map((res: any) => ({
            value: res.eb_kod,
            viewValue: `${res.eb_kod} ${res.eb_ad}`,
          })),
        );
        // Process DovizService
        Constants.doviz.push(
          ...responses[5].map((res: any) => ({
            value: res.dvz_kod,
            viewValue: res.dvz_ad,
          })),
        );
        // Process BirimService
        Constants.hesapBirimi.push(
          ...responses[6].map((res: any) => ({
            value: res.brm_kod,
            viewValue: res.brm_kod,
          })),
        );
        // Process FytturService
        Constants.fiyat.push(
          ...responses[7].map((res: any) => ({
            value: res.fyt_id,
            viewValue: res.fyt_ad,
          })),
        );
        // Process SpService
        Constants.siparisGrubu.push(
          ...responses[8].map((res: any) => ({
            value: res.spg_primno,
            viewValue: res.spg_ad,
          })),
        );
        // Process IsletmeService
        Constants.uretimYeri.push(
          ...responses[9].map((res: any) => ({
            value: res.islt_kod,
            viewValue: res.islt_ad,
          })),
        );

        Constants.colors.push(
          ...responses[10].data.map((res: any) => ({
            value: res.cl_primno,
            viewValue:
              res.cl_kod !== ' ' ? ` ${res.cl_kod} ${res.cl_ad} ` : res.cl_ad,
          })),
        );
      },
      (error) => {
        console.error('İstek çekme hatası:', error);
      },
    );
    this.cdr.detectChanges();
  }

  getDetail() {
    const model = sessionStorage.getItem('spValues');
    const parsedModel = JSON.parse(model);
    let spd_sp_primno = parsedModel.sp_primno !== undefined ? Number(parsedModel.sp_primno) : 0;
    
    const _filterModel = new FilterModel();
    if ((spd_sp_primno === 0)) return;

    try {
      _filterModel.filterValue1 = spd_sp_primno;
      // _filterModel.filterValue2 = mm_primno
      // _filterModel.filterValue20 = "mm_ad"


      this.spdList = [];
      this.spdService
        .spdSiparisler(_filterModel).subscribe((response => {
            response['data'].map(  (x: Spd) => {
              this.spd = new Spd();
              this.spd = {...x};
              // sql sorgu mamlz ve spd ayni anda cekilmesi lazim veri eklendikten sonra
              
               //this.spd.compute_mm_ad = this.spd.compute_mm_ad = x.spd_mm_primno !== 0 ? await this.rofMamlzString(x.spd_mm_primno, 'mm_ad') : '';
              // this.spd.compute_kalan_stok = x.spd_tlmt_kod.startsWith('A')
              //   ? await this.funcStokSiparisNumber(150, 20, x.spd_mm_primno, x.spd_cl_primno, x.spd_birim,) : 0;

              this.spd.compute_sp_drm = x.spd_tup_may + '' + x.spd_sonuc;
              this.spd.compute_kalip_drm = x.compute_kalip_drm || '' === '' ? 'Kalıp Yok' : 'Kalıbı Var';
              this.spdList.push(this.spd);
              console.log("this.spd ", JSON.stringify(this.spd));
              console.log("this.spdList ", JSON.stringify(this.spdList));
            });
          })
        );
    } catch (error) {
      console.error('Hata gerçekleşti.(Detay)', error);
    }
  }

  async getDetayData(filterModel: FilterModel): Promise<Spd[]> {
    try {
      const response = await this.spdService
        .spdSiparisler(filterModel)
        .toPromise();

      const modifiedData: Spd[] = await Promise.all(
        response['data'].map(async (item: any) => {
          return {
            spd_primno: item.spd_primno,
            spd_sira: item.spd_sira,
            spd_urtt_id: item.spd_urtt_id,
            spd_kod1: item.spd_kod1,
            spd_kartela: item.spd_kartela,
            spd_partino: item.spd_partino,
            spd_mm_kod: item.spd_mm_kod,
            compute_mm_ad:
              item.spd_mm_primno !== 0
                ? await this.rofMamlzString(item.spd_mm_primno, 'mm_ad')
                : '',
            spd_tlmt_kod: item.spd_tlmt_kod,
            spd_yuzey: item.spd_yuzey,
            spd_cektest: item.spd_cektest,
            spd_cl_primno: item.spd_cl_primno,
            spd_des_id2: item.spd_des_id2,
            spd_kg_top: item.spd_kg_top,
            spd_paket_mkt: item.spd_paket_mkt,
            spd_ormkt_mt: item.spd_ormkt_mt,
            spd_amb_partino: item.spd_amb_partino,
            spd_mmetretul: item.spd_mmetretul,
            spd_amb_mkt: item.spd_amb_mkt,
            spd_mkt: this.customRound(item.spd_mkt),
            spd_birim: item.spd_birim,
            spd_ormkt_kg: item.spd_ormkt_kg,
            compute_kalan_stok: item.spd_tlmt_kod.startsWith('A')
              ? this.funcStokSiparisNumber(
                150,
                20,
                item.spd_mm_primno,
                item.spd_cl_primno,
                item.spd_birim,
              )
              : 0,
            spd_hmetretul: item.spd_hmetretul,
            spd_donmezlik: item.spd_donmezlik,
            spd_fire: item.spd_fire,
            spd_tolerans_pozitif: item.spd_tolerans_pozitif,
            spd_tolerans_negatif: item.spd_tolerans_negatif,
            spd_as_iz: item.spd_as_iz,
            spd_as_oriz: item.spd_as_oriz,
            spd_des_primno: item.spd_des_primno,
            spd_kod2: item.spd_kod2,
            spd_sipno: item.spd_sipno,
            spd_tlmt_primno: item.spd_tlmt_primno,
            spd_prs_primno: item.spd_prs_primno,
            spd_mm_primno: item.spd_mm_primno,
            spd_amb_kod: item.spd_amb_kod,
            spd_eb_kod: item.spd_eb_kod,
            spd_frm_sipno: item.spd_frm_sipno,
            spd_bitis: item.spd_bitis,
            spd_onay: item.spd_onay,
            spd_fayn: item.spd_fayn,
            spd_tertrh: item.spd_tertrh,
            spd_tertrh2: item.spd_tertrh2,
            spd_masraf_tutar: item.spd_masraf_tutar,
            spd_tolerans: item.spd_tolerans,
            spd_dvz_kod: item.spd_dvz_kod,
            spd_fiyat: item.spd_fiyat,
            spd_hspbirim: item.spd_hspbirim,
            spd_fyt_id: item.spd_fyt_id,
            spd_spg_primno: item.spd_spg_primno,
            compute_sp_drm: item.spd_tup_may + '' + item.spd_sonuc,
            spd_referans: item.spd_referans,
            spd_lotno: item.spd_lotno,
            spd_aciklama: item.spd_aciklama,
            spd_sevk_aciklama: item.spd_sevk_aciklama,
            spd_yuzey_islem: item.spd_yuzey_islem,
            spd_yuzey_kalinlik: item.spd_yuzey_kalinlik,
            compute_kalip_drm: item.compute_kalip_drm === 0 ? 'Kalıp Yok' : 'Kal ıbı Var',
            spd_asp_no1: item.spd_asp_no1,
            spd_asp_no2: item.spd_asp_no2,
            spd_aspd_sira: item.spd_aspd_sira,
            spd_i2: item.spd_i2,
            spd_ormkt_top: item.spd_ormkt_top,
            spd_tup_may: item.spd_tup_may,
            spd_sonuc: item.spd_sonuc,
          };
        }),
      );

      modifiedData.sort((a, b) => a.spd_sira - b.spd_sira);

      return modifiedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  onCellClick(event: any) {
    const cellValue = Constants.displayedColumns[event.columnIndex];
    switch (cellValue) {
      case 'spd_mm_kod':
        this.clickedPrimNo = event.data.spd_primno;
        this.openTeklifIdModal(event.rowIndex);
        break;
      default:
        break;
    }
  }

  onCellKeyDown(e: any) {
    if (e.event.key === 'Enter') {
      this.onTeklifId(e.event.target.value, e.rowIndex);
    }
  }

  openTeklifIdModal(rowIndex: any): void {
    const dialogRef = this.dialog.open(ModalTeklifIdComponent, {
      backdropClass: 'custom-backdrop',
      width: '100%',
      data: {
        frm_kod: JSON.parse(sessionStorage.getItem('spValues')).sp_frm_kod,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const indexRow = rowIndex;
        this.onTeklifId(result.lfyd_kod1, indexRow);
      }
    });
  }

  onTeklifId(kod1: any, rowIndex: any): void {
    // const existingPrimnoIndexNewValues = this.dataSource.findIndex(
    //   (val) => val.spd_primno === this.clickedPrimNo,
    // );

    this.lfydService
      .getLfyd(JSON.parse(sessionStorage.getItem('spValues')).sp_frm_kod, kod1)
      .subscribe((response: any) => {
        response.data.map(async (item: any) => {
          const mamlz: any = await this.rofMamlzString(
            item.lfyd_mm_primno,
            'mm_birim-mm_mkt_kg',
            true,
          );

          this.grid.instance.cellValue(rowIndex, 'spd_kod1', kod1);
          this.grid.instance.cellValue(rowIndex, 'spd_mm_primno', item.lfyd_mm_primno);
          this.grid.instance.cellValue(rowIndex, 'spd_mm_kod', item.lfyd_mm_kod);
          this.grid.instance.cellValue(rowIndex, 'spd_tlmt_kod', item.lfyd_des_kod);
          this.grid.instance.cellValue(rowIndex, 'spd_cl_primno', item.lfyd_cl_primno);
          this.grid.instance.cellValue(rowIndex, 'spd_des_primno', item.lfyd_des_primno);
          this.grid.instance.cellValue(rowIndex, 'spd_des_kod', item.lfyd_des_kod);
          this.grid.instance.cellValue(rowIndex, 'spd_dvz_kod', item.lfyd_dvz_kod);
          this.grid.instance.cellValue(rowIndex, 'spd_mm_tur', item.lfyd_mm_tur);
          this.grid.instance.cellValue(rowIndex, 'spd_frm_sipno', item.lfyd_acik2);
          this.grid.instance.cellValue(rowIndex, 'compute_mm_ad', item.mm_ad);
          this.grid.instance.cellValue(rowIndex, 'spd_eb_kod', item.lfyd_kod2);
          this.grid.instance.cellValue(rowIndex, 'spd_mmetretul', item.lfyd_grmj);
          this.grid.instance.cellValue(rowIndex, 'spd_lotno', item.lfyd_kod1);
          this.grid.instance.cellValue(rowIndex, 'spd_hspbirim', item.lfyd_acik1);
          this.grid.instance.cellValue(rowIndex, 'spd_birim', mamlz.mm_birim);
          this.grid.instance.cellValue(rowIndex, 'spd_hmetretul', mamlz.mm_mkt_kg);
        });
      });
  }

  customRound(value) {
    const roundedValue = Math.round(value);
    const decimalPart = value - roundedValue;

    if (decimalPart >= 0.5) {
      return roundedValue + 1;
    } else {
      return roundedValue;
    }
  }
}

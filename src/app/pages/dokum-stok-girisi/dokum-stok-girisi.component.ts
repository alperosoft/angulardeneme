import {ChangeDetectorRef, Component, OnInit, ViewChild,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AppHeaderComponent} from "../../layouts/full/header/header.component";
import {
  DevExtremeModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxFormModule,
  DxListModule,
  DxRadioGroupModule,
  DxSpeedDialActionModule,
  DxToolbarModule,
} from "devextreme-angular";
import {DxiColumnModule, DxoFilterRowModule, DxoPagingModule,} from "devextreme-angular/ui/nested";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Depo} from "../../models/depo";
import {Stkf} from "../../models/stkf";
import {DepoService} from "../../services/depo.service";
import {ToastrService} from "ngx-toastr";
import {Vardiya} from "../../models/vardiya";
import {VardiyaService} from "../../services/vardiya.service";
import {StkfCmpt, Stkfdtop} from "../../models/stkfdtop";
import {directions, Employee, Service, State} from "../../services/test.service";
import {DxDataGridComponent, DxDataGridTypes} from "devextreme-angular/ui/data-grid";
import {DxDrawerModule} from 'devextreme-angular/ui/drawer';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {tableIdService} from "../../services/tableId.service";
import {concatMap} from 'rxjs';
import {StkfService} from "../../services/stkf.service";
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import {MamlzService} from "../../services/mamlz.service";
import {Mamlz} from "../../models/mamlz";
import {StkfTopService} from "../../services/stkfdtop.service";
import {BosPrimNoService} from "../../services/bosprimno.service";

@Component({
  selector: 'app-dokum-stok-girisi',
  standalone: true,
  imports: [CommonModule, DxDrawerModule, DxSpeedDialActionModule, DxSelectBoxModule, DxListModule, DxRadioGroupModule, DxToolbarModule, AppHeaderComponent, DxDataGridModule, DxDateBoxModule, DxDropDownBoxModule, DxFormModule, DxiColumnModule, DxoFilterRowModule, DxoPagingModule, MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule, DevExtremeModule, ReactiveFormsModule],
  templateUrl: './dokum-stok-girisi.component.html',
  styleUrl: './dokum-stok-girisi.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DokumStokGirisiComponent implements OnInit {

  form: FormGroup;
  selectedVardiya: any[] = [];
  selectedDepo: any[] = [];
  depos: Depo[];
  vardiya: Vardiya[];
  mamlzs: Mamlz[];
  stkf: Stkf = new Stkf();
  stkfdTops: Stkfdtop[] = [];
  stkfdTop: Stkfdtop;
  stkfCmpt: StkfCmpt;

  sirketNo = Number(localStorage.getItem('srk_no'));
  kullaniciKodu = localStorage.getItem('kullanici_adi');
  bicimNo = 200;
  depo = 30;
  fisNo = 15;
  yil = new Date().getFullYear();
  ay = new Date().getMonth();

  loadIndicatorVisible = false;
  isGridBoxOpenedVardiya = false;
  isGridBoxOpenedDepo = false;

  events: Array<string> = [];

  //@ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;
  @ViewChild('grid', {static: false}) grid: DxDataGridComponent;

  employees: Employee[];

  states: State[];

  directions = directions;

  selectedRowIndex = -1;

  constructor(private depoService: DepoService,
              private vardiyaService: VardiyaService,
              private stkfService: StkfService,
              private toastr: ToastrService,
              private service: Service,
              private formBuilder: FormBuilder,
              private tableidService: tableIdService,
              private cdr: ChangeDetectorRef,
              private datePipe: DatePipe,
              private mamlzService: MamlzService,
              private stkftopService: StkfTopService,
              private bosPrimnoService: BosPrimNoService) {

    this.form = this.formBuilder.group({
      depo: [null, [Validators.required]],
      sf_no2: [0, [Validators.required]],
      sf_belge_trh: [new Date(), [Validators.required]],
      sf_vardiya: [null, [Validators.required]],
      sf_aciklama: null
    });

    this.employees = this.service.getEmployees();
    this.states = this.service.getStates();
  }

  editingStart(stkfdTops: Stkfdtop) {
    this.stkfdTop = stkfdTops;
  }

  rowRemoved(event: any) {
    if (!event.data) return;

    const removedData = event.data;
    const result = this.stkfdTops.find(item => item.sfd_sira === removedData.sfd_sira);

    if (result.sfd_primno === 0) return;

    this.deleteDetail(result.sfd_primno);
  }

  rowInserted(eventName: any, event: any) {
    if (this.stkf.sf_no2 !== 0) {
      this.events.unshift(eventName)
      if (this.events.unshift(eventName) !== 1)
        event.data.sfd_sira = 0;
    } else {
      this.toastr.info('Lütfen ilk önce masterı kaydediniz.', ' ', {
        positionClass: 'toast-bottom-full-width',
        enableHtml: true,
        closeButton: true
      });
    }
  }

  async onRowUpdateOrAdd(rowData: any): Promise<void> {
    if (rowData.changes[0].type === 'remove') return;
    const row = rowData.changes.find((x: any) => x.data);
    if (row.key.sfd_sira > 0) {
      this.updateDetail(row.key.sfd_sira, row);
    } else {
      const data = await this.onStkfdTopPrimno();
      const dataColors = await this.onColorsBosPrimno();
      const dataTalimatColors = await this.onTalimatBosPrimno();
      const dataProses = await this.onProsesBosPrimno();

      this.saveDetail(Number(data.f_id), [row.data], Number(dataColors.bos_primno), Number(dataTalimatColors.bos_primno), Number(dataProses.bos_primno));
    }
  }
  updateDetail(sfd_sira: number, data: any): void {
    const row = {...data};
    const recordRow = this.stkfdTops.find((x: Stkfdtop) => x.sfd_sira === sfd_sira);
    this.stkfdTop = new Stkfdtop();
    this.stkfdTop = recordRow;

    if (row.data && typeof row.data === 'object') {
      this.stkfdTop = {...this.stkfdTop, ...row.data};
    }
    this.stkfdTop.sfd_yil = this.yil;
    this.stkfdTop.sfd_trh = new Date();
    this.stkfdTop.uk = this.kullaniciKodu;
    this.stkfdTop.iuk = this.kullaniciKodu;
    this.stkfdTop.updt = new Date();
    this.stkfdTop.idt = new Date();
    this.stkfdTop.sfd_ay = this.ay;

    this.stkfdTop.Where = [{
      sfd_no1: this.stkfdTop.sfd_no1,
      sfd_no2: this.stkfdTop.sfd_no2,
      sfd_primno: this.stkfdTop.sfd_primno,
      sfd_sira: sfd_sira
    }];

    this.stkftopService.update(this.stkfdTop).subscribe(x => {
        this.toastr.success('Güncellendi', '', {
          positionClass: 'toast-top-right',
        });
        this.getDetail(this.stkf.sf_primno);
      },
      (error) => {
        this.toastr.error('Güncelleme sırasında hata gerçekleşti.', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }
  saveDetail(primno: number, data: any, colorsBosPrimno: number, talimatBosPrimno: number, prosesPrimNo: number): void {
    const row = {...data};

    this.stkfdTop = new Stkfdtop();

    let max = 1;
    if (this.stkfdTops.length > 0)
      max = Math.max(...this.stkfdTops.map(item => item.sfd_sira)) + 1;

    this.stkfdTop.sfd_primno = primno === undefined ? 0 : primno;
    this.stkfdTop.sfd_sira = max;
    this.stkfdTop.sfd_tpsira = max;
    this.stkfdTop.sfd_srk_no = this.sirketNo;
    this.stkfdTop.sfd_sf_primno = this.stkf.sf_primno;
    this.stkfdTop.sfd_bcmno = this.bicimNo;
    this.stkfdTop.sfd_dp_no = this.depo;
    this.stkfdTop.sfd_yil = this.yil;
    this.stkfdTop.sfd_no1 = this.stkf.sf_no1;
    this.stkfdTop.sfd_no2 = this.stkf.sf_no2;
    this.stkfdTop.sfd_fist_no = this.fisNo;
    this.stkfdTop.sfd_trh = new Date();
    this.stkfdTop.sfd_mm_primno = row[0].sfd_mm_primno;
    this.stkfdTop.sfd_mm_kod = row[0].sfd_mm_kod;
    this.stkfdTop.sfd_topsira = row[0].sfd_topsira;
    this.stkfdTop.sfd_en = row[0].sfd_en;
    this.stkfdTop.sfd_metretul = row[0].sfd_metretul;
    this.stkfdTop.sfd_barkod = row[0].sfd_barkod;
    this.stkfdTop.sfd_dara2 = row[0].sfd_dara2;
    this.stkfdTop.sfd_barkod2 = row[0].sfd_barkod2;
    this.stkfdTop.sfd_ay = this.ay;
    this.stkfdTop.sfd_birim = "kg";
    this.stkfdTop.uk = this.kullaniciKodu;
    this.stkfdTop.iuk = this.kullaniciKodu;
    this.stkfdTop.updt = new Date();
    this.stkfdTop.idt = new Date();
    this.stkfdTop.sfd_tlmt_primno = isNaN(talimatBosPrimno) ? 0 : talimatBosPrimno;
    this.stkfdTop.sfd_cl_primno = isNaN(colorsBosPrimno) ? 0 : colorsBosPrimno;
    this.stkfdTop.sfd_prs_primno = isNaN(prosesPrimNo) ? 0 : prosesPrimNo;

    this.stkftopService.save(this.stkfdTop).subscribe(x => {
        this.toastr.success('Başarıyla eklendi', '', {
          positionClass: 'toast-top-right',
        });
        this.getDetail(this.stkf.sf_primno);
      },
      (error) => {
        this.toastr.error('Kayıt sırasında hata gerçekleşti.', 'Hata', {
          positionClass: 'toast-top-right',
        });

      });
  }

  async onStkfdTopPrimno(): Promise<any> {
    const response = await this.tableidService.getTableId(0, 0, 0, 'stkfdtop').toPromise();
    return response[0];
  }

  async onColorsBosPrimno(): Promise<any> {
    const response = await this.bosPrimnoService.getBosPrimNo("colors", this.sirketNo, 400).toPromise();
    return response;
  }

  async onTalimatBosPrimno(): Promise<any> {
    const response = await this.bosPrimnoService.getBosPrimNo("colors", this.sirketNo, 402).toPromise();
    return response;
  }

  async onProsesBosPrimno(): Promise<any> {
    const response = await this.bosPrimnoService.getBosPrimNo("proses", this.sirketNo, 402).toPromise();
    return response;
  }

  onMamlzeSelectionChanged(selectedRowKeys, cellInfo, dropDownBoxComponent) {
    if (selectedRowKeys[0] === undefined) return;

    cellInfo.setValue(selectedRowKeys[0]);
    const rowIndex = cellInfo.rowIndex;
    this.grid.instance.cellValue(rowIndex, 'sfd_mm_kod', selectedRowKeys[0].mm_kod);
    this.grid.instance.cellValue(rowIndex, 'sfd_mm_primno', selectedRowKeys[0].mm_primno);
    this.grid.instance.cellValue(rowIndex, 'StkfCmpt.cmpt_mm_ad', selectedRowKeys[0].mm_ad);

    if (selectedRowKeys.length > 0) {
      dropDownBoxComponent.close();
    }
  }

  selectedChanged(e: DxDataGridTypes.SelectionChangedEvent) {
    this.selectedRowIndex = e.component.getRowIndexByKey(e.selectedRowKeys[0]);
  }

  ngOnInit(): void {
    this.loadIndicatorVisible = true;
    this.getMamlz();
    this.getDepo();
    this.getVardiya();
    this.loadIndicatorVisible = false;
  }

  onSiparisNoValueChanged(event: any) {
    const sfNo2 = event.value;
    if (Number(sfNo2) === 0) return;

    this.stkfService.find(this.sirketNo, this.bicimNo, Number(sfNo2), this.fisNo)
      .subscribe((x) => {
        this.loadIndicatorVisible = true;
        if (x) {
          if (x.statusCode === 200) {
            const data = {...x.data};
            this.setData(data);
            this.getDetail(data.sf_primno);
          }
        } else {

          this.form.reset({
            depo: null,
            sf_no2: 0,
            sf_belge_trh: new Date(),
            sf_vardiya: null,
            sf_aciklama: null
          });
          if (this.selectedDepo.length > 0) this.selectedDepo = [];
          if (this.selectedVardiya.length > 0) this.selectedVardiya = [];
          this.stkf = new Stkf();

          this.toastr.info('Kayıt yok.', ' ', {
            positionClass: 'toast-top-right',
          });
        }

        this.loadIndicatorVisible = false;
      }, error => {
        this.loadIndicatorVisible = false;
        this.toastr.error('Hata gerçekleşti', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }

  onDepoGridBoxValueChanged(e: any) {
    this.form.controls['depo'].setValue(e.value[0], {emitEvent: false});
    setTimeout(() => {
      this.isGridBoxOpenedDepo = false;
    });
  }

  onVardiyaGridBoxValueChanged(e: any) {
    this.form.controls['sf_vardiya'].setValue(e.value[0], {emitEvent: false});
    setTimeout(() => {
      this.isGridBoxOpenedVardiya = false;
    });
  }

  saveMaster() {
    this.loadIndicatorVisible = true;
    const formValues = this.form.value;
    if (formValues.depo === null) {
      this.toastr.error('Depo alanı zorunludur.', 'Uyarı', {
        positionClass: 'toast-top-right',
      });
    } else if (formValues.sf_belge_trh === null) {
      this.toastr.error('Tarih alanı zorunludur.', 'Uyarı', {
        positionClass: 'toast-top-right',
      });
    } else if (formValues.sf_vardiya === null) {
      this.toastr.error('Vardiya alanı zorunludur.', 'Uyarı', {
        positionClass: 'toast-top-right',
      });
    } else {
      if (this.form.value.sf_no2 === 0) {//insert
        this.insertSetValues(formValues);

        this.loadIndicatorVisible = false;
      } else { //update
        this.updateSetValues(formValues);
        this.loadIndicatorVisible = false;
      }
    }
  }

  insertSetValues(formValues: any): void {
    this.tableidService.getTableId(0, 0, 0, 'stkf').pipe(
      concatMap((result1: any) => {
        this.stkf.sf_primno = result1[0].f_id;
        return this.tableidService.getTableId(this.sirketNo, this.bicimNo, this.yil, 'stkf', this.depo.toString(), 'sf_no2');
      })
    ).subscribe((result2: any) => {
      this.stkf.sf_srk_no = this.sirketNo;
      this.stkf.sf_no1 = this.yil;
      this.stkf.sf_yil = this.yil;
      this.stkf.sf_no2 = result2[0].f_id;
      this.stkf.sf_bcmno = this.bicimNo;
      this.stkf.sf_ay = this.ay;
      this.stkf.sf_aciklama = formValues.sf_aciklama === null ? '' : formValues.sf_aciklama;
      this.stkf.sf_dp_no = formValues.depo.dp_no;
      this.stkf.sf_vardiya = formValues.sf_vardiya.vad_kod;
      this.stkf.sf_belge_trh = formValues.sf_belge_trh;
      this.stkf.sf_trh = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.stkf.sf_fist_no = this.fisNo;
      this.stkf.uk = this.kullaniciKodu;
      this.stkf.updt = new Date();
      this.stkf.iuk = this.kullaniciKodu;
      this.stkf.idt = new Date();
      this.stkf.sf_irs_frm_id = 0;

      this.insert(this.stkf, Number(result2[0].f_id));

    }, (error) => {
      this.toastr.error('Kayıt sırasında hata gerçekleşti.', 'Hata', {
        positionClass: 'toast-top-right',
      });
    });
  }

  insert(stkf: Stkf, masterId: number): void {
    this.stkfService.save(stkf).subscribe(
      (response) => {
        this.form.patchValue({
          sf_no2: masterId
        });
        this.toastr.success('Kayıt başarılı.', ' ', {
          positionClass: 'toast-top-right',
        });
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.toastr.error('Kayıt sırasında hata gerçekleşti.', 'Hata', {
          positionClass: 'toast-top-right',
        });
      },
    );
  }

  updateSetValues(formValues: any): void {
    this.stkf.sf_aciklama = formValues.sf_aciklama === null ? '' : formValues.sf_aciklama;
    this.stkf.sf_dp_no = formValues.depo.dp_no;
    this.stkf.sf_vardiya = formValues.sf_vardiya.vad_kod;
    this.stkf.sf_belge_trh = formValues.sf_belge_trh;
    this.stkf.updt = new Date();
    this.stkf.uk = this.kullaniciKodu;

    this.stkf.Where = [{
      sf_primno: this.stkf.sf_primno,
      sf_no2: this.stkf.sf_no2
    }];

    this.update(this.stkf);
  }

  update(stkf: Stkf): void {
    this.stkfService
      .update(stkf).subscribe(
      (response) => {
        this.toastr.success('Güncellendi.', ' ', {
          positionClass: 'toast-top-right',
        });
      },
      (error) => {
        this.toastr.error('Güncelleme sırasında hata gerçekleşti.', 'Hata', {
          positionClass: 'toast-top-right',
        });
      },
    );
  }

  clearForm() {
    this.clearFormMethod();
  }

  clearFormMethod() {
    this.form.reset({
      depo: null,
      sf_no2: 0,
      sf_belge_trh: new Date(),
      sf_vardiya: null,
      sf_aciklama: null
    });
    if (this.selectedDepo.length > 0) this.selectedDepo = [];
    if (this.selectedVardiya.length > 0) this.selectedVardiya = [];

    this.stkf = new Stkf();
    this.stkfdTops = [];
  }

  next() {
    this.stkfService.next(this.sirketNo, this.bicimNo, this.form.value.sf_no2, this.fisNo)
      .subscribe((x) => {
        this.loadIndicatorVisible = true;
        if (x) {
          if (x.statusCode === 200) {
            const data = {...x.data[0]};
            this.setData(data);
            this.getDetail(data.sf_primno);
          }
        }
        this.loadIndicatorVisible = false;
      }, error => {
        this.loadIndicatorVisible = false;
        this.toastr.error('Hata gerçekleşti', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }
  previous() {
    this.stkfService.previous(this.sirketNo, this.bicimNo, this.form.value.sf_no2, this.fisNo)
      .subscribe((x) => {
        this.loadIndicatorVisible = true;
        if (x) {
          if (x.statusCode === 200) {
            const data = {...x.data[0]};
            this.setData(data);
            this.getDetail(data.sf_primno);
          }
          this.loadIndicatorVisible = false;
        }
      }, error => {
        this.loadIndicatorVisible = false;
        this.toastr.error('Hata gerçekleşti', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }
  setData(data: any): void {
    this.stkf = new Stkf();
    this.stkf = data;
    if (this.depos.length > 0 && this.stkf.sf_dp_no !== 0) {
      this.selectedDepo = this.depos.filter((x: Depo) => x.dp_no === this.stkf.sf_dp_no);
    } else
      this.selectedDepo = [];


    if (this.vardiya.length > 0 && this.stkf.sf_vardiya !== "") {
      this.selectedVardiya = this.vardiya.filter((x: Vardiya) => x.vad_kod === this.stkf.sf_vardiya);
    } else
      this.selectedVardiya = [];

    //this.form.controls['depo'].setValue(this.stkf.sf_dp_no, {emitEvent: false});

    this.form.patchValue({
      sf_aciklama: this.stkf.sf_aciklama,
      sf_no2: this.stkf.sf_no2,
      sf_belge_trh: this.stkf.sf_belge_trh,
      sf_vardiya: this.stkf.sf_vardiya,
      depo: this.stkf.sf_dp_no,
    }, {emitEvent: false});
  }
  getDetail(sfd_sf_primno: number) {
    this.stkftopService.find(this.sirketNo, this.bicimNo, sfd_sf_primno)
      .subscribe((x) => {
        this.loadIndicatorVisible = true;
        if (x) {
          if (x.statusCode === 200) {
            this.stkfdTops = [];
            this.stkfdTops = x.data;

            this.stkfdTops.map((x: Stkfdtop) => {
              const result = this.mamlzs.find(m => m.mm_primno === x.sfd_mm_primno).mm_ad;
              x.StkfCmpt = new StkfCmpt();
              x.StkfCmpt.cmpt_mm_ad = result;
            });
          }
          this.grid.instance.refresh();
          this.loadIndicatorVisible = false;
        }
      }, error => {
        this.loadIndicatorVisible = false;
        this.toastr.error('Hata gerçekleşti(Detay)', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }
  deleteButton() {
    if (this.stkf.sf_primno === 0) return;

    if (this.stkfdTops.length > 0) {
      this.deleteAllDetail(this.stkf.sf_primno);
    } else {
      this.deleteMaster();
    }
  }
  deleteMaster() {
    if (this.stkf.sf_primno === 0) return;

    this.stkfService.delete(this.stkf.sf_primno)
      .subscribe((x) => {
        this.loadIndicatorVisible = true;
        if (x) {
          if (x.statusCode === 200) {
            this.clearFormMethod();
            this.toastr.success('Silme işlemi başarılı', ' ', {
              positionClass: 'toast-top-right',
            });
          }
          this.loadIndicatorVisible = false;
        }
      }, error => {
        this.loadIndicatorVisible = false;
        this.toastr.error('Hata gerçekleşti', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }
  deleteDetail(sfd_primno: number) {
    this.stkftopService.delete(sfd_primno)
      .subscribe((x) => {
        this.loadIndicatorVisible = true;
        if (x) {
          if (x.statusCode === 200) {
            this.getDetail(this.stkf.sf_primno);
            this.toastr.success('Silme işlemi başarılı', ' ', {
              positionClass: 'toast-top-right',
            });
          }
          this.loadIndicatorVisible = false;
        }
      }, error => {
        this.loadIndicatorVisible = false;
        this.toastr.error('Hata gerçekleşti', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }
  deleteAllDetail(sf_primno: number) {
    this.stkftopService.deleteAll(sf_primno)
      .subscribe((x) => {
        this.loadIndicatorVisible = true;
        if (x) {
          if (x.statusCode === 200) {
            this.deleteMaster();
            this.stkfdTops = [];
            this.grid.instance.refresh();
            this.toastr.success('Silme işlemi başarılı', ' ', {
              positionClass: 'toast-top-right',
            });
          }
          this.loadIndicatorVisible = false;
        }
      }, error => {
        this.loadIndicatorVisible = false;
        this.toastr.error('Hata gerçekleşti', 'Hata', {
          positionClass: 'toast-top-right',
        });
      });
  }
  private getVardiya(): void {
    this.vardiyaService.getVardiya().subscribe(x => {
      if (x) {
        if (x.statusCode === 200) {
          this.vardiya = x.data;
        }
      }
    }, error => {
      this.toastr.error('Veri hatası(Vardiya)', 'Hata', {
        positionClass: 'toast-top-right',
      });
    });
  }
  private getDepo(): void {
    this.depoService.getDepo().subscribe(x => {
      if (x) {
        if (x.statusCode === 200) {
          this.depos = x.data;
        }
      }
    }, error => {
      this.toastr.error('Veri hatası(Depo)', 'Hata', {
        positionClass: 'toast-top-right',
      });
    });
  }
  private getMamlz(): void {
    this.mamlzService.getAll(this.sirketNo).subscribe(x => {
      if (x) {
        if (x.statusCode === 200) {
          this.mamlzs = x.data;
        }
      }
    }, error => {
      this.toastr.error('Veri hatası(Malzeme)', 'Hata', {
        positionClass: 'toast-top-right',
      });
    });
  }
}

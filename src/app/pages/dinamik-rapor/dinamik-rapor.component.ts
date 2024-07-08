import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RaporService} from "../../services/rapor.service";
import {ToastrService} from "ngx-toastr";
import {RaporDizaynDet} from "../../models/rapordizayndet";
import {FilterModel} from "../../models/filter";
import {DinamikRaporColumns} from "../../models/raporcolumns";
import {RaporDizaynDetDeger} from "../../models/rapordizayndetdeger";
import {Year} from "../../models/year";
import {
  DevExtremeModule,
  DxButtonModule,
  DxFormModule,
  DxLoadIndicatorModule,
  DxPopupModule,
  DxTagBoxModule,
} from "devextreme-angular";
import {DinamikRaporRows} from "../../models/raporrows";
import {AppHeaderComponent} from "../../layouts/full/header/header.component";
import {DxSelectBoxTypes} from 'devextreme-angular/ui/select-box';
import {DxChartModule} from 'devextreme-angular';

@Component({
  selector: 'app-dinamik-rapor',
  standalone: true,
  imports: [CommonModule, DxChartModule, DxButtonModule, DxPopupModule, DxFormModule, DevExtremeModule, DxTagBoxModule, DatePipe, AppHeaderComponent, DxLoadIndicatorModule,],
  templateUrl: './dinamik-rapor.component.html',
  styleUrl: './dinamik-rapor.component.scss'
})
export class DinamikRaporComponent implements OnInit {

  dinamikRaporArama: boolean = false;
  searchButtonVisible: boolean = false;

  whereBetweenCombobox: string = '';
  whereBasicCombobox: string = '';
  whereBasicCombobox0: string = '';
  whereBasicCombobox1: string = '';
  whereBasicCombobox2: string = '';
  whereBasicCombobox3: string = '';
  whereBasicCombobox4: string = '';

  whereBasicDate: string = '';
  whereDate0: string = '';
  whereDate1: string = '';
  whereDate2: string = '';
  whereDate3: string = '';


  whereYear: string = '';
  whereYear1: string = '';
  whereYear2: string = '';

  //Input Numeric Between
  whereBetweenInputNumeric: string = '';
  numberBetween0: number = 0;
  numberBetween1: number = 0;
  numberBetween2: number = 0;
  numberBetween3: number = 0;


  whereBetweenInput: string = '';
  stringBetween0: string = '';
  stringBetween1: string = '';
  stringBetween2: string = '';
  stringBetween3: string = '';


  whereBasicInput: string = '';
  whereInput0: string = '';
  whereInput1: string = '';
  whereInput2: string = '';
  whereInput3: string = '';
  stringBasic0: string = '';
  stringBasic1: string = '';
  stringBasic2: string = '';
  stringBasic3: string = '';


  whereBasicDateTime: string = '';


  whereBasicItemCombo: string = '';
  whereBasicCombo0: string = '';
  whereBasicCombo1: string = '';
  whereBasicCombo2: string = '';
  whereBasicCombo3: string = '';
  itemComboBasic0: string = '';
  itemComboBasic1: string = '';
  itemComboBasic2: string = '';
  itemComboBasic3: string = '';


  yearsList: any[] = [];
  selectedYearsList: any[] = [];
  selectedYearsList2: any[] = [];

  dinamikRapors: DinamikRaporRows[];
  raporDizaynDets: RaporDizaynDet[];
  dinamikRaporFiltre: FilterModel;
  dinamikRaporValues: DinamikRaporColumns;
  dizaynDetDeger: RaporDizaynDetDeger;

  isPopupVisible: boolean = false;


  yearInDatas: RaporDizaynDet[];
  comboBasicDatas: RaporDizaynDet[];
  dateTimeBetweenDatas: RaporDizaynDet[];
  dateBasicDatas: RaporDizaynDet[];
  dateBetweenDatas: RaporDizaynDet[];
  inputBetweenNumericDetsDatas: RaporDizaynDet[];
  inputBetweenDetsDatas: RaporDizaynDet[];
  inputBasicDetsDatas: RaporDizaynDet[];


  itemComboBasicDatas: RaporDizaynDet[];
  itemComboBasicSplitDatas: any[];


  template: number = 1;

  isGridBoxOpenedCombo0 = false;
  isGridBoxOpenedCombo1 = false;
  isGridBoxOpenedCombo2 = false;
  isGridBoxOpenedCombo3 = false;
  isGridBoxOpenedCombo4 = false;

  gridBoxValueCombo0: number[];
  gridBoxValueCombo1: number[];
  gridBoxValueCombo2: number[];
  gridBoxValueCombo3: number[];
  gridBoxValueCombo4: number[];


  closeButtonOptions: Record<string, unknown>;
  clearButtonOptions: Record<string, unknown>;
  searchButtonOptions: Record<string, unknown>;

  whereBetweenDateTime: string = '';
  //DateTime Between
  dateTimenow0?: Date = null;//= new Date();
  dateTimenow1?: Date = null;
  dateTimenow2?: Date = null;
  dateTimenow3?: Date = null;


  //Date Between
  datenowBetween0?: Date = null;//Date = new Date();
  datenowBetween1?: Date = null;//Date = new Date();
  datenowBetween2?: Date = null;
  datenowBetween3?: Date = null;

  //Date Basic
  datenow0?: Date = null;//: Date = new Date();
  datenow1?: Date = null;
  datenow2?: Date = null;
  datenow3?: Date = null;


  dynamicColumns: any[] = [];

  loadIndicatorVisible = false;

  constructor(private raporService: RaporService,
              private toastr: ToastrService,
              private ref: ChangeDetectorRef,
              private datePipe: DatePipe,) {

    this.searchButtonOptions = {
      text: 'Ara',
      stylingMode: 'contained',
      type: 'success',
      onClick: () => {
        let whereValues = this.whereYear + this.whereBasicCombobox +
          this.whereBasicItemCombo + this.whereBetweenDateTime + this.whereBasicDate +
          this.whereBetweenInputNumeric + this.whereBasicInput + this.whereBetweenInput

        let s = whereValues === '' ? 'a' : whereValues;
        this.getData(9, s);
      },
    };
    this.clearButtonOptions = {
      text: 'Temizle',
      stylingMode: 'contained',
      type: 'default',
      onClick: () => {
        this.clearYearsValues();
        this.clearDateBasicValues();
        this.clearDateBetweenValues();
        this.clearStringBasicValues();
        this.clearStringBetweenValues();
        this.clearNumberBetweenValues();
        this.clearItemComboBasicValues();
        this.clearDatatimeBetweenValues();
        this.clearItemComboBetweenValues();
        this.clearInputStringBasicValues();
        this.clearInputStringBetweenValues();
        this.clearInputNumericBetweenValues();
      },
    };
    this.closeButtonOptions = {
      text: 'Kapat',
      stylingMode: 'contained',
      type: 'danger',
      onClick: () => {
        this.isPopupVisible = false;
      },
    };
  }

  ngOnInit(): void {
    //this.getData(516, "a");
    this.getFilter(119);
  }

  togglePopup(): void {
    this.isPopupVisible = !this.isPopupVisible;
  }

  private getData(raporID: any, whereParams: any): void {
    this.dinamikRaporValues = new DinamikRaporColumns();
    this.dinamikRapors = [];
    this.raporService.queryExecute(raporID, whereParams).subscribe(x => {
        if (!x) {
          this.toastr.info('Veri bulunamadı', 'Bilgi', {
            positionClass: 'toast-top-right',
          });
        } else {
          if (x.statusCode === 200) {
            this.dinamikRaporValues = x.data;
            this.dinamikRapors = x.data.dinamikRaporRows;
            this.dynamicColumns = [];

            const columnTitles = this.dinamikRaporValues['propertyColumn'];
            if (!columnTitles || columnTitles.length === 0)
              return;

            columnTitles.forEach((title, index) => {
              const columnConfig = {
                dataField: 'property' + index,
                caption: title,
                visible: title != null ? true : false
              };

              this.dynamicColumns.push(columnConfig);
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

  private getFilter(raporID: any): void {

    this.loadIndicatorVisible = true;
    this.dinamikRaporFiltre = new FilterModel();
    this.dinamikRaporValues = new DinamikRaporColumns();
    this.dizaynDetDeger = new RaporDizaynDetDeger();

    this.raporService.getFilter(raporID).subscribe(x => {
        if (x !== null) {
          if (x.statusCode === 200) {

            this.raporDizaynDets = x.data.result;

            if (x.statusCode.rowCount > 0) {
              this.searchButtonVisible = true;
            } else {
              this.getData(raporID, 'a');
              this.searchButtonVisible = false;
            }

            this.yearInDatas = this.raporDizaynDets.filter(item => item.tip === "yearcombo" && item.operator === "in");
            //Comboboxlar
            this.comboBasicDatas = this.raporDizaynDets.filter(x => x.tip === "combo" && x.operator === "between");

            //Datetime Between
            this.dateTimeBetweenDatas = this.raporDizaynDets.filter(x => x.tip === "datetime" && x.operator === "between");

            //Date Basic
            this.dateBasicDatas = this.raporDizaynDets.filter(x => x.tip === "date" && x.operator !== "between");

            //Date Between
            this.dateBetweenDatas = this.raporDizaynDets.filter(x => x.tip === "date" && x.operator === "between");

            //Input Between Numeric
            this.inputBetweenNumericDetsDatas = this.raporDizaynDets.filter(x => x.tip === "numeric" && x.operator === "between");

            //Input Between String
            this.inputBetweenDetsDatas = this.raporDizaynDets.filter(x => x.tip === "string" && x.operator === "between");

            //Input Basic String
            this.inputBasicDetsDatas = this.raporDizaynDets.filter(x => x.tip === "string" && x.operator !== "between");

            //Combobox Basic
            this.itemComboBasicDatas = this.raporDizaynDets.filter(x => x.tip === "itemcombo" && x.operator === "=");

            if (this.itemComboBasicDatas && this.itemComboBasicDatas.length > 0) {
              this.itemComboBasicSplitDatas = [];
              this.itemComboBasicDatas.forEach((item, index) => {
                if (item.deger) {
                  const values = item.deger.split(';');
                  const items = values.map((value, valueIndex) => ({
                    type: value.split(',')[0],
                    text: value.split(',')[1],
                  }));
                  this.itemComboBasicSplitDatas.push({
                    index: index,
                    valueIndex: 0,
                    caption: item.caption,
                    operator: item.operator,
                    colum: item.colum,
                    logical: item.logical,
                    items: items
                  });
                }
              });
            }

            //Years
            this.getYears();

            this.loadIndicatorVisible = false;
          } else if (x.statusCode === 500) {
            this.toastr.error('Bir hata oluştu!', 'Hata', {
              positionClass: 'toast-top-right',
            });
          }
        } else {

          this.searchButtonVisible = false;
        }
      },
      error => {
        this.toastr.error('Bir hata oluştu!', 'Hata', {
          positionClass: 'toast-top-right',
        });
      }
    );
  }

  private clearYearsValues() {
    //Years values...
    this.selectedYearsList = [];
    this.selectedYearsList2 = [];

    this.whereYear = '';
  }

  //Input numeric between values...
  private clearNumberBetweenValues() {
    this.numberBetween0 = 0;
    this.numberBetween1 = 0;
    this.numberBetween2 = 0;
    this.numberBetween3 = 0;

    this.whereBetweenInputNumeric = '';
  }

  // Input string between values...
  private clearStringBetweenValues() {
    this.stringBetween0 = '';
    this.stringBetween1 = '';
    this.stringBetween2 = '';
    this.stringBetween3 = '';

    this.whereBetweenInput = '';
  }

  //Input string basic values...
  private clearStringBasicValues() {
    this.whereBasicInput = '';
    this.whereInput0 = '';
    this.whereInput1 = '';
    this.whereInput2 = '';
    this.whereInput3 = '';
    this.stringBasic0 = '';
    this.stringBasic1 = '';
    this.stringBasic2 = '';
    this.stringBasic3 = '';
  }

  //Item Combo  Basic values...
  private clearItemComboBasicValues() {
    this.whereBasicItemCombo = '';
    this.whereBasicCombo0 = '';
    this.whereBasicCombo1 = '';
    this.whereBasicCombo2 = '';
    this.whereBasicCombo3 = '';
    this.itemComboBasic0 = '';
    this.itemComboBasic1 = '';
    this.itemComboBasic2 = '';
    this.itemComboBasic3 = '';
  }

  //Combobox Between values...
  private clearItemComboBetweenValues() {
    this.gridBoxValueCombo0 = [];
    this.gridBoxValueCombo1 = [];
    this.gridBoxValueCombo2 = [];
    this.gridBoxValueCombo3 = [];
    this.gridBoxValueCombo4 = [];

    this.whereBasicCombobox = '';
    this.whereBasicCombobox0 = '';
    this.whereBasicCombobox1 = '';
    this.whereBasicCombobox2 = '';
    this.whereBasicCombobox3 = '';
    this.whereBasicCombobox4 = '';
  }

  //Datetime between values...
  private clearDatatimeBetweenValues() {
    this.whereBetweenDateTime = '';
    this.dateTimenow0 = null;
    this.dateTimenow1 = null;
    this.dateTimenow2 = null;
    this.dateTimenow3 = null;
  }

  //Date between values...
  private clearDateBetweenValues() {
    this.whereBetweenDateTime = '';
    this.datenowBetween0 = null;
    this.datenowBetween1 = null;
    this.datenowBetween2 = null;
    this.datenowBetween3 = null;
  }

  // Date basic values...
  private clearDateBasicValues() {
    this.datenow0 = null;
    this.datenow1 = null;
    this.datenow2 = null;
    this.datenow3 = null;
    this.whereBasicDate = '';
  }

  //Input numeric between values...
  private clearInputNumericBetweenValues() {
    this.whereBetweenInputNumeric = '';
    this.numberBetween0 = 0;
    this.numberBetween1 = 0;
    this.numberBetween2 = 0;
    this.numberBetween3 = 0;
  }

  //Input string basic values...
  private clearInputStringBasicValues() {
    this.whereBasicInput = '';
    this.whereInput0 = '';
    this.whereInput1 = '';
    this.whereInput2 = '';
    this.whereInput3 = '';
    this.stringBasic0 = '';
    this.stringBasic1 = '';
    this.stringBasic2 = '';
    this.stringBasic3 = '';
  }

  // Input string between
  private clearInputStringBetweenValues() {
    this.whereBetweenInput = '';
    this.stringBetween0 = '';
    this.stringBetween1 = '';
    this.stringBetween2 = '';
    this.stringBetween3 = '';
  }

  getYears(): void {
    const yearsList: Year[] = [];
    const year: number = 2010;
    const nowYear: number = new Date().getFullYear() + 2;
    const result: number = nowYear - year;

    for (let x = 0; x < result + 1; x++) {
      const yearProperty: Year =
        {
          years: year + x
        };

      yearsList.push(yearProperty);
    }
    this.yearsList = yearsList;
  }

  onValueChangedWhereYear(field: string, event: any, item: RaporDizaynDet, selectedYearsList: any[]) {
    if (event.value !== null) {
      this.whereYear = '';
      switch (field) {
        case  "year1":
          this.whereYear1 = '';
          if (selectedYearsList !== null && selectedYearsList.length) {
            this.whereYear1 += `${item.logical} ${item.colum} ${item.operator} (${selectedYearsList})`;
          }
          break;
        case "year2":
          this.whereYear2 = '';
          if (selectedYearsList !== null && selectedYearsList.length) {
            this.whereYear2 += ` ${item.logical} ${item.colum} ${item.operator} (${selectedYearsList})`;
          }
          break;
      }
      this.whereYear = this.whereYear1 + this.whereYear2;
    }
  }

  gridBox_displayExpr0 = (data) => data && data.ad ? `${data.ad}` : '';
  gridBox_displayExpr1 = (data) => data && data.ad ? `${data.ad}` : '';
  gridBox_displayExpr2 = (data) => data && data.ad ? `${data.ad}` : '';
  gridBox_displayExpr3 = (data) => data && data.ad ? `${data.ad}` : '';
  gridBox_displayExpr4 = (data) => data && data.ad ? `${data.ad}` : '';

  onGridBoxValueChanged(field: any, e: any, item: RaporDizaynDet) {
    this.whereBasicCombobox = '';
    if (typeof (e.value) !== undefined && e.value !== null) {
      let result = e.value[0] ?? null;
      if (result !== null) {
        switch (field) {
          case ('combo0'): {
            this.whereBasicCombobox0 = '';

            const convertCaseProperty = this.propertyFirstLetterIfLower(e.value[0]);
            let combo0 = convertCaseProperty.Kod ?? null;
            if (combo0 !== null)
              this.whereBasicCombobox0 += ` ${item.logical} ${item.colum} ${item.operator} ('${combo0}')`;

            this.isGridBoxOpenedCombo0 = false;
            this.ref.detectChanges();
            break;
          }
          case ('combo1'): {
            this.whereBasicCombobox1 = '';
            const convertCaseProperty = this.propertyFirstLetterIfLower(e.value[0]);
            const combo1 = convertCaseProperty.Kod ?? null;
            if (combo1 !== null)
              this.whereBasicCombobox1 += ` ${item.logical} ${item.colum} ${item.operator} ('${combo1}')`;

            this.isGridBoxOpenedCombo1 = false;
            this.ref.detectChanges();
            break;
          }
          case ('combo2'): {
            this.whereBasicCombobox2 = '';
            const convertCaseProperty = this.propertyFirstLetterIfLower(e.value[0]);
            const combo2 = convertCaseProperty.Kod ?? null;
            if (combo2 !== null)
              this.whereBasicCombobox2 += ` ${item.logical} ${item.colum} ${item.operator} ('${combo2}')`;

            this.isGridBoxOpenedCombo2 = false;
            this.ref.detectChanges();
            break;
          }
          case ('combo3'): {
            this.whereBasicCombobox3 = '';
            const convertCaseProperty = this.propertyFirstLetterIfLower(e.value[0]);
            const combo3 = convertCaseProperty.Kod ?? null;
            if (combo3 !== null)
              this.whereBasicCombobox3 += ` ${item.logical} ${item.colum} ${item.operator} ('${combo3}')`;

            this.isGridBoxOpenedCombo3 = false;
            this.ref.detectChanges();
            break;
          }
          case ('combo4'): {
            this.whereBasicCombobox4 = '';
            const convertCaseProperty = this.propertyFirstLetterIfLower(e.value[0]);
            const combo4 = convertCaseProperty.Kod ?? null;
            if (combo4 !== null)
              this.whereBasicCombobox4 += ` ${item.logical} ${item.colum} ${item.operator} ('${combo4}')`;

            this.isGridBoxOpenedCombo4 = false;
            this.ref.detectChanges();
            break;
          }
        }
        this.whereBasicCombobox = this.whereBasicCombobox0 + this.whereBasicCombobox1 + this.whereBasicCombobox2 + this.whereBasicCombobox3 + this.whereBasicCombobox4;
      }
    }
  }

  //Combobox Basic
  onComboBasicValueChanged(field: any, event: DxSelectBoxTypes.ValueChangedEvent, item: any) {

    switch (field) {
      case 'comboBasic0': {
        this.whereBasicCombo0 = '';
        if (event) this.whereBasicCombo0 = ` ${item.logical} ${item.colum} ${item.operator} '${event.value["type"]}'`;
        break;
      }
      case 'comboBasic1': {
        this.whereBasicCombo1 = '';
        if (event) this.whereBasicCombo1 = ` ${item.logical} ${item.colum} ${item.operator} '${event.value["type"]}'`;
        break;
      }
      case 'comboBasic2': {
        this.whereBasicCombo2 = '';
        if (event) this.whereBasicCombo2 = ` ${item.logical} ${item.colum} ${item.operator} '${event.value["type"]}'`;
        break;
      }
      case 'comboBasic3': {
        this.whereBasicCombo3 = '';
        if (event) this.whereBasicCombo3 = ` ${item.logical} ${item.colum} ${item.operator} '${event.value["type"]}'`;
        break;
      }
    }

    this.whereBasicItemCombo = this.whereBasicCombo0 + this.whereBasicCombo1 + this.whereBasicCombo2 + this.whereBasicCombo3;
  }

  propertyFirstLetterIfLower(data: any): any {
    if (typeof data === 'object' && data !== null) {
      if (typeof data === 'object' && data !== null) {
        const processedItem: any = {};
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];
            if (typeof value === 'string' && value.length > 0) {
              if (value[0] === value[0].toUpperCase() && value.slice(1).toLowerCase() === value.slice(1)) {
                processedItem[key.charAt(0).toUpperCase() + key.slice(1)] = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
              } else {
                processedItem[key] = value;
              }
            } else {
              processedItem[key] = value;
            }
          }
        }
        return processedItem;
      } else {
        return data;
      }
    }
  }

  //Datetime Between
  onDateTimeValueChanged(field: any, event: any, item: RaporDizaynDet) {
    let whereDateTime0 = '', whereDateTime1 = '';

    if (field === 'datatime0' || field === 'datatime1') {
      switch (field) {
        case ('datatime0'): {
          if (event.value) {
            this.dateTimenow0 = event.value
            if (this.dateTimenow1 === null) this.dateTimenow1 = event.value;

            if (new Date(this.dateTimenow0) > new Date(this.dateTimenow1)) this.dateTimenow1 = event.value;

            const castDateTime0 = this.datePipe.transform(this.dateTimenow0, 'yyyy-MM-dd HH:mm:ss');
            const castDateTime1 = this.datePipe.transform(this.dateTimenow1, 'yyyy-MM-dd HH:mm:ss');

            whereDateTime0 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${castDateTime0}' AND '${castDateTime1}'`;
          } else {
            this.dateTimenow1 = null;
            whereDateTime0 = '';
          }
          break;
        }
        case ('datatime1'): {
          if (event.value) {

            if (this.dateTimenow0 === null) this.dateTimenow0 = new Date();

            if (new Date(this.dateTimenow0) > new Date(this.dateTimenow1)) this.dateTimenow1 = event.value;

            const castDateTime0 = this.datePipe.transform(this.dateTimenow0, 'yyyy-MM-dd HH:mm:ss');
            const castDateTime1 = this.datePipe.transform(this.dateTimenow1, 'yyyy-MM-dd HH:mm:ss');
            whereDateTime0 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${castDateTime0}' AND '${castDateTime1}'`;
          } else {
            this.dateTimenow0 = null;
            whereDateTime0 = '';
          }
          break;
        }
      }
    } else if (field === 'datatime2' || field === 'datatime3') {
      switch (field) {
        case ('datatime2'): {
          if (event.value) {

            if (this.dateTimenow3 === null) this.dateTimenow3 = event.value;
            const castDateTime2 = this.datePipe.transform(this.dateTimenow2, 'yyyy-MM-dd HH:mm:ss');
            const castDateTime3 = this.datePipe.transform(this.dateTimenow3, 'yyyy-MM-dd HH:mm:ss');

            whereDateTime1 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${castDateTime2}' AND '${castDateTime3}'`;
          } else {
            this.dateTimenow3 = null;
            whereDateTime1 = '';
          }
          break;
        }
        case ('datatime3'): {
          if (event.value) {
            if (this.dateTimenow2 === null) this.dateTimenow2 = new Date();
            const castDateTime2 = this.datePipe.transform(this.dateTimenow2, 'yyyy-MM-dd HH:mm:ss');
            const castDateTime3 = this.datePipe.transform(this.dateTimenow3, 'yyyy-MM-dd HH:mm:ss');
            whereDateTime1 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${castDateTime2}' AND '${castDateTime3}'`;
          } else {
            this.dateTimenow2 = null;
            whereDateTime1 = '';
          }
          break;
        }
      }
    }
    this.whereBetweenDateTime = whereDateTime0 + whereDateTime1;
  }

  //Date Between
  onDateBetweenValueChanged(field: any, event: any, item: RaporDizaynDet) {
    let whereDateBetween0 = '', whereDateBetween1 = '';

    if (field === 'date0' || field === 'date1') {
      switch (field) {
        case ('date0'): {
          if (event.value) {
            this.datenowBetween0 = event.value
            if (this.datenowBetween1 === null) this.datenowBetween1 = event.value;

            if (new Date(this.datenowBetween0) >= new Date(this.datenowBetween1))
              this.datenowBetween1 = event.value;

            const castDate0 = this.datePipe.transform(this.datenowBetween0, 'yyyy-MM-dd');
            const castDate1 = this.datePipe.transform(this.datenowBetween1, 'yyyy-MM-dd');

            whereDateBetween0 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${castDate0}' AND '${castDate1}'`;
          } else {
            this.datenowBetween1 = null;
            whereDateBetween0 = '';
          }
          break;
        }
        case ('date1'): {
          if (event.value) {
            if (this.datenowBetween0 === null) this.datenowBetween0 = new Date();

            if (!(new Date(this.datenowBetween0) <= new Date(this.datenowBetween1)))
              this.datenowBetween1 = event.value;

            const castDate0 = this.datePipe.transform(this.datenowBetween0, 'yyyy-MM-dd');
            const castDate1 = this.datePipe.transform(this.datenowBetween1, 'yyyy-MM-dd');
            whereDateBetween0 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${castDate0}' AND '${castDate1}'`;
          } else {
            this.datenowBetween0 = null;
            whereDateBetween0 = '';
          }
          break;
        }
      }
    } else if (field === 'date2' || field === 'date3') {
      switch (field) {
        case ('date2'): {
          if (event.value) {
            this.datenowBetween2 = event.value
            if (this.datenowBetween3 === null) {
              this.datenowBetween3 = event.value;
            }
            if (this.datenowBetween2)
              if (new Date(this.datenowBetween2) >= new Date(this.datenowBetween3)) this.datenowBetween3 = event.value;

            const castDate2 = this.datePipe.transform(this.datenowBetween2, 'yyyy-MM-dd');
            const castDate3 = this.datePipe.transform(this.datenowBetween3, 'yyyy-MM-dd');

            whereDateBetween1 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${castDate2}' AND '${castDate3}'`;
          } else {
            this.datenowBetween3 = null;
            whereDateBetween1 = '';
          }
          break;
        }
        case ('date3'): {
          if (event.value) {
            if (this.datenowBetween2 === null) this.datenowBetween2 = new Date();
            const castDate2 = this.datePipe.transform(this.datenowBetween2, 'yyyy-MM-dd');
            const castDate3 = this.datePipe.transform(this.datenowBetween3, 'yyyy-MM-dd');
            whereDateBetween1 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${castDate2}' AND '${castDate3}'`;
          } else {
            this.datenowBetween2 = null;
            whereDateBetween1 = '';
          }
          break;
        }
      }
    }
    this.whereBetweenDateTime = whereDateBetween0 + whereDateBetween1;
    this.ref.detectChanges();
  }

  //Date Basic
  onDateValueChanged(field: any, event: any, item: RaporDizaynDet) {
    let castDate = '', resultQuery = '';
    if (event) castDate = this.datePipe.transform(event.value, 'yyyy-MM-dd');

    if (event) resultQuery = ` ${item.logical} ${item.colum} ${item.operator} '${castDate}'`;
    switch (field) {
      case 'date0': {
        this.whereDate0 = '';
        this.whereDate0 = resultQuery;
        break;
      }
      case 'date1': {
        this.whereDate1 = '';
        this.whereDate1 = resultQuery;
        break;
      }
      case 'date2': {
        this.whereDate2 = '';
        this.whereDate2 = resultQuery;
        break;
      }
      case 'date3': {
        this.whereDate3 = '';
        this.whereDate3 = resultQuery;
        break;
      }
    }
    this.whereBasicDate = this.whereDate0 + this.whereDate1 + this.whereDate2 + this.whereDate3;
  }

  //Input Numeric Between
  onNumericValueChanged(field: any, event: any, item: RaporDizaynDet) {
    let whereNumeric0 = '', whereNumeric1 = '';

    if (field === 'number0' || field === 'number1') {
      switch (field) {
        case ('number0'): {
          this.numberBetween0 = event.value;
          this.numberBetween1 = event.value;
          break;
        }
        case('number1'): {
          this.numberBetween1 = event.value
          break;
        }
      }
    } else if (field === 'number2' || field === 'number3') {
      switch (field) {
        case ('number2'): {
          this.numberBetween2 = event.value
          this.numberBetween3 = event.value;
          break;
        }
        case('number3'): {
          this.numberBetween3 = event.value
          break;
        }
      }
    }

    if (this.numberBetween0 !== null && this.numberBetween0 !== 0)
      whereNumeric0 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${this.numberBetween0}' AND '${this.numberBetween1 !== null ? this.numberBetween1 : 0}'`;

    if (this.numberBetween2 !== null && this.numberBetween2 !== 0)
      whereNumeric1 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${this.numberBetween2}' AND '${this.numberBetween3 !== null ? this.numberBetween3 : 0}'`;

    this.whereBetweenInputNumeric = whereNumeric0 + whereNumeric1;
  }

  //Input String Basic
  onStringBasicValueChange(field: any, event: any, item: RaporDizaynDet) {
    let resultQuery = '';
    if (event && field) resultQuery = ` ${item.logical} ${item.colum} ${item.operator} '${event.value}'`;

    switch (field) {
      case 'string0': {
        this.whereDate0 = '';
        //if (event) this.whereInput0 = ` ${item.logical} ${item.colum} ${item.operator} '${event.value}'`;
        this.whereInput0 = resultQuery;
        break;
      }
      case 'string1': {
        this.whereDate1 = '';
        //if (event) this.whereInput1 = ` ${item.logical} ${item.colum} ${item.operator} '${event.value}'`;
        this.whereInput1 = resultQuery;
        break;
      }
      case 'string2': {
        this.whereDate2 = '';
        //if (event) this.whereInput2 = ` ${item.logical} ${item.colum} ${item.operator} '${event.value}'`;
        this.whereInput2 = resultQuery;
        break;
      }
      case 'string3': {
        this.whereDate3 = '';
        //if (event) this.whereInput3 = ` ${item.logical} ${item.colum} ${item.operator} '${event.value}'`;
        this.whereInput3 = resultQuery;
        break;
      }
    }
    this.whereBasicInput = this.whereInput0 + this.whereInput1 + this.whereInput2 + this.whereInput3;
  }

  //Input String Between
  onStringBetweenValueChange(field: any, event: any, item: RaporDizaynDet) {
    let whereString0 = '', whereString1 = '';

    if (field === 'string0' || field === 'string1') {
      switch (field) {
        case ('string0'): {
          this.stringBetween0 = event.value;
          this.stringBetween1 = event.value;
          break;
        }
        case('string1'): {
          this.stringBetween1 = event.value
          break;
        }
      }
    } else if (field === 'string2' || field === 'string3') {
      switch (field) {
        case ('string2'): {
          this.stringBetween2 = event.value
          this.stringBetween3 = event.value;
          break;
        }
        case('string3'): {
          this.stringBetween3 = event.value
          break;
        }
      }
    }

    if (this.stringBetween0 !== null && this.stringBetween0 !== '')
      whereString0 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${this.stringBetween0}' AND '${this.stringBetween1 !== null ? this.stringBetween1 : ''}'`;

    if (this.stringBetween2 !== null && this.stringBetween2 !== '')
      whereString1 = ` ${(item.logical !== undefined ? item.logical : 'AND')} ${item.colum} ${item.operator} '${this.numberBetween2}' AND '${this.stringBetween3 !== null ? this.stringBetween3 : ''}'`;

    this.whereBetweenInput = whereString0 + whereString1;
  }
}

import { Injectable } from '@angular/core';
import { RecordArchive } from '../models/kytarsiv';
import { FormatDateMethod } from './format-date.method';

@Injectable({
  providedIn: 'root',
})
export class LogMethod {
  constructor(private formatDate:FormatDateMethod ) {}


  public setChangesInfo(
    kyt_table: string,
    kyt_grs_win: string, // 'w_sp_ana'
    kyt_dw_name: string, // 'd_sp_b050'
    kyt_clas_name: string, // 'dw_2'
    kyt_kid: number,
    kyt_col_name: string,
    kyt_col_adi: string,
    kyt_ilk_veri: string,
    kyt_son_veri: string,
    kyt_user: string,
    changesInfo: Array<RecordArchive>,
  ) {
    const currentDateTime = this.formatDate.FormatDate("YYYY/MM/DD HH/MM/SS",new Date());
    changesInfo.push({
      kyt_table: kyt_table,
      kyt_kid: kyt_kid,
      kyt_kid2: 0,
      kyt_ksira: 0,
      kyt_ksira2: 0,
      kyt_user: kyt_user,
      kyt_col_name: kyt_col_name,
      kyt_col_adi: kyt_col_adi,
      kyt_time: currentDateTime,
      kyt_islem: 1,
      kyt_kod: '',
      kyt_clas_name: kyt_clas_name,
      kyt_grs_no: 50,
      kyt_grs_win: kyt_grs_win,
      kyt_grs_tur: 0,
      kyt_grs_tab: 2,
      kyt_grs_tabp: 1,
      kyt_dw_name: kyt_dw_name,
      kyt_ilk_veri: kyt_ilk_veri,
      kyt_son_veri: kyt_son_veri,
    });

    return changesInfo;
  }
}

export interface Spd {
  compute_mm_ad: string;
  mm_ad: string;
  compute_stok: any;
  spd_sp_durum: string;
  compute_kalip_drm: string;
  mm_alis_fiyat: string;
  mm_alis_dvz_kod: string;
  frm_ksad: string;

  compute_bakiye_boy: string;
  compute_bakiye_miktar: string;

  spd_primno: number;
  spd_sp_primno?: number;
  spd_srk_no: number;
  spd_bcmno: number;
  spd_no1: number;
  spd_no2: number;
  spd_sira: number;
  spd_sipno: number;
  spd_sde_no: number;
  spd_frm_kod: string;
  spd_frmd_kod: string;
  spd_sk_kod: string;
  spd_st_kod: string;
  spd_gsip_yil: number;
  spd_gsip_no: number;
  spd_gsip_sira: number;
  spd_mm_primno: number;
  spd_mm_tur: number;
  spd_mm_kod: string;
  spd_partino: string;
  spd_frm_sipno: string;
  spd_mkt: number;
  spd_birim: string;
  spd_bmkt: number;
  spd_mkt_kg: number;
  spd_mkt_mt: number;
  spd_iskonto: number;
  spd_fiyat: number;
  spd_dvz_kod: string;
  spd_hspbirim: string;
  spd_hsptur: string;
  spd_vade: number;
  spd_bitis: string;
  spd_tertrh?: Date;
  spd_tlmt_primno: number;
  spd_tlmt_kod: string;
  spd_cl_primno: number;
  spd_cl_kod: string;
  spd_des_primno: number;
  spd_des_kod: string;
  spd_varyant: string;
  spd_hen: number;
  spd_hgrmj: number;
  spd_hmetretul: number;
  spd_men: number;
  spd_mgrmj: number;
  spd_mmetretul: number;
  spd_cek: number;
  spd_ceken: number;
  spd_cekboy: number;
  spd_pus: number;
  spd_fayn: number;
  spd_tup_may: string;
  spd_aciklama: string;
  spd_sevk_aciklama: string;
  spd_amb_kod: string;
  spd_spg_primno: number;
  spd_spg_kod: string;
  spd_kg_top: number;
  spd_smkt_kg: number;
  spd_smkt_mt: number;
  spd_smkt_top: number;
  spd_sbmkt_kg: number;
  spd_sbmkt_mt: number;
  spd_sbmkt_top: number;
  spd_wmkt_kg: number;
  spd_wmkt_mt: number;
  spd_wmkt_top: number;
  spd_wmkt_kg_dp: number;
  spd_wmkt_mt_dp: number;
  spd_wmkt_top_dp: number;
  spd_umkt_kg: number;
  spd_umkt_mt: number;
  spd_umkt_top: number;
  spd_ubmkt_kg: number;
  spd_ubmkt_mt: number;
  spd_ubmkt_top: number;
  spd_prs_primno: number;
  spd_prs_kod: string;
  spd_maxen: number;
  spd_minen: number;
  spd_maxgrmj: number;
  spd_mingrmj: number;
  spd_cektest: string;
  spd_fire: number;
  spd_gel_mkt: number;
  spd_gel_mt: number;
  spd_gel_top: number;
  spd_gid_mkt: number;
  spd_gid_mt: number;
  spd_gid_top: number;
  uk: string;
  updt: Date | null;
  iuk: string;
  idt: Date | null;
  spd_siptrh: Date | null;
  spd_eb_kod: string;
  spd_mak_kod: string;
  spd_referans: string;
  spd_amb_mkt: number;
  spd_list_fiyat: number;
  spd_iskonto2: number;
  spd_iskonto3: number;
  spd_vade_farki: number;
  spd_list_dvz_kod: string;
  spd_faiz: number;
  spd_gsip_primno: number;
  spd_ver_mkt: number;
  spd_ver_bmkt: number;
  spd_ver_top: number;
  spd_ver_mkt_mt: number;
  spd_dept_no: number;
  spd_oncelik: number;
  spd_onay: string;
  spd_onaytrh: Date | null;
  spd_redtrh: Date | null;
  spd_sonuc: string;
  spd_cfyg_primno: number;
  spd_cfyg_kod: string;
  spd_label_kod: string;
  spd_tolerans: number;
  spd_donmezlik: number;
  spd_ipluz: string;
  spd_lotno: string;
  spd_otertrh: Date | null;
  spd_btertrh: Date | null;
  spd_gel_acik: string;
  spd_kayit: number;
  spd_cfyg_id2: number;
  spd_cfyg_kod2: string;
  spd_i1: number;
  spd_i2: number;
  spd_kod1: string;
  spd_kod2: string;
  spd_kdv: number;
  spd_fyt_drm: number;
  spd_kartela: string;
  spd_fiyat2: number;
  spd_dvz_kod2: string;
  spd_rev: number;
  spd_lfyd_id: number;
  spd_aspd_id: number;
  spd_asp_id: number;
  spd_asp_bcmno: number;
  spd_asp_no1: number;
  spd_asp_no2: number;
  spd_aspd_sira: number;
  spd_fyt_id: number;
  spd_etk_aciklama: string;
  spd_dept_no2: number;
  spd_des_id2: number;
  spd_des_kod2: string;
  spd_lme_kur: number;
  spd_lfyd_tur: number;
  spd_lme_tur: number;
  spd_kur: number;
  spd_kurtrh: Date | null;
  spd_yuzey_islem: string;
  spd_yuzey: string;
  spd_siptur: string;
  spd_yuzey_kalinlik: number;
  spd_lfy_id: number;
  spd_kur_tur: number;
  spd_mm_sat_id: number;
  spd_mm_sat_kod: string;
  spd_ent_aciklama: string;
  spd_hspdvz_kod: string;
  spd_paket_mkt: number;
  spd_ei_id: number;
  spd_islt_id: number;
  spd_islt_kod: string;
  spd_htt_id: number;
  spd_amb_mm_id: number;
  spd_amb_mm_kod: string;
  spd_amb_partino: string;
  spd_amb_grmj: number;
  spd_urtt_id: number;
  spd_urtt_kod: string;
  spd_bitis_aciklama: string;
  spd_bastrh: Date | null;
  spd_bittrh: Date | null;
  spd_mark_kod: string;
  spd_dp_cik_mkt: number;
  spd_dp_cik_mkt_mt: number;
  spd_dp_cik_brtmkt: number;
  spd_dp_cik_mkt_top: number;
  spd_dp_cik_mkt_amb: number;
  spd_pesinat: number;
  spd_satin_alma_trh: Date | null;
  spd_havale_trh: Date | null;
  spd_gumruk_ver_orani: number;
  spd_gumruk_ver_tutar: number;
  spd_konsimento: string;
  spd_ormkt_kg: number;
  spd_ormkt_mt: number;
  spd_ormkt_top: number;
  spd_havale_tutar: number;
  spd_masraf_tutar: number;
  spd_svk_dp_no: number;
  spd_dp_no: number;
  spd_spi_sira: number;
  spd_spi_id: number;
  spd_spda_tur: number;
  spd_spda_sira: number;
  spd_as_iz: number;
  spd_as_oriz: number;
  spd_tertrh2: Date | null;
  spd_tolerans_negatif: number;
  spd_tolerans_pozitif: number;
  spd_batchno: string;
  spd_aciklama1: string;
  spd_aciklama2: string;
  spd_cl_rpt: number;
  compute_sp_drm: string;
}

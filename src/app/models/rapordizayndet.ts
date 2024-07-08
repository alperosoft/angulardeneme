import {RaporDizaynDetDeger} from "./rapordizayndetdeger";

export class RaporDizaynDet {
  id: number;
  rapor_dizayn_id: number;
  colum: string;
  operator: string;
  deger: string;
  tip: string;
  tip2: number;
  logical: string;
  bcmno: number;
  caption: string;
  raporDizayn_Det_Deger: RaporDizaynDetDeger[];
}

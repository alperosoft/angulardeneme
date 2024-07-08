import { Bankahsp } from "./bankahsp";

export class Banka {
    srk_no: number;
    ban_kod: string;
    ban_ad: string = "";
    uk: string = "";
    updt: Date | null = null;
    iuk: string = "";
    idt: Date | null = null;
    ban_sube: string = "";
    ban_adres: string = "";
    ban_telefon: string = "";
    ban_fax: string = "";
    ban_webadres: string = "";

    Where: any | null = null;
    Bankahsp?: Bankahsp;
}
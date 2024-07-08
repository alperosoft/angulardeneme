import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatDateMethod {
  constructor() {}

  public FormatDate(dateType: string, dateString: string | Date) {
    if (!dateString) {
      return '';
    }
  
    const dateObj = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if(dateType==="YYYY/MM/DD HH/MM/SS"){
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hour = dateObj.getHours().toString().padStart(2, '0');
    const minute = dateObj.getMinutes().toString().padStart(2, '0');
    const second = dateObj.getSeconds().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }else if (dateType === "YYYY/MM/DD"){
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }else{
    return ""
  }

  }
}

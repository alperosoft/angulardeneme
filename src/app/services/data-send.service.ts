import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Task} from "../models/task";
import {Kanbanboard} from "../models/kanbanboard";

@Injectable({
  providedIn: 'root'
})
export class DragTransferService {

  private dataSubject: BehaviorSubject<Kanbanboard> = new BehaviorSubject<Kanbanboard>(null);

  constructor() {
  }

  sendData(id: any, text: any, icon: any, url: any): void {
    const kanban = new Kanbanboard();
    kanban.kart_id = 0;
    kanban.kart_index = 0;
    kanban.kart_text = text ?? '';
    kanban.menu_id = id ?? 0;
    kanban.kart_icon = icon;
    kanban.kart_url = url;
    this.dataSubject.next(kanban);
  }

  getData(): Observable<Kanbanboard> {
    return this.dataSubject.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitlecardService {

  private showHomeHeader: BehaviorSubject<string> = new BehaviorSubject<string>('Home');
  showHomeHeader$ = this.showHomeHeader.asObservable();

  constructor() { }

  setTitleCard(titleNew: string): void {
    this.showHomeHeader.next(titleNew);
  }
}

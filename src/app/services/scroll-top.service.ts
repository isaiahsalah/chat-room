import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {

  constructor() { }

  public scrollTop = new BehaviorSubject<boolean>(false);


}

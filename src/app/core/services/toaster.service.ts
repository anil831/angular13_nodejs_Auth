import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private subject = new Subject<{text:string, type:string}>();

  constructor() { }

  getMessages(){
    return this.subject.asObservable();
  } 

  showSuccess(message:string){
    this.subject.next({text:message + "", type:'success'});
  }

  showError(message:string){
    this.subject.next({text:message, type:'error'})
  }

  showInfo(message:string){
    this.subject.next({text:message, type:'info'})
  }

}

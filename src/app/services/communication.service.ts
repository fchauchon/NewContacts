import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

    subject = new Subject<string>();

    constructor() { }
  
    pushData(data: string) {

        this.subject.next(data);
    }

    onData(): Observable<string> {

        return this.subject.asObservable();
    }
}

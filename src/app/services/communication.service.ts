import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Person } from '../classes/person';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

    subject = new Subject<string>();
    messageQueue = new Subject<Person>();

    constructor() { }
  
    pushData(data: string) {
        this.subject.next(data);
    }

    onData(): Observable<string> {
        return this.subject;
    }

    pushMessage(data: Person) {
        this.messageQueue.next(data);
    }

    onMessage(): Observable<Person> {
        return this.messageQueue;
    }
}

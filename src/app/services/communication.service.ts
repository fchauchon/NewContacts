import { Injectable } from '@angular/core';
import { Person } from '../classes/person';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Message } from '../classes/message';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

    protected messageQueue = new Subject<string>();
    protected notificationQueue = new Subject<Message>();
    protected refreshQueue = new BehaviorSubject<boolean>(true);

    constructor() { }
  
    pushMessage(message: string) {
        this.messageQueue.next(message);
    }

    onMessage(): Observable<string> {
        return this.messageQueue.asObservable();
    }

    pushError(errorMessage: string) {
        this.notificationQueue.next(new Message('ERROR', errorMessage));
    }

    pushConfirmation(confirmationMessage: string) {
        this.notificationQueue.next(new Message('NOTIFICATION', confirmationMessage));
    }

    onNotification(): Observable<Message> {
        return this.notificationQueue.asObservable();
    }
}

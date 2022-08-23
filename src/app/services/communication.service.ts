import { Injectable } from '@angular/core';
import { Person } from '../classes/person';
import { Observable, Subject } from 'rxjs';
import { Message } from '../classes/message';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

    protected messageQueue = new Subject<string>();
    protected notificationQueue = new Subject<Message>();
    protected starQueue = new Subject<string>();

    private _sharedNumber: number = 200

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

    public get sharedNumber(): number {
        return this._sharedNumber;
    }

    public set sharedNumber(value: number) {
        this._sharedNumber = value;
    }

    pushStar(start: string) {
        this.starQueue.next(start);
    }

    onStar(): Observable<string> {
        return this.starQueue.asObservable();
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { Person } from '../classes/person';
import { environment } from '../../environments/environment'
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    baseUrl: string = environment.baseUrl;
    cache: Array<Person> = null;

    constructor(
        private http: HttpClient,
        private communicationService: CommunicationService
    ) { }

    getContacts(): Observable<Array<Person>> {
        return this.http.get<Array<Person>>(this.baseUrl + 'actors').pipe(
            delay(2000),
            catchError( () => {
                this.communicationService.pushError('Le json-server est absent !')
                return of(null);
            })
        );
    }

    getContactsCache(): Observable<Array<Person>> {
        return iif(
            () => this.cache !== null,
            of(this.cache).pipe(
                tap(()=> console.log('From cache !!!'))
            ),
            this.http.get<Array<Person>>(this.baseUrl + 'actors').pipe(
                delay(2000),
                tap( (data : Array<Person>) => this.cache = data ),
                catchError( () => {
                    this.communicationService.pushError('Le json-server est absent !')
                    return of(null);
                })
            )
        )
    }

    getContactsFemme(): Observable<Array<Person>> {
        return this.http.get(this.baseUrl + 'actors').pipe(
            map( (array: Array<object>) => 
                array
                    .filter( (obj: object) => obj['gender'] === 'Femme' )
                    .map( (obj: object) => new Person(obj['id'], obj['firstName'], obj['lastName'], obj['email'], obj['gender']) )
            ),
            catchError( () => {
                this.communicationService.pushError('Le json-server est absent !')
                return of(null);
            })
        )
    }

    getContact(id: string): Observable<Person> {
        return this.http.get<Person>(this.baseUrl + 'actors/' + id).pipe(
            catchError( () => {
                this.communicationService.pushError('Le json-server est absent !')
                return of(null);
            })
        )
    }

    getContactFull(id: string): Observable<Person> {
        let myActor = null;

        return this.http.get<Person>(this.baseUrl + 'actors/' + id).pipe(
            tap( (data) => myActor = data ),
            switchMap( (actor: any) => this.http.get(this.baseUrl + 'series/' + actor.serieId)),
            tap( (data) => myActor.series = data),
            map( () => myActor )
        );
    }

    searchContacts(query: string): Observable<Array<string>> {
        return this.http.get(this.baseUrl + 'actors?lastName_like=' + query).pipe(
            tap((data)=> console.log(data)),
            map(
                (data: Array<object>) => data.map( obj => obj['firstName'] + ' ' + obj['lastName'] )
            ),
            catchError( () => {
                this.communicationService.pushError('Le json-server est absent !')
                return of(null);
            })
        );
    }

    addContact(person: Person): Observable<any> {
        return this.http.post(this.baseUrl + 'actors/', person).pipe(
            catchError( () => {
                this.communicationService.pushError('Le json-server est absent !')
                return of(null);
            })
        );
    }

    deleteContact(id: string): Observable<any> {
        return this.http.delete(this.baseUrl + 'actors/' + id).pipe(
            catchError( () => {
                this.communicationService.pushError('Le json-server est absent !')
                return of(null);
            })
        );
    }

    getToken(): string {
        return "0123456789";
    }

}

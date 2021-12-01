import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, filter, map, tap } from 'rxjs/operators';
import { Person } from '../classes/person';
import { environment } from '../../environments/environment'
import { Observable, of } from 'rxjs';
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
        if (this.cache === null) {
            return this.http.get<Array<Person>>(this.baseUrl + 'actors').pipe(
                delay(2000),
                tap( (data : Array<Person>) => this.cache = data ),
                catchError( () => {
                    this.communicationService.pushError('Le json-server est absent !')
                    return of(null);
                })
            );
        } else {
            console.log('From cache !!!');
            return of(this.cache);
        }
    }

    getContactsFemme(): Observable<Array<Person>> {
        return this.http.get(this.baseUrl + 'actors')
        .pipe(
            map( (array: Array<object>) => 
                array
                    .filter( (obj: object) => obj['gender'] === 'Femme' )
                    .map( (obj: object) => new Person(obj['id'], obj['firstName'], obj['lastName'], obj['email'], obj['gender']) )
            )
        )
    }

    searchContacts(query: string): Observable<Array<string>> {
        return this.http.get(this.baseUrl + 'actors?lastName_like=' + query).pipe(
            map(
                (data: Array<object>) => data.map( obj => obj['firstName'] + ' ' + obj['lastName'] )
            )
        );
    }

    addContact(person: Person): Observable<any> {
        return this.http.post(this.baseUrl + 'actors/', person);
    }

    deleteContact(id: number): Observable<any> {
        return this.http.delete(this.baseUrl + 'actors/' + id);
    }

    getToken(): string {
        return "0123456789";
    }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Person } from '../classes/person';
import { CommunicationService } from './communication.service';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

    cache: Array<Person> = null;
    baseUrl: string;

    constructor(
        private http: HttpClient,
        private communicationService: CommunicationService
    ) {
        this.baseUrl = environment.baseUrl;
    }

    getContacts(): Observable<Array<Person>> {

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
        return this.http.get(this.baseUrl + 'actors').pipe(
            map(
                (data: Array<object>) => 
                    // data
                    //     .map( obj => new Person(obj['id'], obj['firstName'], obj['lastName'], obj['email'], obj['gender'] ))
                    //     .filter((person: Person)=>person.gender === "Femme" )
                    data
                        .filter( obj => obj['gender'] === "Femme" )
                        .map( obj => new Person(obj['id'], obj['firstName'], obj['lastName'], obj['email'], obj['gender']) )
            )
        );
    }

    searchContacts(query: string): Observable<Array<string>> {
        return this.http.get(this.baseUrl + 'actors?lastName_like=' + query).pipe(
            map(
                (data: Array<object>) => data.map( obj => obj['firstName'] + ' ' + obj['lastName'] )
            )
        );
    }

    addContact(person: Person): void {
        this.http.post(this.baseUrl + 'actors/', person).pipe(
            catchError( () => {
                this.communicationService.pushError('Erreur avec le json-server !')
                return of(null);
            })
        ).subscribe();
    }

    deleteContact(id: number): void {
        this.http.delete(this.baseUrl + 'actors/' + id).pipe(
            catchError( () => {
                this.communicationService.pushError('Erreur avec le json-server !')
                return of(null);
            })
        ).subscribe();
    }

    getToken(): string {
        return "0123456789";
    }

}

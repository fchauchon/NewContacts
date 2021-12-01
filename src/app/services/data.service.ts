import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { delay, filter, map, tap } from 'rxjs/operators';
import { Person } from '../classes/person';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DataService {

    baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getContacts(): Observable<Array<Person>> {
        return this.http.get<Array<Person>>(this.baseUrl + 'actors')
            .pipe(
                tap( (data: Array<Person>) => console.log(data)),
                delay(2000)
            );
    }

    getContactsFiltered(): Observable<Array<Person>> {
        return this.http.get(this.baseUrl + 'actors')
        .pipe(
            map( (array: Array<object>) => {
                return array.map( (obj: object) => {
                    return new Person(obj['id'], obj['firstName'], obj['lastName'], obj['email'], obj['gender'])
                })
                .filter( (person: Person) => person.gender === 'Femme')
            })
        );
    }

    getContactsFiltered2(): Observable<Array<Person>> {
        return this.http.get(this.baseUrl + 'actors')
        .pipe(
            map( (array: Array<object>) => 
                array
                    .filter( (obj: object) => obj['gender'] === 'Femme')
                    .map( (obj: object) => new Person(obj['id'], obj['firstName'], obj['lastName'], obj['email'], obj['gender'])
                )
            )
        );
    }

    addContact(person: Person): void {
        this.http.post(this.baseUrl + 'actors/', person).subscribe();
    }

    deleteContact(id: number): void {
        this.http.delete(this.baseUrl + 'actors/' + id).subscribe();
    }

    getToken(): string {
        return "0123456789";
    }


}

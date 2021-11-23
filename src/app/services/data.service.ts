import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Person } from '../classes/person';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    subject = new Subject<string>();

    constructor(private http: HttpClient) { }

    getContacts(): Observable<Array<Person>> {

        return this.http.get<Array<Person>>('http://localhost:3000/actors');
    }

    getContactsFemme(): Observable<Array<Person>> {

        // return this.http.get('http://localhost:3000/actors').pipe(
        //     map(
        //         (data: Array<object>) => 
        //             data.map( obj => new Person(obj['id'], obj['firstName'], obj['lastName'], obj['email'], obj['gender'] )).filter((person: Person)=>person.gender === "Femme" )
        //     )
        // );
        return this.http.get('http://localhost:3000/actors').pipe(
            map(
                (data: Array<object>) => 
                    data.map( obj => new Person(obj['id'], obj['firstName'], obj['lastName'], obj['email'], obj['gender'] ))
            ),
            filter( (data: Array<Person>) => { console.log(data); return true})
        );

    }

    addContact(person: Person): void {

        this.http.post('http://localhost:3000/actors/', person).subscribe();
    }

    deleteContact(id: number): void {

        this.http.delete('http://localhost:3000/actors/' + id).subscribe();
    }

    getToken(): string {

        return "0123456789";
    }

    pushData(data: string) {

        this.subject.next(data);
    }

    onData(): Observable<string> {

        return this.subject.asObservable();
    }

}

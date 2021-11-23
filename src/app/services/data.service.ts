import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Person } from '../classes/person';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    getContacts(): Observable<Array<Person>> {

        return this.http.get<Array<Person>>('http://localhost:3000/actors');
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

}

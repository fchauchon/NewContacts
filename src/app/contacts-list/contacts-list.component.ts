import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from '../classes/person';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {

    persons!: Array<Person>;
    subscription: Subscription;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.subscription = this.dataService.getContacts().subscribe(

            (data: Array<Person>) =>
                {
                    this.persons = data;
                }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    myDelete(id: number): void {
        this.dataService.deleteContact(id);
        const index = this.persons.findIndex( (element) => element.id === id);
        this.persons.splice(index, 1);
    }

    myAdd(person: Person): void {
        this.dataService.addContact(person);
        this.persons.push(person);
    }
}

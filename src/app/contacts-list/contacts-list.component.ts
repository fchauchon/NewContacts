import {  Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from '../classes/person';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnChanges, OnDestroy {

    persons!: Array<Person>;
    subscription: Subscription;

    constructor(private dataService: DataService) {

    }

    ngOnInit(): void {

        console.log(1);
        this.subscription = this.dataService.getContacts().subscribe(

            (data: Array<Person>) =>
                {
                    console.log(2);
                    this.persons = data;
                },
            (err) => console.log(3),
            () => console.log(4)

        );
        console.log(5, this.persons);
    }

    ngOnChanges(): void {

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

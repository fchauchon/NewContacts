import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Person } from '../classes/person';
import { CommunicationService } from '../services/communication.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit, OnDestroy {

    persons!: Array<Person>;
    subscription: Subscription;
    isHidden: boolean;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.subscription = this.dataService.getContacts().subscribe(
            (data: Array<Person>) =>
            {
                this.isHidden = true;
                this.persons = data;
            }
        );
    }
    
    personById(index, person: Person) {
        return person.id;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}

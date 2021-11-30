import { Component, OnDestroy, OnInit } from '@angular/core';
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
    hideMe: boolean = true;

    constructor(
        private dataService: DataService,
        private communicationService: CommunicationService
    ) { }

    ngOnInit(): void {
        this.communicationService.onRefresh().subscribe(
            () => {
                this.hideMe = false;
                this.subscription = this.dataService.getContacts().subscribe(
                    (data: Array<Person>) =>
                    {
                        this.persons = data;
                    },
                    (err) => {},
                    () => this.hideMe = true
                );
            }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}

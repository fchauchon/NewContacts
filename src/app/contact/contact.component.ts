import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Person } from '../classes/person';
import { CommunicationService } from '../services/communication.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() person!: Person;
    styles= {};

    constructor(
        private dataService: DataService,
        private communicationService: CommunicationService
    ) { }

    ngOnInit(): void {

     }

    ngOnChanges(): void {

    }
    ngAfterViewInit(): void {

    }
    ngOnDestroy(): void {

    }

    delete(): void {
        this.dataService.deleteContact(this.person.id).subscribe(
            (result: boolean) => { if (result) { this.communicationService.pushRefresh(true) } }
        );
    }

}

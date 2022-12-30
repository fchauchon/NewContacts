import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Person } from '../classes/person';
import { CommunicationService } from '../services/communication.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

    @Input() person!: Person;
    @Output() deleteRequest = new EventEmitter<number>();
    styles= {};

    constructor(
        private dataService: DataService,
        private communicationService: CommunicationService
    ) { }

    ngOnChanges(): void {
        console.log('ngOnChanges');
    }
    
    ngOnInit(): void {
        console.log('ngOnInit');
    }

    ngDoCheck(): void {
        console.log('ngDoCheck');
    }

    ngAfterContentInit(): void {
        console.log('ngAfterContentInit');
    }

    ngAfterContentChecked(): void {
        console.log('ngAfterContentChecked');
    }

    ngAfterViewInit(): void {
        console.log('ngAfterViewInit');
    }

    ngAfterViewChecked(): void {
        console.log('ngAfterViewChecked');
    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy');
    }

}

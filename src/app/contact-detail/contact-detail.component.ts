import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Person } from '../classes/person';
import { CommunicationService } from '../services/communication.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

    person: Person = null;
  
    constructor(
        private dataService: DataService,
        private commuicationService: CommunicationService,
        private router: Router,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.activatedRoute.paramMap.pipe(
            map( (data: ParamMap) => data.get('id') ),
            switchMap( (id: string) => this.dataService.getContact(id) )
        ).subscribe(
            (person: Person) => this.person = person
        )
    }

    delete(): void {
        this.dataService.deleteContact(this.person.id).subscribe(
            () => {
                this.commuicationService.pushConfirmation('Element effacé !');
                this.router.navigate(['']);
            }
        );
    }

}

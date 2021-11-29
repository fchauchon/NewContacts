import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../classes/person';
import { CommunicationService } from '../services/communication.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form.page.component.html',
  styleUrls: ['./form.page.component.css']
})
export class FormPageComponent implements OnInit {

    customerForm: FormGroup;

    constructor(
        private dataService: DataService,
        private communicationService: CommunicationService
    ) { }

    ngOnInit(): void {
        this.customerForm = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]),
            firstName: new FormControl('', [Validators.required, Validators.minLength(8)]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
        });
    }

    submitForm(): void {
        const person = new Person(
            this.customerForm.get('id').value,
            this.customerForm.get('firstName').value,
            this.customerForm.get('lastName').value,
            this.customerForm.get('email').value,
            "Femme"
        );
        this.dataService.addContact(person).subscribe(
            (result: boolean) => { if (result) { this.communicationService.pushRefresh(true) } }
        );
    }

}

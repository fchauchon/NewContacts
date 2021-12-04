import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { Person } from '../classes/person';
import { CommunicationService } from '../services/communication.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {

    customerForm: FormGroup;

    constructor(
        private dataService: DataService,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.customerForm = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]),
            firstName: new FormControl('', [Validators.required, Validators.minLength(8)]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
        });

        const firstNameFormControl = this.customerForm.get('firstName');
        const obs1 = firstNameFormControl.valueChanges;
        const lastNameFormControl = this.customerForm.get('lastName');
        const obs2 = lastNameFormControl.valueChanges;

        combineLatest([obs1, obs2]).subscribe(
            ([data1, data2]) => console.log(data1, data2)
        )
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
            () => this.router.navigate([''])
        );
    }

    ngOnDestroy() {

    }

}

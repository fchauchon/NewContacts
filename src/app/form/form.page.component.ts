import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Person } from '../classes/person';

@Component({
  selector: 'app-form-page',
  templateUrl: './form.page.component.html',
  styleUrls: ['./form.page.component.css']
})
export class FormPageComponent implements OnInit, OnDestroy {

    @Output() addRequest = new EventEmitter<Person>();
    customerForm: FormGroup;
    sub: Subscription;

    constructor() {
    }

    ngOnInit(): void {

        this.customerForm = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]),
            firstName: new FormControl('', [Validators.required, Validators.minLength(8)]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
        });

        const emailFormControl = this.customerForm.get('email');
        this.sub = emailFormControl.valueChanges.subscribe(
            (data) => console.log(data),
            (err) => console.log('erreur'),
            () => console.log('complete')
        );
    }

    submitForm(): void {

        const person = new Person(
            this.customerForm.get('id').value,
            this.customerForm.get('firstName').value,
            this.customerForm.get('lastName').value,
            this.customerForm.get('email').value
        );
        this.addRequest.emit(person);
    }

    ngOnDestroy() {

        this.sub.unsubscribe()
    }

}

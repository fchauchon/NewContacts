import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../classes/person';

@Component({
  selector: 'app-form-page',
  templateUrl: './form.page.component.html',
  styleUrls: ['./form.page.component.css']
})
export class FormPageComponent implements OnInit {

    @Output() addRequest = new EventEmitter<Person>();
    customerForm: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
        this.customerForm = new FormGroup({
            id: new FormControl('', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]),
            firstName: new FormControl('', [Validators.required, Validators.minLength(8)]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
        });
    }

    submitForm() {

        const person = new Person(
            this.customerForm.get('id').value,
            this.customerForm.get('firstName').value,
            this.customerForm.get('lastName').value,
            this.customerForm.get('email').value
        );
        this.addRequest.emit(person);
        
    }

}

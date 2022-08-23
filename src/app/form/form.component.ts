import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

    contactForm: UntypedFormGroup;

    constructor(
        private dataService: DataService,
        private communicationService: CommunicationService,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.contactForm = new UntypedFormGroup({
            id: new UntypedFormControl('', [Validators.required, Validators.pattern(/^(0|[1-9]\d*)?$/)]),
            firstName: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
            lastName: new UntypedFormControl('', [Validators.required]),
            email: new UntypedFormControl('', [Validators.required, Validators.email])
        });

        const firstNameFormControl = this.contactForm.get('firstName');
        const obs1 = firstNameFormControl.valueChanges;
        const lastNameFormControl = this.contactForm.get('lastName');
        const obs2 = lastNameFormControl.valueChanges;

        combineLatest([obs1, obs2]).subscribe(
            ([data1, data2]) => console.log(data1, data2)
        )
    }

    submitForm(): void {

        const person = new Person(
            this.contactForm.get('id').value,
            this.contactForm.get('firstName').value,
            this.contactForm.get('lastName').value,
            this.contactForm.get('email').value,
            "Femme"
        );
        this.dataService.addContact(person).subscribe(
            () => {
                this.communicationService.pushConfirmation('Element ajouté !');
                this.router.navigate(['']);
            }
        );
    }

    ngOnDestroy() {

    }

}

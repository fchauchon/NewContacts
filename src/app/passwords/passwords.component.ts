import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { combineLatest, merge, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit, OnDestroy {

    form!: UntypedFormGroup;
    password: UntypedFormControl = new UntypedFormControl('');
    reEnterPassword: UntypedFormControl = new UntypedFormControl('');

    value = 0;
    isHidden: boolean = true;
    subTimer: Subscription = null;

    constructor() { }

    ngOnInit(): void {
        this.form = new UntypedFormGroup({
            'password': this.password,
            'reEnterPassword': this.reEnterPassword,
        });

        this.password.valueChanges.subscribe(
            data => this.value = this.evaluate(data)
        );
        combineLatest([this.password.valueChanges, this.reEnterPassword.valueChanges]).subscribe(
            ([data1, data2]) => {
                if (data1 === data2 && this.value === 100) {

                    this.subTimer = timer(0, 1000).subscribe(
                        () => this.isHidden = ! this.isHidden
                    )
                } else {
                    this.isHidden = true;
                    if (this.subTimer != null) {
                        this.subTimer.unsubscribe();
                        this.subTimer = null;
                    }
                }
            }
        )
    }

    evaluate(data: string): number {

        let resultat = 0;
        if (data.length >= 8) {
            resultat += 40;
        }
        if (data.indexOf('!') >= 0) {
            resultat += 20;
        }
        if (data.match(/[0-9]/)) {
            resultat += 20;
        }
        if (data.indexOf('&') >= 0) {
            resultat += 20;
        }
        return resultat;
    }

    ngOnDestroy() {
        if (this.subTimer != null) {
            this.subTimer.unsubscribe();
            this.subTimer = null;
        }
    }
}

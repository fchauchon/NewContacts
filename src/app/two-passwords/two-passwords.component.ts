import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { combineLatest, merge } from 'rxjs';

@Component({
  selector: 'app-two-passwords',
  templateUrl: './two-passwords.component.html',
  styleUrls: ['./two-passwords.component.css']
})
export class TwoPasswordsComponent implements OnInit {

    form!: FormGroup;
    password: FormControl = new FormControl('');
    reEnterPassword: FormControl = new FormControl('');

    value = 0;
    bufferValue = 100;
    isHidden: boolean = true;

    constructor() { }

    ngOnInit(): void {
        this.form = new FormGroup({
            'password': this.password,
            'reEnterPassword': this.reEnterPassword,
        });

        this.password.valueChanges.subscribe(
            data => this.value = this.evaluate(data)
        );
        combineLatest([this.password.valueChanges, this.reEnterPassword.valueChanges]).subscribe(
            ([data1, data2]) => this.isHidden = ! (data1 === data2 && this.value === 100)
        )
    }

    evaluate(data: string): number {

        let resultat = 0;
        if (data.length > 8) {
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

}

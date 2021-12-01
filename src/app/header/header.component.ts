import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    myLogo!: string;

    constructor(
        private communicationService: CommunicationService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.myLogo = 'assets/logo.svg';
        this.communicationService.onError().subscribe(
            error => this.snackBar.open(error, 'Compris', { duration: 10000, panelClass: ['red-snackbar', 'green-snackbar'] })
        );
    }

}

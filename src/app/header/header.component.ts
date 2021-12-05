import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '../classes/message';
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
        this.communicationService.onNotification().subscribe(
            (notification: Message) => {
                this.snackBar.open(
                    notification.message, 'Compris',
                    { duration: notification.type === 'ERROR' ? 10000 : 2000, panelClass: ['red-snackbar', 'green-snackbar'],
                    verticalPosition: notification.type === 'ERROR' ? 'bottom' : 'top' }
                );
            }
        );
    }

}

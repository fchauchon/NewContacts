import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { iif, interval, of, timer } from 'rxjs';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact.page.component.html',
  styleUrls: ['./contact.page.component.css']
})
export class ContactPageComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  open() {
    const dialogRef = this.dialog.open(AboutComponent);
  }
}

import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { cpuUsage } from 'process';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

    @Input() bgColor;
    // @ViewChildren('fred') div : QueryList<ElementRef>
    constructor(@Inject(DOCUMENT) private document: Document) { }

    ngOnInit(): void {

        // const t = this.document.getElementById('t').firstChild;
        // console.log(t);
        // t.setStyle('background', this.bgColor);
    }

    // ngAfterViewInit() {
    //     console.log(this.div);
    //     this.div.get(0).nativeElement.setAttribute('style', 'background: ' + this.bgColor);
    // }

}


import { Component, OnInit } from '@angular/core';
import notesBrutes from '../../assets/notes.json';
import { Eleve } from '../classes/eleve';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Array<any>;

  constructor() { }

  ngOnInit(): void {

    this.notes = new Array();
    //console.log(Notes);
    //0 : Nom
    //1 : Prenom
    //7 : Total de toutes les questions
    let sum: number;
    let avant: number;
    let excludeQuestions = [];
    excludeQuestions = excludeQuestions.map( current => current + 7);
    const noteMax = 51 - excludeQuestions.length;

    const decalees = notesBrutes[0];
    const coefAvant = 51 / 20;
    const coefApp = noteMax / 20;
    for(let e=0; e<=73; e++) {
      sum = 0;
      for(let i=8; i<=58; i++) {
        if (! excludeQuestions.includes(i)) {
            if (decalees[e][i] != '-') {
                sum += parseInt(decalees[e][i]);
            }
        }
      }
      avant = parseInt(decalees[e][7]);
      this.notes.push(new Eleve(decalees[e][0], decalees[e][1], avant / coefAvant, 0));
      this.notes = this.notes.sort( (a: Eleve, b: Eleve) => a.nom < b.nom ? -1 : 1);
    }
  }

  down() {
    const replacer = (key, value) => value === null ? '' : value;
    const header = ['nom', 'prenom', 'noteAvant', 'noteApres', 'diff'];
    let csv = this.notes.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "myFile.csv");
  }

}

export class Eleve {

  nom: string
  prenom: string;
  noteAvant: number;
  noteApres: number;
  diff: number

  constructor(nom: string, prenom: string, noteAvant: number, noteApres: number) {

    this.nom = nom;
    this.prenom = prenom;
    this.noteAvant = parseFloat(noteAvant.toFixed(2));
    this.noteApres = parseFloat(noteApres.toFixed(2));
    this.diff = parseFloat((this.noteAvant - this.noteApres).toFixed(2));
   }

}

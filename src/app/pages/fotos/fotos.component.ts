import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


interface Fotos {
  nombre: string;
  url: string;
}

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styleUrls: ['./fotos.component.css']
})

export class FotosComponent implements OnInit {

  public fotos: Observable<Fotos[]>;

  constructor( private firestore: AngularFirestore ) { }

  ngOnInit(): void {
    this.fotos = this.firestore.collection<Fotos>('img').valueChanges();

  }

}

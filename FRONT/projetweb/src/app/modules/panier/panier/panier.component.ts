import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../../../models/produits';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier : Observable<Produit>;

  constructor(private store : Store) {
    this.panier = this.store.select(state => state.panier.panier);
   }

  ngOnInit() {
  }

}
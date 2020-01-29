import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api.service';
import { Produit } from '../../../../models/produits';
import { AddProduit } from '../../../actions/produit.action';
import { Store } from '@ngxs/store';


@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent implements OnInit {

  produits : Observable<Produit[]>

  constructor(private apiService : ApiService, private store : Store) { }

  ngOnInit() {
    this.produits = this.apiService.getProduits ();
  }
  addpanier(p: Produit){
    this.addArticle(p);
  }
  addArticle(p: Produit){
    this.store.dispatch(new AddProduit(p));
  }
}
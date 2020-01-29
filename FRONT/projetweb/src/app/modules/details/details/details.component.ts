import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { ApiService } from '../../../api.service';
import { Produit } from '../../../../models/produits';
import { AddProduit } from '../../../actions/produit.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  produit: Observable<Produit[]>;

  constructor(private apiService : ApiService, private route: ActivatedRoute, private store : Store) { }

  ngOnInit() {
    this.produit = this.apiService.getProduit (this.route.snapshot.params.id);
  }

  addpanier(p: Produit){
    this.addArticle(p);
  }
  addArticle(p: Produit){
    this.store.dispatch(new AddProduit(p));
  }
}

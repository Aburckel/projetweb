import { Component, OnInit, EventEmitter  } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../models/produits'
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-tetiere',
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.css']
})
export class TetiereComponent implements OnInit {
  qty : number ; 

  constructor(public store : Store){
    this.store.select(state => state.panier.panier).subscribe(u => this.qty = u.length);
  }

  ngOnInit() {
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';
import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule } from '@angular/router';
import { MatGridListModule, MatButtonModule, MatCardModule } from '@angular/material';


const routes : Routes = [
  {
    path:'',
    component: ListeProduitComponent,
  },
  {
    path:"details/:id",
    loadChildren: () => import('../details/details.module').then(m => m.DetailsModule) 
  }, 

];

@NgModule({
  declarations: [ListeProduitComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  exports:[RouterModule]
})
export class CatalogueModule { }

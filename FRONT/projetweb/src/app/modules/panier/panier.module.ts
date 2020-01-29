import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierComponent } from './panier/panier.component';
import { Routes, RouterModule } from '@angular/router';
import {MatDividerModule, MatListModule} from '@angular/material';

const routes : Routes = [
  {
    path:'',
    component: PanierComponent
  }
];


@NgModule({
  declarations: [PanierComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDividerModule,
    MatListModule
  ],
    exports:[RouterModule]
})
export class PanierModule { }

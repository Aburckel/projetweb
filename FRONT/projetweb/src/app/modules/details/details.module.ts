import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { Routes, RouterModule } from '@angular/router';

const routes : Routes = [
  {
    path:'',
    component: DetailsComponent
  }
];

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class DetailsModule { }

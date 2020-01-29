import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormClientComponent } from './form-client/form-client.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: FormClientComponent,
    children : [
      { path: 'visualisation', component: VisualisationComponent, }
    ]
  }
];

@NgModule({
  declarations: [FormClientComponent, VisualisationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatRadioModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class CompteClientModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatBadgeModule, MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { Routes, RouterModule  } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { PanierState } from './states/panier.state'

import { ApiService } from './api.service';


const routes: Routes = [
  {
    path:'',
    component: AccueilComponent
  },
  {
    path: 'compteclient',
    loadChildren: () => import('./modules/compte-client/compte-client.module').then(m => m.CompteClientModule)
  },
  {
    path: 'catalogue',
    loadChildren: () => import('./modules/catalogue/catalogue.module').then(m => m.CatalogueModule)
  },
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'panier', 
    loadChildren: () => import('./modules/panier/panier.module').then(m => m.PanierModule)
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    FooterComponent,
    TetiereComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([
      PanierState
    ]),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatBadgeModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
  exports: [RouterModule]

})
export class AppModule { }

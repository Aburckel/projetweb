import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { User } from '../../../../models/user';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {

  
  user:User = new User();
  signupForm;

  constructor(
    private formBuilder: FormBuilder,
    private api:ApiService
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({  
      Prenom:[this.user.prenom, Validators.pattern('[A-Za-z\-]{2,24}')],
      Nom:[this.user.nom, Validators.pattern('[A-Za-z\-]{2,24}')],
      Adresse:[this.user.adresse, Validators.pattern('[0-9]*[A-Za-z ]+')],
      CP:[this.user.codepostal, Validators.pattern("[0-9]{5}")],
      Ville:[this.user.ville, Validators.pattern('[a-zA-Z ]+')],
      Pays:[this.user.pays, Validators.required],
      Telephone:[this.user.telephone, Validators.pattern('0[0-9]{9}')],
      Email: [this.user.email, [Validators.required, Validators.email]],
      Mdp:[this.user.mdp, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$')]],
    });
  }

  onSubmit(customerData) {
    // if invalid, stop
    if (this.signupForm.controls.Prenom.invalid || this.signupForm.controls.Nom.invalid) {
      alert("Le prénom et le nom doivent contenir uniquement des lettres ou un '-'.");
      return;
    }
    if (this.signupForm.controls.Adresse.invalid) {
      alert("L'adresse est invalide.");
      return;
    }
    if (this.signupForm.controls.CP.invalid) {
      alert("Le code postal est invalide.");
      return;
    }
    if (this.signupForm.controls.Telephone.invalid) {
      alert("Le numéro de telephone est invalide.");
      return;
    }
    if (this.signupForm.controls.Ville.invalid) {
      alert("La ville est invalide.");
      return;
    }
    if (this.signupForm.controls.Email.invalid) {
      alert("Le format du mail est invalide.");
      return;
    }
    if (this.signupForm.controls.Mdp.invalid) {
      alert("le mot de passe doit comporter 8 caractères dont une majsucule, une minuscule, un chiffre et un caractère spécial.");
      return;
    }

    this.user.prenom = customerData.Prenom;
    this.user.nom = customerData.Nom;
    this.user.adresse = customerData.Adresse;
    this.user.codepostal = customerData.CP;
    this.user.ville = customerData.Ville;
    this.user.pays = customerData.Pays;
    this.user.telephone = customerData.Telephone;
    this.user.email = customerData.Email;
    this.user.mdp = customerData.Mdp;
    this.realOnSubmit();
  }
  
  realOnSubmit() {
    console.log("hello");
      this.api.postRegister(this.user).subscribe(
		(data: any) => {this.onApiResponse(data)},
		err => console.error('Observer got an error: ' + err)
	);
  }

  onApiResponse(response:any) {
    console.log(response);
    alert("Inscription réussi");
  }

}

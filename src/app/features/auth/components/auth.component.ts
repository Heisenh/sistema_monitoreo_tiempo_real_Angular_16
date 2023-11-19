import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from './../../../core/services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  formLogin!: FormGroup;
  showAlert: any = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _storageService: StorageService,
    private _router: Router) {

    this.createValidationsForm();

  }

  ngOnInit() {

  }


  login() {

    if (!this.formLogin.valid) return;

    this._authService.login(this.formLogin.value).subscribe({
      next: (value: any) => {

        (!value) && this.showAlert;
        
        this._storageService.setUser(value);
        this._router.navigate(['/dashboard']);

      },
      error: (err: any) => {
        this.showAlert = true;
        console.log('this.showAlert :>> ', this.showAlert);
        console.log('err :> ', err);
      },
    })

  }


  createValidationsForm() {

    this.formLogin = this._formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  }

}

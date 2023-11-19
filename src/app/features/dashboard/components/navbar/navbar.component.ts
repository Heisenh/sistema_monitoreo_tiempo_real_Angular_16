import { Component, OnInit } from '@angular/core';
import { StorageService } from './../../../../core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  nameUser!: string;

  constructor(
    private _storageService: StorageService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getNameUser();
  }


  getNameUser() {
    const { user } = this._storageService.getUserData();
    this.nameUser = user;
  }


  logOut() {
    this._storageService.removeUser();
    this._router.navigate(['/login']);
  }


}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private userData;

  constructor() {
    this.localStorageService = localStorage;
    this.userData = this.getUserData();
  }


  setUser(user: any) {
    this.userData = user;
    this.localStorageService.setItem('user', JSON.stringify(this.userData));
  }


  getUserData() {
    const user: string | null = this.localStorageService.getItem('user');
    if (user !== null) {
      return JSON.parse(user);
    }
  }


  removeUser() {
    this.localStorageService.removeItem('user');
  }


}

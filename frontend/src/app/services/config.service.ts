import { Injectable } from '@angular/core';

export interface IMenuItem {
  url: string;
  text: string;
  disabled?: boolean;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = "http://localhost:3000/";

  menuItems: IMenuItem[] = [
    {url: '/', text: 'Főoldal', icon: 'home'},
    {url: '/services', text: 'Szolgáltatások', icon: 'build'},
    {url: '/users', text: 'Felhasználók', icon: 'people'},
  ];

  constructor() { }
}

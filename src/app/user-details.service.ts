import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "./user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  private baseURL:string = 'https://random-data-api.com';

  constructor(private http: HttpClient) { }

  getRandomUsers(): Observable<User> {
    const URL = `${this.baseURL}/api/users/random_user?size=100`;
    return this.http.get<User>(URL);
  }
}

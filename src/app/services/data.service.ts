import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RandomUsers, RandomUser } from '../models/user.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }
  getRandomUsers(numberOfUsers: number): Observable<RandomUsers> {
    return this.http.get<RandomUsers>(`https://randomuser.me/api/?results=${numberOfUsers}`);
  }

}
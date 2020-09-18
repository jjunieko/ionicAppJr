import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
}

import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contacto } from 'src/app/models/contacto.model';

@Injectable()

export class Service {

  constructor(
    private http: HttpClient
  ) { }

  url = "https://localhost:44334/api/";

  putContacto(contacto, dataTable) {

    var params = {
      contacto: contacto,
      contactoArray: dataTable
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.put<Contacto[]>(this.url + "contacto/putContacto/", params, httpOptions);
  }

  deleteContacto(contacto, dataTable) {
    var params = {
      contacto: contacto,
      contactoArray: dataTable
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.put<Contacto[]>(this.url + "contacto/deleteContacto", params, httpOptions);
  }

  getAllContactos() {
    return this.http.get(this.url + "")
  }
}

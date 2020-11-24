import { Component, ViewChild, EventEmitter, Output} from '@angular/core';
import { ListaContactosComponent} from '../app/lista-contactos/lista-contactos.component';
import { CrearContactoComponent} from '../app/crear-contacto/crear-contacto.component';
import { Service } from 'src/services/services';
import { Contacto } from './models/contacto.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ABM';
  @ViewChild(ListaContactosComponent, { static: false }) ListaContactos: ListaContactosComponent;
  @ViewChild(CrearContactoComponent, { static: false }) CrearContacto: CrearContactoComponent;

  ngOnInit(){
  }
  constructor(private service: Service){
    this.arrayDeContactos = this.fromJSON();
  }
  arrayDeContactos: Contacto[];

  agregarATabla(){
    var contacto = {
      idContacto: this.CrearContacto.idContacto,
      nombre: this.CrearContacto.nombre,
      apellido: this.CrearContacto.apellido,
      direccion: this.CrearContacto.direccion
    }
    this.service.putContacto(contacto, this.arrayDeContactos).subscribe( n => {
      this.toJSON(n);
      this.arrayDeContactos = this.fromJSON();
      this.ListaContactos.contactos = this.arrayDeContactos;
      this.ListaContactos.cargarTabla();
      this.CrearContacto.limpiarCampos();
    });

  }

  eliminarDeTabla(event){
    var contacto = {
      idContacto: event[0],
      nombre: event[1],
      apellido: event[2],
      direccion: event[3],
    }
    this.service.deleteContacto(contacto, this.arrayDeContactos).subscribe(n => {
      this.toJSON(n);
      this.arrayDeContactos = this.fromJSON();
      this.ListaContactos.contactos = this.arrayDeContactos;
      this.ListaContactos.cargarTabla();
    });
  }

  mostrarFormModificar(event){
    this.CrearContacto.cargarFormModificar(event);
  }

  modificarEnTabla(){
    var contacto = {
      idContacto: this.CrearContacto.idContacto,
      nombre: this.CrearContacto.nombre,
      apellido: this.CrearContacto.apellido,
      direccion: this.CrearContacto.direccion
    }
    this.service.putContacto(contacto, this.arrayDeContactos).subscribe( n => {
      this.toJSON(n);
      this.arrayDeContactos = this.fromJSON();
      this.ListaContactos.contactos = this.arrayDeContactos;
      this.ListaContactos.cargarTabla();
      this.CrearContacto.cerrarFormAgregar();

    })
  }

  toJSON(n){
    localStorage.setItem("DataSetContactos", JSON.stringify(n));
    this.arrayDeContactos = this.fromJSON();
  }

  fromJSON(){
    var res:Contacto[] = [];
    if(localStorage.getItem("DataSetContactos") == null){
            return res;
    }else{
      var obj = JSON.parse(localStorage.getItem("DataSetContactos"));
      for(var i in obj){
          res.push({
            idContacto: obj[i].idContacto,
            nombre: obj[i].nombre,
            apellido: obj[i].apellido,
            direccion: obj[i].direccion});
      }
      console.log(res);
      return res;
    }
  }

  cargarFormModificar(event){
    this.CrearContacto.cargarFormModificar(event);
  }

  mostrarFormAgregar(){
    this.CrearContacto.mostrarFormAgregar();
  }
}

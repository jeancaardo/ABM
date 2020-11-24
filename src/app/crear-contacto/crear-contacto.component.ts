import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Service } from '../../services/services'
import { ListaContactosComponent } from '../lista-contactos/lista-contactos.component';
import { Contacto } from '../models/contacto.model';

@Component({
  selector: 'app-crear-contacto',
  templateUrl: './crear-contacto.component.html',
  styleUrls: ['./crear-contacto.component.css']
})
export class CrearContactoComponent implements OnInit {
  @ViewChild(ListaContactosComponent, { static: false }) ListaContactos: ListaContactosComponent;
  constructor(private service: Service) {
   }
  contactoForm = new FormGroup ({
    idContacto: new FormControl([]),
    nombre: new FormControl([]),
    apellido: new FormControl([]),
    direccion: new FormControl([]),
  })
  idContacto = 0;
  nombre ='';
  apellido ='';
  direccion ='';
  titulo = '';

  contacto: Contacto;
  arrayDeContactos: Contacto[];
  mostrarForm = false;

  ngOnInit(): void {
  }

  emitAgregar(){
    this.agregar.emit();
  }

  mostrarFormAgregar(){
    this.titulo = "Agregar";
    this.mostrarForm = true;

  }

  cerrarFormAgregar(){
    this.mostrarForm = false;
    this.idContacto = 0;
    this.nombre = null;
    this.apellido = null;
    this.direccion = null;
  }

  cargarFormModificar(event){
    this.titulo = "Modificar"
      this.idContacto = event[0];
      this.nombre = event[1];
      this.apellido = event[2];
      this.direccion = event[3];
    this.mostrarForm = true;
  }

  limpiarCampos(){
    this.idContacto = 0;
    this.nombre = '';
    this.apellido= '';
    this.direccion='';
  }

  @Output() agregar = new EventEmitter();
}

import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Input } from '@angular/core';
import { Contacto } from '../models/contacto.model'
import { Service } from '../../services/services'
@Component({
  selector: 'app-lista-contactos',
  templateUrl: './lista-contactos.component.html',
  styleUrls: ['./lista-contactos.component.css']
})
export class ListaContactosComponent implements OnInit {
  @Input() contactos: Contacto[];

  constructor(private service: Service) { }

  displayedColumns: string[] = ['nombre', 'apellido', 'direccion','modificar','eliminar'];
  dataSource: string[][] = [];
  dataSourceContactos = new MatTableDataSource<string[]>(this.dataSource);
  ngOnInit(): void {
    this.cargarTabla()
  }

  cargarTabla(){
    this.dataSource = [];
    this.contactos.forEach(n => {
      this.dataSource.push(Object.values(n))
    });
    var dataSourceAux = new MatTableDataSource<string[]>(this.dataSource);
    this.dataSourceContactos = dataSourceAux;
  }

  modificarContacto(element){
    this.modificar.emit(element);
  }

  eliminarContacto(element){
    this.eliminar.emit(element)
  }

  @Output() modificar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();
}

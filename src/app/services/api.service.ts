import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { Form } from '../models/form';
import { Orden } from '../models/orden';
import { Nota } from '../models/nota';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  lastOrden: number = 0;
  formsList: AngularFireList<any>;
  formObject: AngularFireObject<any>;
  lastOrdenRef: Observable<any[]>;
  lastNotaRef: Observable<any[]>;
  lastProductoRef: Observable<any[]>;
  /* public callList: AngularFireList<any>; */
  public ordenList: AngularFireList<any>;
  public notaList: AngularFireList<any>;
  public productoList: AngularFireList<any>;
  public ordenObject: AngularFireObject<any>;
  public notaObject: AngularFireObject<any>;
  public productoObject: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) { }

  AddForm(form: object) {
    this.formsList.push(form as Form);
  }

  AddOrden(orden: object) {
    this.ordenList.push(orden as Orden);
  }

  AddNota(nota: object) {
    this.notaList.push(nota as Nota);
  }

  AddProducto(producto: object) {
    this.productoList.push(producto as Producto);
  }

  GetFormsList() {
    this.formsList = this.db.list('rivera/client-list');
    return this.formsList;
  }

  GetOrdenesList() {
    this.ordenList = this.db.list('rivera/orden-list');
    return this.ordenList;
  }

  GetNotasList() {
    this.notaList = this.db.list('rivera/nota-list');
    return this.notaList;
  }

  GetProductosList() {
    this.productoList = this.db.list('rivera/producto-list');
    return this.productoList;
  }

  GetForm(key: string) {
    this.formObject = this.db.object('rivera/client-list/' + key);
    return this.formObject;
  }

  GetOrden(key: string) {
    this.ordenObject = this.db.object('rivera/orden-list/' + key);
    return this.ordenObject;
  }

  GetNota(key: string) {
    this.notaObject = this.db.object('rivera/nota-list/' + key);
    return this.notaObject;
  }

  GetProducto(key: string) {
    this.productoObject = this.db.object('rivera/producto-list/' + key);
    return this.productoObject;
  }

  UpdateForm(form: Form, key: string) {
    this.db.object('rivera/client-list/' + key)
    .update(form);
  }

  UpdateOrden(orden: Orden, key: string) {
    this.db.object('rivera/orden-list/' + key)
    .update(orden);
  }

  UpdateNota(nota: Nota, key: string) {
    this.db.object('rivera/nota-list/' + key)
    .update(nota);
  }

  UpdateProducto(producto: Producto, key: string) {
    this.db.object('rivera/producto-list/' + key)
    .update(producto);
  }

  DeleteForm(key: string) {
    this.formObject = this.db.object('rivera/client-list/' + key);
    this.formObject.remove();
  }

  DeleteOrden(key: string) {
    this.ordenObject = this.db.object('rivera/orden-list/' + key);
    this.ordenObject.remove();
  }

  DeleteNota(key: string) {
    this.notaObject = this.db.object('rivera/nota-list/' + key);
    this.notaObject.remove();
  }

  DeleteProducto(key: string) {
    this.productoObject = this.db.object('rivera/producto-list/' + key);
    this.productoObject.remove();
  }

  getLastOrden(){
    this.lastOrdenRef = this.db.list('rivera/orden-list/', ref => ref.limitToLast(1)).valueChanges();
    return this.lastOrdenRef;
  }

  getLastNota(){
    this.lastNotaRef = this.db.list('rivera/nota-list/', ref => ref.limitToLast(1)).valueChanges();
    return this.lastNotaRef;
  }

  getLastProducto(){
    this.lastProductoRef = this.db.list('rivera/producto-list/', ref => ref.limitToLast(1)).valueChanges();
    return this.lastProductoRef;
  }
}

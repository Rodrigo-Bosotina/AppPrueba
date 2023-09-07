import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import Productos from '../models/productos.model';
import Frutas from '../models/fruta.model';
import Bebidas from '../models/bebidas.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  private productosPath = '/productos';
  private bebidasPath = '/bebidas'
  private frutasPath = '/frutas'

  productoRef: AngularFirestoreCollection<Productos>;
  bebidaRef: AngularFirestoreCollection<Bebidas>;
  frutaRef: AngularFirestoreCollection<Frutas>;

  constructor(private db: AngularFirestore) {
    this.productoRef = db.collection(this.productosPath);
    this.bebidaRef =db.collection(this.bebidasPath);
    this.frutaRef = db.collection(this.frutasPath)
  }

  getAll(): AngularFirestoreCollection<Productos> {
    return this.productoRef;
  }

  getAllBebida(): AngularFirestoreCollection<Bebidas>{
    return this.bebidaRef
  }

  getAllFrutas(): AngularFirestoreCollection<Frutas>{
    return this.frutaRef
  }

  create(producto: Productos, bebida: Bebidas, fruta:Frutas, opcion:String): any {
    if(opcion == 'opcion1'){
      return this.productoRef.add({ ...producto });
    }
    else if (opcion == 'opcion2')
    {
      return this.bebidaRef.add({ ...bebida });
    }
    else if (opcion == 'opcion3')
    {
      return this.frutaRef.add({ ...fruta});
    }


  }

  update(id: string, data: any, opcion: number): Promise<void> {
    if(opcion==1){
      return this.productoRef.doc(id).update(data);
    }
    else if (opcion==2)
    {
      return this.bebidaRef.doc(id).update(data);
    }
    else if( opcion==3){
      return this.frutaRef.doc(id).update(data);
    }
    return Promise.resolve();
  }

  delete(id: string, opcion: number): Promise<void> {
    if (opcion == 1){
      return this.productoRef.doc(id).delete();
    }
    else if (opcion==2)
    {
      return this.bebidaRef.doc(id).delete();
    }
    else if( opcion==3){
      return this.frutaRef.doc(id).delete();
    }
    return Promise.resolve();
  }
}

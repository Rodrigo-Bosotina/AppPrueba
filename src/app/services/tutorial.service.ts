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
  frutasRef: AngularFirestoreCollection<Frutas>;

  constructor(private db: AngularFirestore) {
    this.productoRef = db.collection(this.productosPath);
    this.bebidaRef =db.collection(this.bebidasPath);
    this.frutasRef = db.collection(this.frutasPath)
  }

  getAll(): AngularFirestoreCollection<Productos> {
    return this.productoRef;
  }

  getAllBebida(): AngularFirestoreCollection<Bebidas>{
    return this.bebidaRef
  }

  getAllFrutas(): AngularFirestoreCollection<Frutas>{
    return this.frutasRef
  }

  create(producto: Productos, bebida: Bebidas, fruta:Frutas, opcion:String): any {
    if(opcion == 'Producto'){
      return this.productoRef.add({ ...producto });
    }
    else if (opcion == 'Bebida')
    {
      return this.bebidaRef.add({ ...bebida });
    }
    else if (opcion == 'Bebida')
    {
      return this.bebidaRef.add({ ...bebida });
    }


  }

  update(id: string, data: any): Promise<void> {
    return this.productoRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.productoRef.doc(id).delete();
  }
}

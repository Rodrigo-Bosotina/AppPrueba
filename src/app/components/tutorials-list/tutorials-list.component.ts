import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { map } from 'rxjs/operators';
import Productos from 'src/app/models/productos.model';
import Bebidas from 'src/app/models/bebidas.model';
import Frutas from 'src/app/models/fruta.model'

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  productos?: Productos[];
  productoActual?: Productos;

  bebidas?: Bebidas[];
  bebidaActual?: Bebidas;

  frutas?: Frutas[];
  frutaActual?: Frutas;


  IndexActual = -1;
  bebidaIndex = -1;
  frutaIndex= -1;
  nombre = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  refreshList(): void {
    this.productoActual = undefined;
    this.bebidaActual= undefined;
    this.frutaActual= undefined;
    this.IndexActual = -1;
    this.bebidaIndex = -1;
    this.frutaIndex= -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.productos = data;
    });

    this.tutorialService.getAllBebida().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.bebidas = data;
    });


    this.tutorialService.getAllFrutas().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.frutas = data;
    });

  }

  setActiveTutorial(producto: Productos| null ,bebida:Bebidas | null,fruta: Frutas|null, index: number, opcion: number): void {
    if (opcion == 1 && producto){
      this.productoActual = producto;
      this.IndexActual = index;
      this.bebidaIndex = -1;
      this.frutaIndex = -1;
    }
    else if (opcion == 2 && bebida){
      this.bebidaActual = bebida;
      this.bebidaIndex = index;
      this.IndexActual = -1;
      this.frutaIndex=-1;
    }
    else if (opcion == 3 && fruta){
      this.frutaActual = fruta;
      this.frutaIndex = index;
      this.IndexActual = -1;
      this.bebidaIndex=-1;
    }
    
  }

}

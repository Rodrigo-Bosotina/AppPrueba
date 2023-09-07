import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Productos from 'src/app/models/productos.model';
import Bebidas from 'src/app/models/bebidas.model';
import Frutas from 'src/app/models/fruta.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit, OnChanges {

  @Input() producto?: Productos;
  @Input() bebida?: Bebidas;
  @Input() fruta?: Frutas;
  @Input() opcion: number |undefined;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  productoActual: Productos = {
    nombre: '',
    descripcion: '',
    publicado: false
  };

  bebidaActual: Bebidas = {
    marca: '',
    gaseosa: false,
    publicado: false
  };

  frutaActual: Frutas = {
    nombre: '',
    tipo: '',
    publicado: false
  };


  message = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.productoActual = { ...this.producto };
    this.bebidaActual = {...this.bebida};
    this.frutaActual = {...this.fruta}
  }

  updatePublished(status: boolean, opcion: number): void {

  if(opcion == 1){
    if (this.productoActual.id) {
      this.tutorialService.update(this.productoActual.id, { publicado: status },opcion)
      .then(() => {
        this.productoActual.publicado = status;
        this.message = 'El estado cambio exitosamente!';
      })
      .catch(err => console.log(err));
    }
  }
else if(opcion== 2){
  if (this.bebidaActual.id) {
    this.tutorialService.update(this.bebidaActual.id, { publicado: status },opcion)
    .then(() => {
      this.bebidaActual.publicado = status;
      this.message = 'El estado cambio exitosamente!';
    })
    .catch(err => console.log(err));
  }
}
else if (opcion ==3){
  if (this.frutaActual.id) {
    this.tutorialService.update(this.frutaActual.id, { publicado: status }, opcion)
    .then(() => {
      this.frutaActual.publicado = status;
      this.message = 'El estado cambio exitosamente!';
    })
    .catch(err => console.log(err));
  }
}

  }

  updateTutorial(opcion: number): void {
    if(opcion == 1){
      const data = {
        nombre: this.productoActual.nombre,
        descripcion: this.productoActual.descripcion
      };

      if (this.productoActual.id) {
        this.tutorialService.update(this.productoActual.id, data,opcion)
          .then(() => this.message = 'El Producto fue actualizado correctamente!')
          .catch(err => console.log(err));
      }
    }
    else if(opcion == 2 ){
      const data = {
        marca: this.bebidaActual.marca,
        gaseosa: this.bebidaActual.gaseosa
      };

      if (this.bebidaActual.id) {
        this.tutorialService.update(this.bebidaActual.id, data,opcion)
          .then(() => this.message = 'La Bebida fue actualizada correctamente!')
          .catch(err => console.log(err));
      }
    }
    else if(opcion == 3){
      const data = {
        nombre: this.frutaActual.nombre,
        tipo: this.frutaActual.tipo
      };

      if (this.frutaActual.id) {
        this.tutorialService.update(this.frutaActual.id, data,opcion)
          .then(() => this.message = 'La Fruta fue actualizada correctamente!')
          .catch(err => console.log(err));
      }
    }
    }




  deleteTutorial(opcion : number): void {
if (opcion == 1){
  if (this.productoActual.id) {
    this.tutorialService.delete(this.productoActual.id,opcion)
      .then(() => {
        this.refreshList.emit();
        this.message = 'El Producto fue actualizado correctamente!';
      })
      .catch(err => console.log(err));
  }
}
else if(opcion == 2){
  if (this.bebidaActual.id) {
    this.tutorialService.delete(this.bebidaActual.id, opcion)
      .then(() => {
        this.refreshList.emit();
        this.message = 'La Bebida fue actualizada correctamente!';
      })
      .catch(err => console.log(err));
  }
}
else if (opcion == 3){
  if (this.frutaActual.id) {
    this.tutorialService.delete(this.frutaActual.id,opcion)
      .then(() => {
        this.refreshList.emit();
        this.message = 'La Fruta fue actualizada correctamente!';
      })
      .catch(err => console.log(err));
  }
}
}


}

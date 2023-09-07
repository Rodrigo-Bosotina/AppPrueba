import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import Productos from 'src/app/models/productos.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit, OnChanges {

  @Input() producto?: Productos;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  productoActual: Productos = {
    nombre: '',
    descripcion: '',
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
  }

  updatePublished(status: boolean): void {
    if (this.productoActual.id) {
      this.tutorialService.update(this.productoActual.id, { publicado: status })
      .then(() => {
        this.productoActual.publicado = status;
        this.message = 'El estado cambio exitosamente!';
      })
      .catch(err => console.log(err));
    }
  }

  updateTutorial(): void {
    const data = {
      nombre: this.productoActual.nombre,
      descripcion: this.productoActual.descripcion
    };

    if (this.productoActual.id) {
      this.tutorialService.update(this.productoActual.id, data)
        .then(() => this.message = 'El Producto fue actualizado correctamente!')
        .catch(err => console.log(err));
    }
  }

  deleteTutorial(): void {
    if (this.productoActual.id) {
      this.tutorialService.delete(this.productoActual.id)
        .then(() => {
          this.refreshList.emit();
          this.message = 'El Producto fue actualizado correctamente!';
        })
        .catch(err => console.log(err));
    }
  }

}

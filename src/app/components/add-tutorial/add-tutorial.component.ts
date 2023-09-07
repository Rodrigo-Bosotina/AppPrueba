import { Component, OnInit } from '@angular/core';
import Productos from 'src/app/models/productos.model';
import Bebidas from 'src/app/models/bebidas.model';
import Frutas from 'src/app/models/fruta.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  opcionSeleccionada: string = '';
  producto: Productos = new Productos();
  bebida: Bebidas = new Bebidas();
  fruta: Frutas = new Frutas();
  submitted = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    this.tutorialService.create(this.producto,this.bebida,this.fruta,this.opcionSeleccionada).then(() => {
      console.log('Nuevo Producto Creado');
      this.submitted = true;
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.producto = new Productos();
  }


  newBebida():void{
    this.submitted = false;
    this.bebida = new Bebidas();
  }


  newFruta():void{
    this.submitted = false;
    this.fruta = new Frutas();
  }
}

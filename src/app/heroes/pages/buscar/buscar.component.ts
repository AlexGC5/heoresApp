import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino: string="";
  heroes:Heroe[]=[];

  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias( this.termino.trim() )
    .subscribe( heroe => this.heroes = heroe);

  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent){

    //TODO: validar si es un string vacio
    if(!event.option.value){
      console.log('No hay valor');
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe:Heroe = event.option.value;
    console.log(heroe);
    this.termino = heroe.superhero;
    this.heroesService.getHeroePorId( heroe.id! )
    .subscribe( heroe => this.heroeSeleccionado = heroe);
  }

}

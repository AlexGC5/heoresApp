import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  constructor(private heroeService: HeroesService, private activatedRoute: ActivatedRoute,
    private router: Router, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.heroeService.getHeroePorId(id))
        )
        .subscribe(heroe => this.heroe = heroe);
    } else {
      return;
    }

  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    console.log(this.heroe.id);
    if (this.heroe.id) {
      //Actualizar
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnakbar('Registro Actualizado') /*console.log('Actualizando ', heroe)*/);
    } else {
      //Crear
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this.router.navigate(['/heroe/editar/', heroe.id]);
          this.mostrarSnakbar('Registro creado');
          //console.log('Respuesta', heroe);
        })
    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });
    dialog.afterClosed().subscribe(
      (result) => {
        //console.log(result);
        if (result) {
          this.heroeService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroe']);
            })//console.log("Heroe ", id, " Borrado!!"));
        }
      }
    )

  }

  mostrarSnakbar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    })
  }

}

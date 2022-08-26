import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }


  ngOnInit(): void {
    
  }

  get auth(){
    return this.authService.auth;
  }


  logout(){
    //Ir al BE
    //Verificar que el usuario exista
    this.router.navigate(['./auth']);
  }

}

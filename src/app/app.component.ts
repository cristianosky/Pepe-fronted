import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pepe-pizza';
  mostrar:boolean = false

  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    var lol:any = this.location
    if(lol._platformLocation.location.pathname !='/login'){
      this.mostrar = true
    }
  }
}

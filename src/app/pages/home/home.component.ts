import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private globalService: GlobalService
  ) {
  }

  ngOnInit(): void {}

  enterApp() {

    this.globalService.toggleLoading(true);
    //hacer peticion al back para generar el token
    //guardar el token en el localstorage 
    //agregar interceptor si el token caduca retornar a la pagina de home
    this.router.navigate(["/calculate-flight"]);

    setTimeout(() => {
      this.globalService.toggleLoading(false);
    }, 3000)
  }
}

import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatSnackBar, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {}

  enterApp() {

    this.globalService.toggleLoading(true);

    const tok = localStorage.getItem("token");

    if(tok){
      this.globalService.toggleLoading(false);
      this.router.navigate(["/calculate-flight"]);
      return
    }

    //agregar interceptor si el token caduca retornar a la pagina de home

    try {
      this.http.get("http://localhost:3000/auth").subscribe({
        next: (res:any) => {
          if(res.response){
            localStorage.setItem('token', res.data);
            this.router.navigate(["/calculate-flight"]);
          } else {
            this.snackBar.open("Ups! hubo un error", 'Cerrar', {
              verticalPosition: this.verticalPosition,
            })
          }

          this.globalService.toggleLoading(false);
          
        },
        error: (err) => {
          console.log(err);
          this.globalService.toggleLoading(false);
          this.snackBar.open("Ups! hubo un error", 'Cerrar', {
            verticalPosition: this.verticalPosition,
          })
        }
      })
    } catch (error) {
      console.log(error);
      this.globalService.toggleLoading(false);
      this.snackBar.open("Ups! hubo un error", 'Cerrar', {
        verticalPosition: this.verticalPosition,
      })
    }
  }
}

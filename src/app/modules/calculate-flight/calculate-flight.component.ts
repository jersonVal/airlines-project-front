import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Journey } from "src/app/models/journey";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Component({
  selector: "app-calculate-flight",
  templateUrl: "./calculate-flight.component.html",
  styleUrls: ["./calculate-flight.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CalculateFlightComponent implements OnInit {

  formGroup: FormGroup;

  destinationError: string = 'Este campo no debe de estar vacio';
  currency: string = 'usd';

  journeyResult: Journey[] = [];
  currencies = [
    {
      name: 'Dolar',
      value: 'usd'
    },
    {
      name: 'Euro',
      value: 'eur'
    },
    {
      name: 'Peso colombiano',
      value: 'cop'
    }
  ];

  showResponse = false;

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public globalService: GlobalService,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {

    this.formGroup = this.fb.group({
      origin: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*$')]],
      destination: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*$')]],
      currency: ['usd', [Validators.required]]
    });

  }

  ngOnInit(): void {

  }

  changeCurrency(): void {
    const value = this.currency === 'usd' ? 1 : this.currency === 'cop' ? 4708 : 0.91;

    this.journeyResult = this.journeyResult.map((journey) => {
      journey['flights'] = journey['flights'].map((fly) => {
        fly['formatPrice'] = fly['price'] * value;
        return fly
      })

      journey['formatPrice'] = journey['price'] * value;
      
      return journey
    })
    
  }

  sendForm(): void {

    //valido que los campos no tengan los mismos valores
    if (this.formGroup.value.origin === this.formGroup.value.destination && this.formGroup.value.destination) {
      this.formGroup.controls['destination'].setErrors({ 'equal': true });
      return
    }

    if (this.formGroup.valid) {

      this.globalService.toggleLoading(true);

      try {

        const origin = this.formGroup.value.origin.toUpperCase()
        const destination = this.formGroup.value.destination.toUpperCase()
        const currency = this.formGroup.value.currency
        const token = localStorage.getItem("token");

        this.http.get(`http://localhost:3000/flight/journey/${origin}/${destination}/${currency}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        }).subscribe({
          next: (res: any) => {
            if (res.response) {

              this.currency = this.formGroup.value.currency;

              this.journeyResult = res.data;

              if (!this.showResponse) {
                this.showResponse = true
              }

            } else {

              console.log(res.erro);
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

    } else {
      Object.values(this.formGroup.controls).forEach(control => {

        control.markAsDirty();

        if (!control.value) {
          control.setErrors({ 'empty': true })
        }

        if (control.value && control.value.length < 3) {
          control.setErrors({ 'length': true })
        }

      });

    }

  }

}

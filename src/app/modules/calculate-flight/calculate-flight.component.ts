import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Journey } from "src/app/models/journey";

@Component({
  selector: "app-calculate-flight",
  templateUrl: "./calculate-flight.component.html",
  styleUrls: ["./calculate-flight.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CalculateFlightComponent implements OnInit {

  formGroup: FormGroup;

  destinationError:string = 'Este campo no debe de estar vacio';

  journeyResult: Journey | null = null;

  temp: Journey[] = [
    {
      flights: [],
      origin: 'MZL',
      destination: 'CAL',
      price: 5000,
      stops: 0
    },
    {
      flights: [
        {
          destination: 'EUR',
          origin: 'MZL',
          transport: {
            flightCarrier: 'Air test',
            flightNumber: '15024'
          },
          price: 2000
        },
        {
          destination: 'POP',
          origin: 'EUR',
          transport: {
            flightCarrier: 'Air test2',
            flightNumber: '8888'
          },
          price: 1500
        },
        {
          destination: 'CAL',
          origin: 'POP',
          transport: {
            flightCarrier: 'Air test',
            flightNumber: '8888'
          },
          price: 1500
        }
      ],
      origin: 'MZL',
      destination: 'CAL',
      price: 5000,
      stops: 2
    }
  ]

  constructor(
    private globalService: GlobalService,
    private fb: FormBuilder
  ) {

    this.formGroup = this.fb.group({
      origin: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*$')]],
      destination: [null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z]*$')]]
    });

  }

  ngOnInit(): void {

  }

  sendForm(): void{

    //valido que los campos no tengan los mismos valores
    if(this.formGroup.value.origin === this.formGroup.value.destination && this.formGroup.value.destination){
      this.formGroup.controls['destination'].setErrors({'equal': true});
      return
    } 

    if(this.formGroup.valid){
      this.globalService.toggleLoading(true);

      setTimeout(() => {
        this.globalService.toggleLoading(false);
      }, 2000)
      console.log('formulario valido para enviar');
      
    } else {
      Object.values(this.formGroup.controls).forEach(control => {

        control.markAsDirty();
        
        if(!control.value){
          control.setErrors({'empty': true})
        }

        if(control.value && control.value.length < 3){
          control.setErrors({'length': true})
        }

      });

    }
    
  }

}

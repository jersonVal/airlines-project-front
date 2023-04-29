import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CalculateFlightComponent } from "./calculate-flight.component";

const routes = [
  {
    path: "",
    component: CalculateFlightComponent,
  }
];

@NgModule({
  declarations: [
    CalculateFlightComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  exports: [
  ]
})
export class CalculateFlightModule {}

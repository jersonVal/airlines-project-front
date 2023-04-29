import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { GlobalService } from "src/app/services/global.service";

@Component({
  selector: "app-calculate-flight",
  templateUrl: "./calculate-flight.component.html",
  styleUrls: ["./calculate-flight.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CalculateFlightComponent implements OnInit {

  constructor(
    private globalService: GlobalService
  ) {
  }

  ngOnInit(): void {
    
  }

}

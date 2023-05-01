import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GlobalService {

  isLoading:boolean = false;

  peso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  });

  dolar = new Intl.NumberFormat("us-US", {
    style: "currency",
    currency: "USD",
  });

  constructor(
  ) {
  }

  toggleLoading(state: boolean): void {
    this.isLoading = state;
  }
}

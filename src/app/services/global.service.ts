import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GlobalService {

  isLoading:boolean = false;

  constructor(
  ) {
  }

  toggleLoading(state: boolean): void {
    this.isLoading = state;
  }
}

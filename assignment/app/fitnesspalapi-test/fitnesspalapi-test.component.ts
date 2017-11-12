import { Component, OnInit } from '@angular/core';
import { FitnesspalServiceClient } from "../services/fitnesspal.service.client";

@Component({
  selector: 'app-fitnesspalapi-test',
  templateUrl: './fitnesspalapi-test.component.html',
  styleUrls: ['./fitnesspalapi-test.component.css']
})
export class FitnesspalapiTestComponent implements OnInit {

  fooditem: String;
  result: Object;

  searchFood(fooditem: String) {
    this.fitnesspalService.searchFoodbyName(this.fooditem)
      .subscribe((result) => {
        this.result = result.hits;
        console.log(this.result);
      });
  }

  constructor(private fitnesspalService: FitnesspalServiceClient) { }

  ngOnInit() {
  }

}

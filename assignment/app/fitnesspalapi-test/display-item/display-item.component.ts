import { Component, OnInit } from '@angular/core';
import { FitnesspalServiceClient } from "../../services/fitnesspal.service.client";

@Component({
  selector: 'app-display-item',
  templateUrl: './display-item.component.html',
  styleUrls: ['./display-item.component.css']
})
export class DisplayItemComponent implements OnInit {

  fooditem: String;
  result: Object;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ExerciseServiceClient } from "../services/exercise.service.client";

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  exercise: String;
  result: Object;

  searchExercise(exercise: String) {
    this.exerciseService.searchExercisebyName(this.exercise)
      .subscribe((result) => {
        this.result = result.hits;
        console.log(this.result);
      });
  }

  constructor(private exerciseService: ExerciseServiceClient) { }

  ngOnInit() {
  }

}

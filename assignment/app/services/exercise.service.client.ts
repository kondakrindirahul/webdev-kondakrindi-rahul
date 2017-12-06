import { Injectable } from "@angular/core";
import {Http, Response} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class ExerciseServiceClient {
  searchExercisebyName(name: String) {
    const url = 'https://wger.de/api/v2/?exercise=dumbellpress/?format=json';
    return this.http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  constructor(private http: Http) {}
}

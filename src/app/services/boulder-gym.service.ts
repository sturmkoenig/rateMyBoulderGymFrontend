import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BoulderGym } from '../model/boulder-gym';

@Injectable({
  providedIn: 'root',
})
export class BoulderGymService {
  private url = 'localhost:5001/boulder-gym';

  constructor(private httpService: HttpClient) {}

  public getBoulderGyms(): BoulderGym[] {
    this.httpService.get(this.url);
    return [];
  }
}

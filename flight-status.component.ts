import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight-status',
  templateUrl: './flight-status.component.html',
  styleUrls: ['./flight-status.component.css']
})
export class FlightStatusComponent implements OnInit {
  flights: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchFlights();
  }

  fetchFlights() {
    this.http.get('/api/flights').subscribe((data: any) => {
      this.flights = data;
    });
  }
}

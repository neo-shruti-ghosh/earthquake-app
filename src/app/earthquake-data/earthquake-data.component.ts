import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

interface EarthquakeFeature {
  type: 'Feature';
  properties: {
    datetime: string;
    region: string;
    magnitude: number;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

@Component({
  selector: 'app-earthquake-data',
  templateUrl: './earthquake-data.component.html',
  styleUrls: ['./earthquake-data.component.scss']
})
export class EarthquakeDataComponent implements OnInit {
  earthquakeData: EarthquakeFeature[] = [];
  private map: L.Map | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeMap();
    this.fetchEarthquakeData();
  }

  initializeMap(): void {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  fetchEarthquakeData(): void {
    this.http.get<any>('https://earthquake-i1be.onrender.com/earthquakes')
      .subscribe(
        data => {
          console.log('API Response:', data);
          this.earthquakeData = data.features; // Assuming the earthquake data is stored in the `features` property
          this.plotMarkers();
        },
        error => {
          console.error('Error fetching earthquake data:', error);
        }
      );
  }
  
  plotMarkers(): void {
    const defaultIcon = L.icon({
      iconUrl: ('../../assets/icon.png'),
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
    this.earthquakeData.forEach(feature => {
      const { coordinates } = feature.geometry;
      const { magnitude } = feature.properties;

      const marker = L.marker([coordinates[1], coordinates[0]], { icon: defaultIcon }).addTo(this.map!);
      marker.bindPopup(`Magnitude: ${magnitude}`).openPopup();
    });
  }
  // plotMarkers(): void {
  //   this.earthquakeData.forEach(feature => {
  //     const { coordinates } = feature.geometry;
  //     const { magnitude } = feature.properties;

  //     const marker = L.marker([coordinates[1], coordinates[0]]).addTo(this.map!);
  //     marker.bindPopup(`Magnitude: ${magnitude}`).openPopup();
  //   });
  // }
}

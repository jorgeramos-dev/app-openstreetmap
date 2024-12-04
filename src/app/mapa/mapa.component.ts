import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',
});

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements AfterViewInit {
  private map: L.Map | undefined;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([-23.55052, -46.633308], 13); // Coordenadas de São Paulo, Brasil

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([-23.55052, -46.633308]) // Coordenadas de São Paulo
      .addTo(this.map!)
      .bindPopup('Aqui é São Paulo!')
      .openPopup();

    // Força o ajuste do mapa ao contêiner
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);

    this.http.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: 'São Paulo',
        format: 'json',
        addressdetails: '1',
      },
    }).subscribe((result) => console.log(result));
    

  }
}

import {
  Component,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core'
import * as L from 'leaflet'
import { Map } from '../../interfaces/map'
import { GeolocationService } from '../../services/geo.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapPoint') mapPoint!: MapComponent

  @Input() set markersList (val: Map[]) {
    if (val.length > 0) {
      this.markers = val
      this.addMarkersToMap()
    }
  }
  @Output() loadData: EventEmitter<Map> = new EventEmitter()

  markers: Map[] = []
  private map: any
  private iranCircle: any

  defualtLocation: Map = {
    lat: 35.55,
    lng: 51.79
  }
  minZoom = 6

  constructor (private geolocationService: GeolocationService) {
    this.getLocation()
  }
  ngAfterViewInit (): void {
    // this.map.remove()

    this.initMap()
    // this.addMarkersToMap()
    this.drawIranCircle()
  }

  get location () {
    return this.defualtLocation
  }

  get zoom () {
    return this.minZoom
  }

  updateMapView (lat: any, lng: any, zoom: number): void {
    if (this.map) {
      this.map.remove()
    }

    this.map = L.map('map').setView([lat, lng], zoom)
  }

  initMap (): void {
    this.updateMapView(this.location.lat, this.location.lng, this.zoom)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    )
  }

  addMarkersToMap (): void {
    this.markers.forEach(marker => {
      const markerIcon = L.icon({
        iconUrl: './../../../assets/img/svg/location.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      })
      L.marker([marker.lat, marker.lng], { icon: markerIcon }).addTo(this.map)
    })
  }

  drawIranCircle (): void {
    this.iranCircle = L.circle([32.42, 53.68], {
      color: 'transparent',
      fillColor: 'transparent',
      fillOpacity: 0,
      radius: 1100000
    }).addTo(this.map)
  }

  isPointInsideCircle (lat: number, lng: number): boolean {
    if (!this.iranCircle) {
      console.error('Circle is not initialized')
      return false
    }

    const point = L.latLng(lat, lng)
    const circleBounds = this.iranCircle.getBounds()
    return circleBounds.contains(point)
  }

  getLocation () {
    this.geolocationService.getCurrentPosition().subscribe(
      position => {
        if (this.isPointInsideCircle(position.latitude, position.longitude)) {
          this.defualtLocation = {
            lat: position.latitude,
            lng: position.longitude
          }
        }

        this.updateMapView(
          this.defualtLocation.lat,
          this.defualtLocation.lng,
          9
        )
        this.initMap()
        this.addMarkersToMap()
      },
      error => {
        console.error('Error getting location:', error)
      }
    )
  }
}

import { Component, HostListener, OnInit } from '@angular/core'
import { map, of, switchMap, zip } from 'rxjs'
import { TokenService } from '../../../../../auth/services/token.service'
import { FilterConfig } from '../../../../../core/interfaces/filter'
import { Map } from '../../../../../core/interfaces/map'
import { GeolocationService } from '../../../../../core/services/geo.service'
import { CompanyService } from '../../../company/services/company.service'
import { LocationService } from '../../../locations/services/location.service'
import { InformationCompony, WorkShop } from '../../interfaces/work-shop'
import { WorkShopService } from '../../services/work-shop.service'

@Component({
  selector: 'app-work-store',
  templateUrl: './workStore.component.html',
  styleUrl: './workStore.component.scss'
})
export class WorkStoreComponent implements OnInit {
  isOpen: boolean = false
  page: number = 0
  count: number = 0
  pageLoading: boolean = false
  _location: Map = {
    lat: 35.55,
    lng: 51.79
  }
  parent_id = 12
  geoLocaction = false
  detailInfo: InformationCompony = {} as InformationCompony
  isDetail = false

  constructor (
    private workShopService: WorkShopService,
    private tokenService: TokenService,
    private locationService: LocationService,
    private geolocationService: GeolocationService,
    private companyService: CompanyService
  ) {}

  ngOnInit (): void {
    this.getLocation()
    this.tokenService.getToken().subscribe(x => {
      this.getLocationAndLoadData()
    })
  }

  get pageNumber () {
    return this.page
  }

  get locationFilterConfig (): FilterConfig {
    return {
      filters: [
        {
          column_name: 'latitude',
          operand: 'IsEqualTo',
          value: this._location.lat
        },
        {
          column_name: 'longitude',
          operand: 'IsEqualTo',
          value: this._location.lng
        }
      ]
    }
  }

  get workShopFilterConfig (): FilterConfig {
    return {
      page: this.pageNumber,
      count: this.count
    }
  }

  get companiesFilterConfig (): FilterConfig {
    return {
      page: this.pageNumber,
      count: this.count,
      filters: [
        {
          column_name: 'type',
          operand: 'IsEqualTo',
          value: 'workshop'
        },
        {
          column_name: 'id',
          operand: 'In',
          value: this.CompaniesId
        }
      ]
    }
  }

  // get _list () {
  //   return this.list.push(this.workShopService.listWorkShop)
  // }

  get geo (): number {
    this.locationService.listLocation

    if (this.locationService.listLocation.length !== 0) {
      this.parent_id = this.locationService.listLocation[0].id
    }
    return this.parent_id
  }

  get workShopsList (): WorkShop[] {
    return this.workShopService.listWorkShop
  }

  get markers () {
    // if (this.workShopsList.length < this.workShopService.total) {
    //   if (this.workShopsList.length != 0) {
    //     this.fetchWorkShop()
    //   }
    //   if (this.workShopsList.length > this.workShopService.total) {
    //   }
    // }
    let m: Map[] = []
    this.workShopsList.map(res => {
      m.push({
        lat: res.latitude,
        lng: res.longitude
      })
    })
    return m
  }

  get CompaniesId (): number[] {
    let compIds: number[] = []
    this.workShopsList.map(res => {
      compIds.push(res.company_id)
    })
    return compIds
  }

  get companyList () {
    return this.companyService.listCompanies
  }

  get list (): InformationCompony[] {
    return this.workShopsList.map(workshop => {
      const company = this.companyList.find(
        company => company.id === workshop.company_id
      )
      return {
        ...workshop,
        companyName: company ? company.name : 'Unknown',
        companyActivity: company ? company.activity : 'Unknown'
      }
    })
  }

  toggleSidebar () {
    this.isOpen = !this.isOpen
    document.getElementById('sidebar')!.classList.toggle('active')
  }

  fetchWorkShop () {
    return this.workShopService
      .fetchWorkShops(this.workShopFilterConfig)
      .subscribe(res => {
        this.fetchCompanies()
        this.page++
      })
  }

  fetchLocation () {
    return this.locationService
      .fetchLocations(this.locationFilterConfig)
      .subscribe()
  }

  fetchCompanies () {
    return this.companyService
      .fetchCompanies(this.companiesFilterConfig)
      .subscribe()
  }

  // loadMore (): void {
  //   this.page++
  // }

  // nextSection (event: Map) {
  //   this.loadMore()
  // }

  getLocation () {
    return this.geolocationService.getCurrentPosition().pipe(
      switchMap(position => {
        this._location = {
          lat: +position.latitude.toString().slice(0, -4),
          lng: +position.longitude.toString().slice(0, -4)
        }
        return of(this._location)
      })
    )
  }

  getLocationAndLoadData () {
    this.fetchLocation()
    this.fetchWorkShop()
  }

  getDetailId (id: number) {
    this.isDetail = true
    this.detailInfo = this.list.filter(item => item.id === id)[0]
  }

  isDetailOpen (isOpen: boolean) {
    this.isDetail = isOpen
  }
}

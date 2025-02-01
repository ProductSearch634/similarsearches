import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { Router } from '@angular/router';
import { ProgressLoaderComponent } from '../../shared/components/progress-loader/progress-loader.component';
import { DeviceDetectionService } from '../../shared/services/device-detection.service';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, ProgressLoaderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  
  url: any;
  dataService : DataService = inject(DataService);
  router: Router = inject(Router);
  detectionService : DeviceDetectionService = inject(DeviceDetectionService);
  loading$ = this.dataService.loading$;
  userInfo: any = {};

  ngOnInit(){
    this.getUserInfo();
  }

  constructor(){
  }

  searchProduct(){
    let payload = {
      url:this.url
    }
    this.dataService.fnSearchProduct(payload).subscribe({
      next: (response:any)=>{
        // console.log(response);
        localStorage.setItem('user-searched-image', this.url);
        this.dataService.productSearchResults = response?.sample;
        console.log(this.dataService);
        this.router.navigateByUrl('result');
      },
      error: (err)=>{
        console.error(err.error.error)
      }
    })
  }


  getUserInfo(){
    const info = this.detectionService.getDeviceInfo();
    console.log(info);
    this.userInfo.browser = info.browser;
    this.userInfo.device = info.device;
    this.userInfo.os = info.os;
    this.userInfo.os = info.os;
    this.detectionService.getDeviceIPAddressAndLocation().subscribe({
      next: (response:any)=>{
        this.userInfo.ipAddress = response?.ip;
        this.userInfo.country_name = response?.country_name;
        this.userInfo.country_code = response?.country_code;
        this.userInfo.city = response?.city;
        this.userInfo.postal = response?.postal;

        console.log(this.userInfo);
      }
    })
  }

}

import { Component, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { DeviceDetectionService } from '../../shared/services/device-detection.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  url: any;
    dataService : DataService = inject(DataService);
    router: Router = inject(Router);
    detectionService : DeviceDetectionService = inject(DeviceDetectionService);
    loading$ = this.dataService.loading$;
    userInfo: any = {};

  searchProduct(){
    let payload = {
      url:this.url
    }
        this.router.navigateByUrl('result');
    // this.dataService.fnSearchProduct(payload).subscribe({
    //   next: (response:any)=>{
    //     // console.log(response);
        localStorage.setItem('user-searched-image', this.url);
    //     // this.dataService.productSearchResults = response?.sample;
    //     // console.log(this.dataService);
    //     this.router.navigateByUrl('result');
    //   },
    //   error: (err)=>{
    //     console.error(err.error.error)
    //   }
    // })
  }


}

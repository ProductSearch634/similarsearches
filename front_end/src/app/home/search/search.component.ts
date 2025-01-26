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

  ngOnInit(){

    console.log(this.detectionService.getDeviceInfo());

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

}

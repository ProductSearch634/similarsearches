import { Component, HostListener, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressLoaderComponent } from '../../shared/components/progress-loader/progress-loader.component';
import { RouterModule } from '@angular/router';

import * as AOS from 'aos';

@Component({
  selector: 'app-search-result',
  imports: [CommonModule, FormsModule, ProgressLoaderComponent, RouterModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {

  dataService : DataService = inject(DataService);

  productsList : any[] = [];
  url:any;

  // productsList : any =  [
  //   {
  //     imageUrl: "https://m.media-amazon.com/images/I/310ofQZuU1L._SY300_SX300_.jpg",
  //     price: "$89.99",
  //     brand: "Red Chief",
  //     productName: "Men's Cool Casual Leather Shoes - Brown",
  //     numberOfReviews: 128,
  //     stockStatus: "In stock",
  //     url: "https://example.com/products/red-chief-casual-shoes"
  //   },
  //   {
  //     imageUrl: "https://m.media-amazon.com/images/I/310ofQZuU1L._SY300_SX300_.jpg",
  //     price: "$129.99",
  //     brand: "Nike",
  //     productName: "Air Max Running Shoes - Black/White",
  //     numberOfReviews: 456,
  //     stockStatus: "In stock",
  //     url: "https://example.com/products/nike-air-max"
  //   },
  //   {
  //     imageUrl: "https://m.media-amazon.com/images/I/310ofQZuU1L._SY300_SX300_.jpg",
  //     price: "$75.99",
  //     brand: "Adidas",
  //     productName: "Classic Sneakers - White",
  //     numberOfReviews: 89,
  //     stockStatus: "Out Of Stock",
  //     url: "https://example.com/products/adidas-classic"
  //   },
  //   {
  //     imageUrl: "https://m.media-amazon.com/images/I/310ofQZuU1L._SY300_SX300_.jpg",
  //     price: "$159.99",
  //     brand: "Puma",
  //     productName: "RS-X Sports Shoes - Blue/Orange",
  //     numberOfReviews: 234,
  //     stockStatus: "In stock",
  //     url: "https://example.com/products/puma-rsx"
  //   },
  //   {
  //     imageUrl: "https://m.media-amazon.com/images/I/310ofQZuU1L._SY300_SX300_.jpg",
  //     price: "$99.99",
  //     brand: "Reebok",
  //     productName: "Classic Leather Sneakers - White/Gray",
  //     numberOfReviews: 167,
  //     stockStatus: "Stock status unknown",
  //     url: "https://example.com/products/reebok-classic"
  //   },
  //   {
  //     imageUrl: "https://m.media-amazon.com/images/I/310ofQZuU1L._SY300_SX300_.jpg",
  //     price: "$199.99",
  //     brand: "New Balance",
  //     productName: "Fresh Foam Running Shoes - Gray/Blue",
  //     numberOfReviews: 321,
  //     stockStatus: "In stock",
  //     url: "https://example.com/products/new-balance-fresh"
  //   },
  //   {
  //     imageUrl: "https://m.media-amazon.com/images/I/310ofQZuU1L._SY300_SX300_.jpg",
  //     price: "$145.99",
  //     brand: "Under Armour",
  //     productName: "HOVR Running Shoes - Black/Red",
  //     numberOfReviews: 178,
  //     stockStatus: "In stock",
  //     url: "https://example.com/products/under-armour-hovr"
  //   },
  //   {
  //     imageUrl: "https://m.media-amazon.com/images/I/310ofQZuU1L._SY300_SX300_.jpg",
  //     price: "$79.99",
  //     brand: "Skechers",
  //     productName: "Memory Foam Walking Shoes - Gray",
  //     numberOfReviews: 445,
  //     stockStatus: "Out Of Stock",
  //     url: "https://example.com/products/skechers-memory"
  //   },
  //   {
  //     imageUrl: "https://m.media-amazon.com/images/I/310ofQZuU1L._SY300_SX300_.jpg",
  //     price: "$169.99",
  //     brand: "ASICS",
  //     productName: "Gel-Kayano Running Shoes - Blue/Silver",
  //     numberOfReviews: 289,
  //     stockStatus: "In stock",
  //     url: "https://example.com/products/asics-gel"
  //   },
  //   {
  //     imageUrl: "https://m.media-amazon.com/images/I/310ofQZuU1L._SY300_SX300_.jpg",
  //     price: "$119.99",
  //     brand: "Brooks",
  //     productName: "Ghost Running Shoes - Black/Purple",
  //     numberOfReviews: 198,
  //     stockStatus: "Stock status unknown",
  //     url: "https://example.com/products/brooks-ghost"
  //   }
  // ]


  showGridView : boolean = true;
  searchedImage : string = '';
  selectedSort : any;

  loading$ = this.dataService.loading$;

  isVisible = false;
  scrollThreshold = 300;

  ngOnInit(){
    this.productsList = this.dataService.productSearchResults;
    this.searchedImage = localStorage.getItem('user-searched-image');
    // this.refreshPage();
    // this.getResult();
    console.log(this.productsList);

    AOS.init({
      // Global settings:
      duration: 800, // values from 0 to 3000, with step 50ms
      offset: 100, // offset (in px) from the original trigger point
      once: false, // whether animation should happen only once - while scrolling down
      easing: 'ease-in-out',
      delay: 0, // values from 0 to 3000, with step 50ms
    });

  }

  getResult(){
    this.productsList = this.dataService.productSearchResults.filter((prod)=>{
      return prod?.imageUrl != 'Image not available';
    });
    this.productsList = this.productsList.filter((prod)=>{
      return prod?.price.includes('INR');
    })
    // console.log(this.productsList);
    console.log(this.dataService.productSearchResults);
  }

  sortProducts() {
    switch (this.selectedSort) {
      case 'priceLowToHigh':
        this.productsList.sort((a, b) => this.extractPrice(a.price) - this.extractPrice(b.price));
        break;
      case 'priceHighToLow':
        this.productsList.sort((a, b) => this.extractPrice(b.price) - this.extractPrice(a.price));
        break;
      case 'reviews':
        this.productsList.sort((a, b) => b.numberOfReviews - a.numberOfReviews);
        break;
      case 'nameAZ':
        this.productsList.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case 'nameZA':
        this.productsList.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case 'relevance':
      default:
        // this.resetToOriginalOrder();
        break;
    }
  }

  private extractPrice(priceString: string): number {
    const numericString = priceString.replace(/[^0-9.]/g, '');
    return parseFloat(numericString) || 0;
  }

  searchNewProduct(productImageUrl:any){
    // alert('searching new product')
    localStorage.setItem('user-searched-image', productImageUrl);
    let payload = {
      url:localStorage.getItem('user-searched-image')
    }
    this.dataService.fnSearchProduct(payload).subscribe({
      next: (response:any)=>{
        // alert('got the data');
        this.searchedImage = localStorage.getItem('user-searched-image')
        console.log(response);
        this.productsList = response?.sample;
        this.productsList = this.productsList.filter((prod)=>{
          return prod?.imageUrl != 'Image not available';
        });
        this.productsList = this.productsList.filter((prod)=>{
          return prod?.price.includes('INR');
        })
        console.log(this.productsList);
      },
      error: (err)=>{
        console.error(err.error.error)
      }
    })
  }


  searchProduct(){
    let payload = {
      url:this.url
    }
    this.dataService.fnSearchProduct(payload).subscribe({
      next: (response:any)=>{
        // console.log(response);
        localStorage.setItem('user-searched-image', this.url);
        this.productsList = response?.sample;
        console.log(this.dataService);
      },
      error: (err)=>{
        console.error(err.error.error)
      }
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible = scrollPosition > this.scrollThreshold;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}

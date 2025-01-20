import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  http: HttpClient = inject(HttpClient);

  productSearchResults : any[] = [];

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  fnSearchProduct(payload){
    this.loadingSubject.next(true);
    // return this.http.post('http://localhost:5000/searchproduct', payload);
    return this.http.post('http://localhost:5000/searchproduct', payload).pipe(
      finalize(() => {
        this.loadingSubject.next(false);
      })
    );
  }

}

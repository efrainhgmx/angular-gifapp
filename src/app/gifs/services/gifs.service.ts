import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'qBDboQvMFViShZQ71t43CvOQG6kW77Sa';
  private _historial: string[] = [];

  public resultados: any[] = [];


  get historial(): string[] {
    return [...this._historial];
  }

  constructor(private http: HttpClient){}

  buscarGifs( query: string) {
    query = query.trim().toLowerCase();
    if( !this._historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.slice(0, 9);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=qBDboQvMFViShZQ71t43CvOQG6kW77Sa&q=${query}&limit=10`)
    .subscribe((resp:any) => {
      this.resultados = resp.data;
      console.log(this.resultados);
    })

  }
}

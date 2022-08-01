import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'qBDboQvMFViShZQ71t43CvOQG6kW77Sa';
  private _historial: string[] = [];

  public resultados: Gif[] = [];


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

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=qBDboQvMFViShZQ71t43CvOQG6kW77Sa&q=${query}&limit=10`)
    .subscribe((resp) => {
      this.resultados = resp.data;
      console.log(this.resultados);
    })

  }
}

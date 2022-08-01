import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { query } from 'express';
import { Gif, SearchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'qBDboQvMFViShZQ71t43CvOQG6kW77Sa';
  private _historial: string[] = [];
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'

  public resultados: Gif[] = [];


  get historial(): string[] {
    return [...this._historial];
  }

  //Solo se ejecuta una vez que es llamado
  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) ?? [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) ?? [];

  }

  buscarGifs( query: string) {
    query = query.trim().toLowerCase();
    if( !this._historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.slice(0, 9);
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', query);

    localStorage.setItem('historial', JSON.stringify(this._historial));
    
    
    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`, { params })
    .subscribe((resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados))
    })

  }
}

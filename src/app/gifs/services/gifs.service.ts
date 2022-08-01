import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'qBDboQvMFViShZQ71t43CvOQG6kW77Sa';
  private _historial: string[] = [];


  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs( query: string) {
      query = query.trim().toLowerCase();
    if( !this._historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.slice(0, 9);
    }

    console.log(this._historial);
  }
}

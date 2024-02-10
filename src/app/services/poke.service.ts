import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private http = inject(HttpClient);
  constructor() {}

  getPokemonData(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/metagross');
  }
  shinyBidoof(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/bidoof');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Music } from '../shared/models/music';


const baseURL = "http://localhost:3000/musics/"

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpClient: HttpClient) { }

  save(music: Music): Observable<Music> {
    return this.httpClient.post<Music>(baseURL, music);
  }
}

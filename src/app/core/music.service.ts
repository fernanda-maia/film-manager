import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Music } from '../shared/models/music';
import { ConfigParams } from '../shared/models/config-params';
import { ConfigParamsService } from './config-params.service';


const baseURL = "http://localhost:3000/musics/"

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpClient: HttpClient,
              private configParamsService: ConfigParamsService) { 

  }

  save(music: Music): Observable<Music> {
    return this.httpClient.post<Music>(baseURL, music);
  }

  update(music: Music, id: number): Observable<Music> {
    return this.httpClient.put<Music>(baseURL + id, music);
  }

  listByPage(params: ConfigParams): Observable<Music[]> {
    const httpParams = this.configParamsService.setupParams(params);

    return this.httpClient.get<Music[]>(baseURL, {params: httpParams});
  }

  getById(id: number): Observable<Music> {
    return this.httpClient.get<Music>(baseURL + id);
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(baseURL + id);
  }
}

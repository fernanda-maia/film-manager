import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ConfigParams } from '../shared/models/config-params';

import { Music } from '../shared/models/music';
import { ConfigParamsService } from './config-params.service';


const baseURL = "http://localhost:3000/musics/"

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private httpClient: HttpClient,
              private configParamsService: ConfigParamsService) { }

  save(music: Music): Observable<Music> {
    return this.httpClient.post<Music>(baseURL, music);
  }

  listByPage(params: ConfigParams): Observable<Music[]> {
    const httpParams = this.configParamsService.setupParams(params);

    return this.httpClient.get<Music[]>(baseURL, {params: httpParams});
  }
}

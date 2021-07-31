import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Music } from 'src/app/shared/models/music';
import { MusicService } from 'src/app/core/music.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { _getOptionScrollPosition } from '@angular/material/core';
import { Alert } from 'src/app/shared/models/alert';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';


@Component({
  selector: 'app-info-musics',
  templateUrl: './info-musics.component.html',
  styleUrls: [
      './info-musics.component.css',
      '../musics.component.css'
  ]
})
export class InfoMusicsComponent implements OnInit {
  readonly noPicture = "assets/img/no-image.svg";
  music: Music;
  id: number;

  constructor(public dialog: MatDialog,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private musicService: MusicService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params["id"];
    this.viewInfo();

  }

  edit(): void {
    this.router.navigateByUrl(`/musics/register/${this.id}`);
  }

  delete(): void {
    const config = {
      data: {
        title: "Confirm",
        description: `Delete ${this.music.title}?`,
        okBtn: "YES",
        cancelBtn: "CANCEL",
        hasCloseBtn:  true
          
      } as Alert
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    dialogRef.afterClosed().subscribe((opt: boolean) => {
      if(opt) {
          this.musicService
              .deleteById(this.id)
              .subscribe(() => this.router.navigateByUrl("/musics"));
      }
    })
  }

  private viewInfo(): void {
    
    this.musicService
        .getById(this.id)
        .subscribe((music: Music) => this.music = music);

    if(!this.music) {
      this.music = {
        id: -1,
        title: "Ooops...!",
        author: "",
        style: "",
        linkYoutube: "",
        releaseDate: new Date(),
        duration: new Date().getTime(),
        moreInfo: "Music not found!"

      } as Music;
    }
  }

  getYoutubeURL(): SafeResourceUrl {
    return this.sanitizer
               .bypassSecurityTrustResourceUrl(this.music.linkYoutube);
  }

}

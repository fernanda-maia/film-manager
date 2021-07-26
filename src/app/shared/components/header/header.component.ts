import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Component({
    selector: "app-film-header",
    templateUrl: "./header.component.html",
    styleUrls: [
        "./header.component.css"
    ]
})
export class HeaderComponet implements OnInit {
    @ViewChild('sidenav', {static: false}) 
    sidenav: MatSidenav;

    ngOnInit() {

    }

    openSideNav() {
        this.sidenav.open();
    }

    closeSideNav() {
        this.sidenav.close();
    }

}
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: "app-film-table",
    templateUrl: "./table.component.html",
    styleUrls: [
        "./table.component.css"
    ]
})
export class TableComponent implements OnInit{
    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    dataSource: any[] = [
        {
            id: 1,
            name: "Teste 1"
        },
        {
            id: 2,
            name: "Teste 2"
        }
    ]
    
    ngOnInit() {

    }

    changedPage(page: any): void {
        console.log(page);
    }

}
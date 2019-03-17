import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss',
        './shared-style.scss'
    ]
})
export class AppComponent implements OnInit {

    displayedColumns = ['email', 'name', 'phone', 'year', 'make', 'model', 'created_date', 'contacted'];
    dataSource: MatTableDataSource<MobileOilCustomer>;

    data = [{
        'email': 'someemail@example.com',
        'name': 'Rdsfs Esibl',
        'phone': '555650500',
        'year': 2013,
        'make': 'Subaru',
        'model': 'Outback',
        'created_date': '03/15/19 16:40:23',
        'contacted': false
    },
    {
        'email': 'klmno@bcde.com',
        'name': 'Zyx Wvu',
        'phone': '9876544321',
        'year': 2002,
        'make': 'GMC',
        'model': 'Sierra 1500',
        'created_date': '03/15/19 16:40:23',
        'contacted': false
    },
    {
        'email': 'abc@example.com',
        'name': 'Abc Def',
        'phone': '012-345-678',
        'year': 2016,
        'make': 'Ford',
        'model': 'Explorer',
        'created_date': '03/15/19 16:40:23',
        'contacted': false
    }];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    showDetails = false;

    selectedCustomer: Customer;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient
    ) {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.data as any);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onSelect(customer) {
        if (this.getViewport().width < 1000) {
            this.selectedCustomer = customer;
            this.showDetails = true;
        }
    }

    onContactedChange(customer: MobileOilCustomer) {
        console.log(customer);
    }

    // https://gist.github.com/ashhitch/8dc37f045961f8e797242c40392b6a49
    getViewport(): any {
        let win = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            w = win.innerWidth || e.clientWidth || g.clientWidth,
            h = win.innerHeight || e.clientHeight || g.clientHeight;

        return {width: w, height: h};
    }
}

export interface MobileOilCustomer {
    email: string;
    name: string;
    phone: string;
    year: number;
    make: string;
    model: string;
    created_date: string;
    contacted: boolean;
}

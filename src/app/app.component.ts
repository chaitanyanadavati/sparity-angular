import { Component } from '@angular/core';
import { AppService } from '../app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sparity';
  skip = 0;
  limit = 5;
  employeeObj: any;
  searchQuery: string;
  constructor(private appService: AppService) {
    this.getEmployees();
  }

  getEmployees() {
    const params: any = {
      skip: this.skip,
      limit: this.limit,
    };
    if (this.searchQuery) {
      params.search_string = this.searchQuery;
    }
    this.appService.getEmployees(params).subscribe((resp: any) => {
      this.employeeObj = resp;
      this.employeeObj.paginationArray = [];
      for (let i = 0; i < Math.ceil(this.employeeObj.total / this.employeeObj.limit); i++) {
        this.employeeObj.paginationArray.push(i + 1);
      }
    });
  }

  changePage(count: number) {
    this.skip = (count - 1) * this.limit;
    this.getEmployees();
  }
}

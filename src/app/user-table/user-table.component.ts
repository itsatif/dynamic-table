import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {User} from "../user";
import {UserDetailsService} from "../user-details.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})

export class UserTableComponent implements OnInit,OnDestroy{
  private subs = new Subscription();

  displayedColumns: string[] = ['action', 'avatar', 'username', 'email', 'date_of_birth', 'latidtude', 'longitude',];

  public dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private dataArray: any;

  constructor(private financeService: UserDetailsService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subs.add(this.financeService.getRandomUsers()
      .subscribe((res:User):void => {
          this.dataArray = res;
          this.dataSource = new MatTableDataSource<User>(this.dataArray);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err: HttpErrorResponse) => {
          console.error(err);
        }));
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  public openRecord(id: number, name: string): void {
    this._snackBar.open(`Record ${id} ${name} `, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

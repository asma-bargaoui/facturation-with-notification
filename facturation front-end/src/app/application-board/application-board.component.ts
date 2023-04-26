import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../_services/user.service';

export interface App {
  code: string;
  libelle: string;
  id:number;
}

@Component({
  selector: 'app-application-board',
  templateUrl: './application-board.component.html',
  styleUrls: ['./application-board.component.css']
})
export class ApplicationBoardComponent implements OnInit {
  Ids: App[] = [];

  constructor(
    private http: HttpClient,
    public router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getapplication();

  }

  public getapplication(): void {
    this.http
      .get<App[]>('http://localhost:8060/api/test/applications/getall')
      .pipe(
        catchError((err) => {
          console.error('An error occurred while fetching the app:', err);
          return of([]);
        })
      )
      .subscribe((data: App[]) => {
        console.log(data.map((app) => app.code).join(', '));
        this.Ids = data;
      });
  }
  public onDelete(id: number): void {
    console.log('Deleting app with id:', id);
    this.userService
      .deleteApp(id)
      .pipe(
        catchError((err) => {
          console.error('An error occurred while deleting the app:', err);
          return of(null);
        })
      )
      .subscribe(() => {

        this.Ids = this.Ids.filter((app) => app.id !== id);
      });
  }
}

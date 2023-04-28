//import { Component, OnInit } from '@angular/core';
//import { UserService } from '../_services/user.service';
//import { HttpClient } from '@angular/common/http';


//@Component({
 // selector: 'app-application',
 // templateUrl: './application.component.html',
  //styleUrls: ['./application.component.css']
//}) 
//export class ApplicationComponent implements OnInit {
  
 // content?: string;
 // form: any = {
  //  id: '',
   // code: null,
   // libelle: null,
   // sujet: null,
  //  prix: null,
  //};
 // errorMessage: any;
  
  //constructor(private userService: UserService, private http: HttpClient) { }
  
 // ngOnInit(): void { 
   // this.userService.getAdminBoard().subscribe(
    //  (data: any) => {
      //  this.content = data;
      //},
      //(err: any) => {
      //  this.content = JSON.parse(err.error).message;
     // }
   // );
 // }
  
 // onAppCreate(): void {
  //  const { code, libelle, prix } = this.form;
    //this.userService.registerapp(code, libelle, prix).subscribe(
     // (data: any) => {
     //   console.log(data);
     // },
     // (err: { error: { message: any; }; }) => {
     //   this.errorMessage = err.error.message;  
     // }
    //);
 // }

 // onDeleteApp(id:number) {
   // console.log('Deleting App with Id:',id); 
   // this.userService.deleteApp(id).subscribe({
     // next: (result: any) => console.log('App deleted successfully.'),
     // error: (err: any) => console.error('An error occurred while deleting the app:', err)
    //});
 // }
//}


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
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
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


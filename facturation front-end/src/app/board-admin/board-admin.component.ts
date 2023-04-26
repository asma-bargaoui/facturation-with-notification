import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


interface User {
  username: string;
  email: string;
  Id: number;
}

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  public content: string | undefined;
  public users: User[] = [];
  public selectedUser: User = {
    username: '',
    email: '',
    Id: 0 ,

  };
  public isUpdating = false;
  constructor(
    private userService: UserService,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.userService
      .getAdminBoard()
      .pipe(
        catchError((err) => {
          this.content = JSON.parse(err.error).message;
          return of([]);
        })
      )
      .subscribe((data: string | undefined) => {
        this.content = data;
      });
  }

  public getUsers(): void {
    this.http.get<User[]>('http://localhost:8060/api/test/get')
      .pipe(
        catchError((err) => {
          console.error('An error occurred while fetching the users:', err);
          return of([]);
        })
      )
      .subscribe((data: User[]) => {
        console.log(data.map((user) => user.username).join(', '));
        this.users = data;
      });
  }

  public onDelete(username: string): void {
    console.log('Deleting user with username:', username);
    this.userService
      .deleteUser(username)
      .pipe(
        catchError((err) => {
          console.error('An error occurred while deleting the user:', err);
          return of(null);
        })
      )
      .subscribe({
        next: (result: any) => {
          console.log('User deleted successfully.');
          alert('User deleted successfully.');
          // show the alert
          
        },
      });
  }
  
  

  public onEditUser(user: User): void {
    console.log('Editing user with username:', user.username);
    this.selectedUser = user;
    this.isUpdating = true;
    this.router.navigate(['/register'], {
      queryParams: { username: user.username, email: user.email },
    });
  }
}

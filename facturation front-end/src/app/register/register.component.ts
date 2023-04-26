import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  f: any = {};
  imageUrl = 'assets/img/avatar.png';
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  user: any={};
  showAddButton = true;
  showUpdateButton = false;
  showForm = false;

  constructor(private authService: AuthService, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['username'] && params['email']) {
        this.form.username = params['username'];
        this.form.email = params['email'];
      }
    });
  }
  
  onUpdateUser(): void {
    const { username, email, roles } = this.form;
    const updatedUser: User = { id: this.user.id, username, email, roles };
  
    this.updateUser(updatedUser).subscribe(
      data => {
      console.log('User updated successfully.');
      alert('User updated successfully.');
      },
      error => {
        console.error('Failed to update user:', error);
      }
    );  
  }

  updateUser(updatedUser: User): Observable<User> {
    const url =` http://localhost:8060/api/test/update/${updatedUser.username}`;
  
    return this.http.put<User>(url, updatedUser).pipe(
      catchError((error: any) => {
        console.error('Failed to update user:', error);
        return throwError(error);
      })
    );
  }

  onSubmit(): void {
    this.authService.register(this.form.username, this.form.email, this.form.password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}





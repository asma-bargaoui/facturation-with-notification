import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  f: any = {}
  content?: string;
  selectedValue?: string;
  value?: any;
  selectVisible = true;
  fileContent: File | null = null;
  applicationCode: string = '';
  structure_id: string = '';
  nbr_reel: number = 0;
  nbr_min: number = 0;
  nbr_max: number = 0;
  total_amount: number = 0;
  date_signature =  Date();
  convensionDuration: number = 0;
  form: any;
  errorMessage: any;
  myObservable: any;
  onFileSelected(event: any) {
    this.fileContent = event.target.files[0];
  }
  constructor(private userService: UserService ,private http: HttpClient,
    public router: Router) {}

  onInputClick() {
    this.selectVisible = false;
  }

  showSecondSelectFlag = false;

  showSecondSelect(value: string): void {
    this.showSecondSelectFlag = value !== "";
  }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      (data: string) => {
        this.content = data;
      },
      (error: any) => {
        this.content = JSON.parse(error.error).message;
      }
    );
  }

  onSubmit() {
    // Read file contents into Uint8Array
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContents = new Uint8Array(event.target?.result as ArrayBuffer);
      
      // Call createConvention method with fileContents and other form values
      this.userService
        .createConvention(
          fileContents,
          this.nbr_max.toString(),
          this.convensionDuration.toString(),
          parseFloat(this.applicationCode),
          parseFloat(this.structure_id),
          this.nbr_reel.toString(),
          this.date_signature.toString(),
          new Date(parseFloat(this.total_amount.toString()))
          ) 
        .subscribe(
          (data: any) => {
            console.log('Convention created successfully', data);
          },
          (error: any) => {
            console.log('Error creating convention', error);
          }
        );
    };
    reader.readAsArrayBuffer(this.fileContent as File);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  title = 'Employees'; 
  currentEmployees: Employees[] = [];  
  constructor(private http: HttpClient) { }  
  
  ngOnInit() {  
    this.http.get<Employees[]>('https://localhost:44301/api/employees').subscribe(result => {  
      this.currentEmployees = result;  
    }, error => console.error(error));  
  }  
  
}  
  
interface Employees {  
  id: number;  
  name: string;  
  surname: string;  
  job: string;  
  salary: number;  
}

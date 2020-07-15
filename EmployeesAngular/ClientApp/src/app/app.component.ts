import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit { 
  title = 'Employees'; 
  baseUrl = 'https://localhost:44301/api/employees';
  currentEmployees: Employees[] = [];
  newEmployee: Employees;
  employeeUrl: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }  
  
  ngOnInit() {  
    this.http.get<Employees[]>(this.baseUrl).subscribe(result => {  
      this.currentEmployees = result;  
    }, error => console.error(error));  
  }

  add(_name: string, _surname: string, _job: string, _salary: number) {
    this.newEmployee = {
      name: _name, 
      surname: _surname, 
      job: _job, 
      salary: +_salary
    }

    this.http.post<Employees>(this.baseUrl, this.newEmployee, this.httpOptions).subscribe(newEmployee => {
      this.currentEmployees.push(newEmployee)
    });
  }
  
  update(_id: number, _name: string, _surname: string, _job: string, _salary: number) {
    this.newEmployee = {
      id: +_id,
      name: _name, 
      surname: _surname, 
      job: _job, 
      salary: +_salary
    }

    this.employeeUrl = this.baseUrl + `/${_id}`;
    this.currentEmployees[+_id - 1] = this.newEmployee;

    this.http.put<Employees>(this.employeeUrl, this.newEmployee, this.httpOptions).subscribe();
  }  
}

interface Employees {  
  id?: number;  
  name: string;  
  surname: string;  
  job: string;  
  salary: number;  
}

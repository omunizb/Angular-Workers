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
  // newEmployee: Employees;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }  
  
  ngOnInit() {  
    this.http.get<Employees[]>(this.baseUrl).subscribe(result => {  
      this.currentEmployees = result;  
    }, error => console.error(error));  
  }

  // https://stackoverflow.com/a/7178381
  findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }

  check(array) {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i] == "") {
          return false;
      }
    }
    return true;
  }

  add(_name: string, _surname: string, _job: string, _salary: number) {
    var input = [ _name, _surname, _job, _salary ];
    if (!this.check(input))
    {
      alert("You must fill all employee data fields!");
      return;
    }

    var newEmployee = {
      name: _name, 
      surname: _surname, 
      job: _job, 
      salary: +_salary
    }

    this.http.post<Employees>(this.baseUrl, newEmployee, this.httpOptions).subscribe(newEmployee => {
      this.currentEmployees.push(newEmployee)
    });
  }
  
  update(_id: number, _name: string, _surname: string, _job: string, _salary: number) {
    var input = [ _id, _name, _surname, _job, _salary ];
    if (!this.check(input))
    {
      alert("You must fill all employee data fields!");
      return;
    }
    
    var employee = {
      id: +_id,
      name: _name, 
      surname: _surname, 
      job: _job, 
      salary: +_salary
    }

    const employeeUrl = `${this.baseUrl}/${_id}`;
    var index = this.findWithAttr(this.currentEmployees, "id", +_id);
    if (index < 0)
    {
      alert("No employee is identified by the given index!");
    }
    this.currentEmployees[index] = employee;

    this.http.put<Employees>(employeeUrl, employee, this.httpOptions).subscribe();
  }
  
  delete(employee: Employees | number) {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.baseUrl}/${id}`;
    
    var index = this.findWithAttr(this.currentEmployees, "id", id);
    if (index < 0)
    {
      alert("No employee is identified by the given index!");
    }
    this.currentEmployees.splice(index, 1);

    this.http.delete<Employees>(url, this.httpOptions).subscribe();
  }
}

interface Employees {  
  id?: number;  
  name: string;  
  surname: string;  
  job: string;  
  salary: number;  
}

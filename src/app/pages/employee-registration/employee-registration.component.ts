import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.scss',
})
export class EmployeeRegistrationComponent implements OnInit {
  departments: any[] = [];
  employeesList: any[] = [];
  employeeObject = {
    employeeId: null,
    firstName: '',
    lastName: '',
    departmentId: '',
    gender: '',
    email: '',
    phoneNo: '',
  };

  constructor(private http: HttpClient) {}

  isListView: boolean = true;

  ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployees();
  }

  loadDepartments() {
    this.http.get('assets/departments.json').subscribe((result: any) => {
      this.departments = result.data;
    });
  }

  loadEmployees() {
    this.http.get('assets/employees.json').subscribe((result: any) => {
      this.employeesList = result.data;
    });
  }

  createEmployee() {
    this.http
      .post('assets/postEmployee.json', this.employeeObject)
      .subscribe((result: any) => {
        alert(result.message);
        this.loadEmployees();
      });
  }

  onEdit(item: any) {
    this.employeeObject = item;
    this.isListView = false;
  }
}

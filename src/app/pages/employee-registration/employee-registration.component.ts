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
    employeeID: '',
    firstName: '',
    lastName: '',
    department: '',
    gender: '',
    email: '',
    phoneNo: '',
  };

  constructor(private http: HttpClient) {}

  isListView: boolean = true;

  isEdit: boolean = false;

  ngOnInit(): void {
    this.loadDepartments();
    this.loadEmployees();
  }

  loadDepartments() {
    this.http.get('assets/departments.json').subscribe((result: any) => {
      debugger;
      this.departments = result.data;
    });
  }

  loadEmployees() {
    this.http.get('assets/employees.json').subscribe((result: any) => {
      debugger;
      this.employeesList = result.data;
    });
  }

  // createEmployee() {
  //   this.http
  //     .post('assets/postEmployee.json', this.employeeObject)
  //     .subscribe((result: any) => {
  //       alert(result.message);
  //       this.loadEmployees();
  //     });
  // }

  createEmployee() {
    // Update the employees list directly (assuming in-memory for now)
    this.employeesList.push(this.employeeObject);
    console.log('employeesList', this.employeesList);
    console.log('employeeObject', this.employeeObject);

    // Simulate successful creation with an alert (optional)
    alert('Employee created successfully!');

    // Optionally write the updated data to employees.json (implementation depends on write access)
    // ... (code to write data to file)

    // -----
    this.isListView = true;

    // Clear the form after successful creation
    this.employeeObject = {
      employeeID: '',
      firstName: '',
      lastName: '',
      department: '',
      gender: '',
      email: '',
      phoneNo: '',
    };

    // Re-render the table to reflect changes
    // (might not be necessary if Angular detects changes automatically)
    // this.loadEmployees();
  }

  updateEmployee(employee: any) {
    const index = this.employeesList.findIndex(
      (emp) => emp.employeeId === employee.employeeId
    );

    if (index !== -1) {
      this.employeesList[index] = employee; // Update the employee object at the index
    }

    alert('Employee details updated');

    this.isListView = true;

    this.isEdit = false;

    this.employeeObject = {
      employeeID: '',
      firstName: '',
      lastName: '',
      department: '',
      gender: '',
      email: '',
      phoneNo: '',
    };
  }

  onEdit(employee: any) {
    this.employeeObject = employee;
    this.isListView = false;
    this.isEdit = true;
    // this.updateEmployee(employee);
  }

  onDelete(empID: string) {
    const index = this.employeesList.findIndex(
      (emp) => emp.employeeID === empID
    );

    if (index !== -1) {
      this.employeesList.splice(index, 1);
      alert(`Employee with ID ${empID} has been deleted successfully`);
    } else {
      alert(`Employee not found`);
    }
  }
}

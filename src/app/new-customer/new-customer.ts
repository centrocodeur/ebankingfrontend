import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CustomerService} from '../customer-service';
import {Validators} from '@angular/forms'
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-customer',
  standalone: false,
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css',
})
export class NewCustomer implements OnInit{

  newCustomerFormGroup!: FormGroup;

  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.newCustomerFormGroup = this.fb.group({
      name:this.fb.control("", [Validators.required, Validators.minLength(4)]),
      email: this.fb.control("", [Validators.required, Validators.email]),
    })
  }

  handleSaveCustomer() {
    let customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next : data =>{
        alert("Customer has been succefully saved!");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/customers")
      },
      error :err => {
        console.log(err)
      }
    })

  }

  protected readonly name = name;
}

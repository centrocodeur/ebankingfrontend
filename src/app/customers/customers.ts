import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../customer-service';
import {Customer} from "../model/customer.model";
import {Observable, catchError, throwError, pipe, map} from 'rxjs'
import {FormGroup, FormBuilder} from '@angular/forms'
import {Router} from "@angular/router";



@Component({
  selector: 'app-customers',
  standalone: false,
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers  implements OnInit{

  //customers: any;
   customers!: Observable<Array<Customer>>;
  //errorMessage !: Object;
    errorMessage!: string;

    searchformGroup: FormGroup| undefined;
  constructor( private customerService: CustomerService,
                private fb: FormBuilder,
               private router: Router) {

  }

    ngOnInit(): void {

      this.searchformGroup = this.fb.group({
          keyword: this.fb.control("")
      })
       /*
      this.customers= this.customerService.getCustomers().pipe(
          catchError (err => {
            this.errorMessage= err.message
            return throwError(err);
          })
      )
        */
        this.handleSearchCustomer()
    }

  /*
  ngOnInit(): void {
    this.customerService.getCustomers()
      .subscribe({
        next: data => {
          this.customers = data;
        },
        error: err => {
          this.errorMessage=err.message
          console.log(err);
        }
      })
  }


   */
    handleSearchCustomer() {
     let kw = this.searchformGroup?.value.keyword;
     this.customers= this.customerService.searchCustomers(kw).pipe(
         catchError (err => {
             this.errorMessage= err.message
             return throwError(err);
         })
     )

    }



    handleDeleteCustomer1(c: Customer) {
        this.customerService.deleteCustomer(c.id).subscribe({

            next: (resp) => {
                this.handleSearchCustomer();
                alert("Customer has been succefully  deleted ")
            },
            error: err => {
                console.log(err)
            }
        })

    }

    handleDeleteCustomer(c: Customer) {
        let conf= confirm('are you sure !')
        if(!conf){
            return;
        }
        this.customerService.deleteCustomer(c.id).subscribe({
            next: resp=>{
                this.customers= this.customers.pipe(
                    map(data=>{
                        let index = data.indexOf(c);
                        data.slice(index, 1)
                        //this.router.navigateByUrl("/customers")
                        return data;
                    }
                )

                )
            }
        })
    }

  handleCustomerAccounts(customer: Customer) {

      this.router.navigateByUrl("/customer-accounts/"+customer.id, {state: customer})


  }
}

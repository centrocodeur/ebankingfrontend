import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, publish} from 'rxjs';
import {Customers} from "./customers/customers";
import {Customer} from "./model/customer.model";
import {Environments} from "../environments/environments";

@Injectable({
  providedIn: 'root',
})
export class CustomerService {

  constructor(private  http: HttpClient) {

  }

  getCustomers1(): Observable<any>{
    return this.http.get(Environments.backendHost+"/customers")
  }

  getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(Environments.backendHost+"/customers")

  }

  searchCustomers(keyword:any): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(Environments.backendHost+"/customers/search?keyword="+keyword)

  }


  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(Environments.backendHost+"/customers", customer)

  }

  deleteCustomer(id:number): Observable<any> {
    return this.http.delete(Environments.backendHost+"/customers/"+id)

  }

  }

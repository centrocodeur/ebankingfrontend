import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Environments} from '../../environments/environments';
import {Observable} from 'rxjs';
import {AccountDetails} from '../model/accounts.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor( private http: HttpClient) {
  }

  getAccount(accountId: string, page: number, size: number):Observable<AccountDetails>{


    return this.http.get<AccountDetails>(Environments.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public debit(accountId: string, amount:number, description: string){
     let data= {accountId: accountId, amount: amount, description: description}
       return this.http.post(Environments.backendHost+"/accounts/debit", data);
  }


  public credit(accountId: string, amount:number, description: string){
    let data= {accountId: accountId, amount: amount, description: description}
    return this.http.post(Environments.backendHost+"/accounts/credit", data);
  }


  public transfer(accountSource: string, accountDestination: string , amount: number, description: string){
    let data= {accountSource, accountDestination, amount, description}
    return this.http.post(Environments.backendHost+"/accounts/transfer", data);
  }


}

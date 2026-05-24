import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountService} from '../services/account-service';
import {catchError, Observable, throwError} from 'rxjs';
import {AccountDetails} from '../model/accounts.model';

@Component({
  selector: 'app-accounts',
  standalone: false,
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class Accounts  implements  OnInit{

  accountFormGroup!: FormGroup;
  currentPage: number= 0;
  pageSize: number= 5;
  accountObservable!: Observable<AccountDetails>;

  errorMessage!: string;

  operationFormGroup!: FormGroup;


  constructor( private  fb: FormBuilder, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountFormGroup= this.fb.group({
      accountId: this.fb.control("")
    });

    this.operationFormGroup= this.fb.group({

      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null),
    })
  }


  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;

    console.log("accountID = " + accountId);


    this.accountObservable=  this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError( err => {
        this.errorMessage = err.message;
        return throwError(err)
      }
    )
    );

  }

  gotoPage(page: number) {
    this.currentPage =page;
    this.handleSearchAccount()

  }

  handleAccountOperation() {
    let accountId: string= this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;

    let amount:number= this.operationFormGroup.value.amount
    let description : string= this.operationFormGroup.value.description;
    let accountDestination:string = this.operationFormGroup.value.accountDestination

    if(operationType=='DEBIT'){

      this.accountService.debit(accountId,amount, description ).subscribe({
        next: (data)=>{
          alert("Debit Success");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
         error: err => {
          console.log(err)
        }
      });

    }

    else if(operationType=='CREDIT'){

      this.accountService.credit(accountId,amount, description ).subscribe({
        next: (data)=>{
          alert("Credit success");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: err => {
          console.log(err)
        }
      });


    }

    else if(operationType=='TRANSFER'){

      this.accountService.transfer(accountId, accountDestination,  amount, description ).subscribe({
        next: (data)=>{
          alert("Transfer Success");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: err => {
          console.log(err)
        }
      })  ;

    }
    //this.operationFormGroup.reset();

  }
}

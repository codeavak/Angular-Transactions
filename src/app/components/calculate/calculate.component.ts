import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';
import { timingSafeEqual } from 'crypto';
import { unwatchFile } from 'fs';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent implements OnInit {
FirstBalance:number;
SecondBalance:number;
FirstNewBalance:number;
FecondNewBalance:number;
FirstTransaction:boolean;
Transactions:Transaction[];
NewTransaction:Transaction;
SeeTransaction;

  constructor() { }

  ngOnInit() {
    this.SeeTransaction=function(){
      this.NewTransaction.invalidMessage='';
      this.NewTransaction.invalidBalanceMessage='';
      delete this.NewTransaction.invalid;
      delete this.NewTransaction.invalidBalance;
      if(this.firstBalance<=0 || this.secondBalance<=0){
        this.NewTransaction.invalidBalance=true;this.NewTransaction.invalidBalanceMessage+='Sender and receiver must have positive balances.';
      
      }
      
      if(!this.NewTransaction.sender||!this.NewTransaction.receiver)
      {
        this.NewTransaction.invalid=true;this.NewTransaction.invalidMessage+='Sender and Receiver are required.';
      
      } 
      else if(this.NewTransaction.sender==this.NewTransaction.receiver){
        this.NewTransaction.invalid=true;this.NewTransaction.invalidMessage+='Sender and Receiver can\'t be the same.';
      
      }
      if(!this.NewTransaction.amount){
        this.NewTransaction.invalid=true;this.NewTransaction.invalidMessage+='Amount is required.';
      }
       else if(parseInt(this.NewTransaction.amount)<=0 || parseInt(this.NewTransaction.amount)>1000){
        this.NewTransaction.invalid=true;this.NewTransaction.invalidMessage+='Amount should be between 1 and 1000.';
      }
      if(!this.NewTransaction.hasOwnProperty('invalid'))
      { 
        if(this.FirstTransaction){
        this.FirstNewBalance=parseInt(this.FirstBalance);
        this.SecondNewBalance=parseInt(this.SecondBalance);
        this.FirstTransaction=false;
      }
      
        delete this.invalid;
        delete this.invalidMessage;
        this.Transactions.push(this.NewTransaction);
        if(this.NewTransaction.sender=='1'){
          this.FirstNewBalance-=parseInt(this.NewTransaction.amount);
        }
        else{
          this.SecondNewBalance-=parseInt(this.NewTransaction.amount);
        }
        this.NewTransaction={}
      }
      

    }
    this.FirstBalance=0;
    this.SecondBalance=0;
   this.FirstTransaction=true;
    this.NewTransaction=new Transaction();
    

    this.Transactions=[];
  }

}

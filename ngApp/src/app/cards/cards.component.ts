import { Component, OnInit } from '@angular/core';
import { Card } from '../card';
import { Task } from '../task';
import { TrelloService } from '../shared/trello.service';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  inputs:['cards'],
  outputs:['tasks']
})
export class CardsComponent implements OnInit {

 
  cards: Array<Card>; 
  tasks: Array<Task>;

  isAddTaskId: string;
  isAddCard : boolean = false;


  addCardData = { name : '' };

  addTaskData = { card_id: '', text: '' };

  updatingCardId: string;

  noEditCard:boolean = true;




  constructor(private trelloService : TrelloService) { }

  ngOnInit() {
    this.trelloService.getCards()
      .subscribe(
        res => { this.cards = res; this.trelloService.cards = res },
        err => console.log(err)
      );
    this.trelloService.getAllTasks()
      .subscribe(
        res => { this.tasks = res; this.trelloService.tasks = res },
        err => console.log(err)
      );
  }


  // CARDS
  addCard() {
    this.trelloService.addCard(this.addCardData)
      .subscribe(
        res => this.cards.push(res),
        err => console.log(err)
      );
      this.isAddCard = false;
      this.addCardData.name = '';
    }

    isAddingCard () {
      this.isAddCard = true;
    }
  
    addCardCancel(){
      this.isAddCard = false;
    }

    deleteCard(card : Card) {
      let cardArray = this.cards;
      let taskArray = this.tasks;
      for(let i = 0; i < taskArray.length; i++){
        if(taskArray[i].card_id == card._id){
          this.deleteTask(taskArray[i]);       
        }
      } 
      this.trelloService.deleteCard(card)
        .subscribe(
          resDeletedCard => {
            for(let i = 0; i < cardArray.length; i++){
              if(cardArray[i]._id == card._id){
                cardArray.splice(i,1);
              }
            }
          },
        err => console.log(err));      
    }


    updateCard(card: Card){
      this.trelloService.updateCard(card)
        .subscribe(resUpdatedCard => card = resUpdatedCard,
        err => console.log(err));
      this.noEditCard = true;
    }
    editCardCancel(){
      this.noEditCard = true;
    }
    updatingCard(card){
      this.noEditCard = false;
      this.updatingCardId = card._id;
    }


  // TASKS

  getTasks(card: Card){
    return this.trelloService.getTasks(card);
  }

  addTask(card:Card){
    this.addTaskData.card_id = card._id;
    this.trelloService.addTask(this.addTaskData)
      .subscribe(
        res => this.tasks.push(res),
        err => console.log(err)
      );
    this.isAddTaskId = undefined;
    this.addTaskData.text = '';
    this.addTaskData.card_id = '';
  }

  isAddingTask(card:Card){
    this.isAddTaskId = card._id;
  }

  addTaskCancel(){
    this.isAddTaskId = undefined;
  }

  deleteTask(task:Task){
    let taskArray = this.tasks;
    this.trelloService.deleteTask(task)
      .subscribe(
        resDeletedTask => {
          for(let i = 0; i < taskArray.length; i++){
            if(task._id == taskArray[i]._id){
              taskArray.splice(i,1);
            }
          }
        },
        err => console.log(err)
      );
  };

}

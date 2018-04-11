import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' ;

import { Card } from "../card";
import { Task } from "../task";

@Injectable()
export class TrelloService {

  //Cards URL
  private _getCardsUrl = "http://localhost:3000/api/cards";
  private _addCardUrl = "http://localhost:3000/api/card";
  private _deleteCardUrl = "http://localhost:3000/api/card/";
  private _updateCardUrl = "http://localhost:3000/api/card/";

  //Tasks URL
  private _getTasksUrl = "http://localhost:3000/api/tasks";
  private _addTaskUrl = "http://localhost:3000/api/task";
  private _deleteTaskUrl = "http://localhost:3000/api/task/";
  private _updateTaskUrl = "http://localhost:3000/api/task/";


  constructor(private http: HttpClient){ }

  cards: Card [] = [];
  tasks: Task[] = [];

  //CARDS

  getCards(){
    return this.http.get<any>(this._getCardsUrl);
  }

  updateCard(card: Card) {
    return this.http.put<any>(this._updateCardUrl + card._id, card);
  }
 
  addCard(card){
    return this.http.post<any>(this._addCardUrl, card);
  };

  deleteCard(card: Card){
    return this.http.delete<any>(this._deleteCardUrl + card._id);
  }


  //TASKS

  getAllTasks() {
    return this.http.get<any>(this._getTasksUrl);
  }

  getTasks(card:Card){
    let tasks:Task[] = [];
    for(let i = 0; i < this.tasks.length; i++)
    {
      if(card._id == this.tasks[i].card_id)
      {
        tasks.push(this.tasks[i]);
      }
    }
    return tasks;
  };

  addTask(task){
    return this.http.post<any>(this._addTaskUrl, task);
  };

  deleteTask(task:Task){
    return this.http.delete<any>(this._deleteTaskUrl + task._id);
  }

  updateTask(task:Task){
    return this.http.put<any>(this._updateTaskUrl + task._id, task);
  }
}
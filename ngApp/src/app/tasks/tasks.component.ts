import { Component, OnInit } from '@angular/core';
import { TrelloService } from '../shared/trello.service';
import { Task } from '../task';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  inputs:['task']
})
export class TasksComponent implements OnInit {

  noEditTask:boolean = true;

  tasks:Task [] = [];
  constructor(private trelloService : TrelloService) { }
  
  
  ngOnInit() {
    this.tasks = this.trelloService.tasks;
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

  editTask(){
    this.noEditTask = false;
  }

  updateTask(task){
    this.trelloService.updateTask(task)
      .subscribe(resUpdatedTask => task = resUpdatedTask,
        err => console.log(err));
    this.noEditTask = true;
  }

  editTaskCancel(){
    this.noEditTask = true;
  }
}


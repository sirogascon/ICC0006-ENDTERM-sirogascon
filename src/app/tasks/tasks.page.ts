import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TasksService, Task } from '../tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TasksPage implements OnInit {
  tasks: Task[] = [];
  loading = true;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.slice(0, 20);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando tareas', error);
        this.loading = false;
      }
    });
  }
}
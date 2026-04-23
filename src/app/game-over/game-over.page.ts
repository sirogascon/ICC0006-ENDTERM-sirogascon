import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.page.html',
  styleUrls: ['./game-over.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink]
})
export class GameOverPage implements OnInit {
  finalScore = 0;

  ngOnInit(): void {
    const storedScore = localStorage.getItem('finalScore');
    this.finalScore = storedScore ? Number(storedScore) : 0;
  }
}
import { AfterViewInit, Component, NgZone, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import * as Phaser from 'phaser';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class GamePage implements AfterViewInit, OnDestroy {
  score = 0;
  hits = 0;

  phaserGame: Phaser.Game | null = null;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private scoreService: ScoreService
  ) {}

  ngAfterViewInit(): void {
    this.createGame();
  }

  ngOnDestroy(): void {
    if (this.phaserGame) {
      this.phaserGame.destroy(true);
      this.phaserGame = null;
    }
  }

  createGame(): void {
    const page = this;

    class MainScene extends Phaser.Scene {
      player!: Phaser.GameObjects.Rectangle;
      cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
      tasks: Phaser.GameObjects.Rectangle[] = [];
      obstacles: Phaser.GameObjects.Rectangle[] = [];
      scoreText!: Phaser.GameObjects.Text;
      hitsText!: Phaser.GameObjects.Text;

      canSpawnTask = true;
      canSpawnObstacle = true;

      constructor() {
        super('main-scene');
      }

      create(): void {
        this.cursors = this.input.keyboard!.createCursorKeys();

        this.player = this.add.rectangle(200, 450, 60, 30, 0x4caf50);

        this.scoreText = this.add.text(10, 10, 'Puntos: 0', {
          color: '#ffffff',
          fontSize: '20px'
        });

        this.hitsText = this.add.text(10, 40, 'Golpes: 0/3', {
          color: '#ffffff',
          fontSize: '20px'
        });

        this.time.addEvent({
          delay: 1400,
          callback: () => {
            if (this.canSpawnTask) {
              this.spawnTask();
              this.canSpawnTask = false;

              this.time.delayedCall(500, () => {
                this.canSpawnTask = true;
              });
            }
          },
          loop: true
        });

        this.time.addEvent({
          delay: 2200,
          callback: () => {
            if (this.canSpawnObstacle) {
              this.spawnObstacle();
              this.canSpawnObstacle = false;

              this.time.delayedCall(700, () => {
                this.canSpawnObstacle = true;
              });
            }
          },
          loop: true
        });
      }

      spawnTask(): void {
        const x = Phaser.Math.Between(40, 360);
        const task = this.add.rectangle(x, 20, 20, 20, 0x2196f3);
        this.tasks.push(task);
      }

      spawnObstacle(): void {
        const x = Phaser.Math.Between(40, 360);
        const obstacle = this.add.rectangle(x, 20, 24, 24, 0xf44336);
        this.obstacles.push(obstacle);
      }

      override update(): void {
        if (this.cursors.left?.isDown) {
          this.player.x -= 5;
        } else if (this.cursors.right?.isDown) {
          this.player.x += 5;
        }

        if (this.player.x < 30) {
          this.player.x = 30;
        }

        if (this.player.x > 370) {
          this.player.x = 370;
        }

        for (let i = this.tasks.length - 1; i >= 0; i--) {
          const task = this.tasks[i];
          task.y += 3;

          if (Phaser.Geom.Intersects.RectangleToRectangle(task.getBounds(), this.player.getBounds())) {
            task.destroy();
            this.tasks.splice(i, 1);

            page.ngZone.run(() => {
              page.score++;
            });

            this.scoreText.setText('Puntos: ' + page.score);
            continue;
          }

          if (task.y > 520) {
            task.destroy();
            this.tasks.splice(i, 1);
          }
        }

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
          const obstacle = this.obstacles[i];
          obstacle.y += 3.5;

          if (Phaser.Geom.Intersects.RectangleToRectangle(obstacle.getBounds(), this.player.getBounds())) {
            obstacle.destroy();
            this.obstacles.splice(i, 1);

            page.ngZone.run(() => {
              page.hits++;
            });

            this.hitsText.setText('Golpes: ' + page.hits + '/3');

            if (page.hits >= 3) {
              localStorage.setItem('finalScore', String(page.score));

              page.scoreService.saveScore(page.score);

              page.ngZone.run(() => {
                page.router.navigateByUrl('/game-over');
              });
            }
            continue;
          }

          if (obstacle.y > 520) {
            obstacle.destroy();
            this.obstacles.splice(i, 1);
          }
        }
      }
    }

    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      width: 400,
      height: 500,
      parent: 'game-container',
      backgroundColor: '#1e1e1e',
      scene: MainScene
    });
  }

  pauseGame(): void {
    if (this.phaserGame) {
      this.phaserGame.scene.pause('main-scene');
    }
  }

  resumeGame(): void {
    if (this.phaserGame) {
      this.phaserGame.scene.resume('main-scene');
    }
  }

  restartGame(): void {
    this.score = 0;
    this.hits = 0;

    if (this.phaserGame) {
      this.phaserGame.destroy(true);
      this.phaserGame = null;
    }

    const container = document.getElementById('game-container');
    if (container) {
      container.innerHTML = '';
    }

    this.createGame();
  }
}
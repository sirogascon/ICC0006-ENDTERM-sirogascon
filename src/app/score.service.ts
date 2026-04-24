import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private db = getFirestore();

  async saveScore(score: number): Promise<void> {
    await addDoc(collection(this.db, 'scores'), {
      score: score,
      date: new Date().toISOString()
    });
  }
}
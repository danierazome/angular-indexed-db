import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  name = new FormControl('');
  email = new FormControl('');

  constructor(private dbService: NgxIndexedDBService) {}

  async save() {
    const usages: Usage[] = [];
    for (let i = 0; i < 100000; i++) {
      const obj: Usage = {
        client_id: this.getRandomInt(30),
        usage: this.getRandomInt(100),
        date: `2024/0${this.getRandomIntInRange(
          8,
          1
        )}/0${this.getRandomIntInRange(8, 1)}`,
      };
      usages.push(obj);
    }

    const beginning = new Date();

    this.dbService.bulkAdd('data-01', usages).subscribe(() => {
      this.printProcessTime(beginning, 'The creation dataset time was: ');
    });
  }

  async computeIndexedDbSize() {
    this.dbService
      .openCursorByIndex('data-01', 'client_id', IDBKeyRange.bound(1, 3))
      .subscribe((evt) => {
        const cursor = (evt.target as IDBOpenDBRequest)
          .result as unknown as IDBCursorWithValue;
        if (cursor) {
          console.log(cursor.value);
          cursor.continue();
        } else {
          console.log('Entries all displayed.');
        }
      });
  }

  deleteObjectStore() {
    this.dbService.deleteObjectStore('data-01').subscribe((r) => {
      console.log('The object was delete: ', r);
    });
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  getRandomIntInRange(max: number, min: number) {
    return this.getRandomInt(max) + min;
  }

  printProcessTime(beginning: Date, message: string) {
    const end = new Date();
    const difference = end.getTime() - beginning.getTime();
    console.log(message, difference);
  }
}

export interface Usage {
  client_id: number;
  usage: number;
  date: string;
}

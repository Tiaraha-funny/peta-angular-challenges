import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  randomCity,
  randStudent,
  randTeacher,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="mx-auto mt-2 flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <img
        *ngIf="type === CardType.TEACHER"
        src="assets/img/teacher.png"
        width="200px" />
      <img
        *ngIf="type === CardType.STUDENT"
        src="assets/img/student.webp"
        width="200px" />

      <img
        *ngIf="type === CardType.CITY"
        src="assets/img/city.png"
        width="200px" />

      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="type === CardType.CITY ? item.name : item.firstName"
          [id]="item.id"
          [type]="type"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';

  CardType = CardType;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
    private cityStore: CityStore,
  ) {}

  addNewItem() {
    if (this.type === CardType.TEACHER) {
      this.teacherStore.addOne(randTeacher());
    } else if (this.type === CardType.STUDENT) {
      this.studentStore.addOne(randStudent());
    } else if (this.type === CardType.CITY) {
      this.cityStore.addOne(randomCity());
    }
  }
}

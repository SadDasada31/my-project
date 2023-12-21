import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AddListItem, ListItem } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private readonly _stateList: BehaviorSubject<ListItem[]> = new BehaviorSubject<ListItem[]>([]);
  public readonly list$: Observable<ListItem[]> = this._stateList.asObservable();
  public readonly listSum$: Observable<{sum: number}> = this._stateList.pipe(
    map((list) => {
      let sum = 0;

      for (const listItem of list) {
        sum = sum + listItem.sum;
      }

      return {
        sum: sum
      };
    })
  );

  constructor() {}

  public add(addedListItem: AddListItem): void {
    const stateList = this._stateList.value;

    if (addedListItem.count < 0) throw new Error('В сервис ListService добавили товар с количеством меньше нуля');

    const createdItem: ListItem = {
      id: window.crypto.randomUUID(),
      sum: addedListItem.price,
      name: addedListItem.name,
      price: addedListItem.price,
      count: addedListItem.count
    }

    this._stateList.next([ ...stateList, createdItem ]);
  }

  public increase(id: string): void {
    const stateList = this._stateList.value;

    const findedIdxItem = stateList.findIndex(item => item.id === id);
    if (findedIdxItem === -1) return; // Если не нашли элемент с таким id, завершить функцию
    stateList[findedIdxItem].count = stateList[findedIdxItem].count + 1;
    stateList[findedIdxItem].sum = stateList[findedIdxItem].count * stateList[findedIdxItem].price;

    this._stateList.next(stateList);
  }

  public decrease(id: string): void {
    const stateList = this._stateList.value;

    const findedIdxItem = stateList.findIndex(item => item.id === id);
    if (findedIdxItem === -1) return; // Если не нашли элемент с таким id, завершить функцию
    if (stateList[findedIdxItem].count === 1) return; // Если при удалении количество товара равняется 1, то не уменьшать ничего
    stateList[findedIdxItem].count = stateList[findedIdxItem].count - 1;
    stateList[findedIdxItem].sum = stateList[findedIdxItem].count * stateList[findedIdxItem].price;

    this._stateList.next(stateList);
  }

}

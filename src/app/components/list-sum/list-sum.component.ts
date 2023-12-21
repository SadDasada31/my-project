import { Component } from '@angular/core';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-sum',
  templateUrl: './list-sum.component.html',
  styleUrls: ['./list-sum.component.css']
})
export class ListSumComponent {
  listSum$ = this.listService.listSum$;

  constructor(
    private readonly listService: ListService
  ) {}
}

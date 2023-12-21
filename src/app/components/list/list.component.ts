import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ListService } from 'src/app/services/list.service';
import { ListItem } from 'src/app/shared/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public list$: Observable<ListItem[]> = this.listService.list$;

  constructor(
    private readonly listService: ListService
  ) {}
}

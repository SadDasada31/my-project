import { Component, Input } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { ListItem } from 'src/app/shared/models';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {

  @Input({ required: true }) listItem!: ListItem;

  constructor(
    private readonly listService: ListService
  ) {}

  isCrossedOut: boolean = false;

  increase(): void {
    this.listService.increase(this.listItem.id);
  }

  decrease(): void {
    this.listService.decrease(this.listItem.id);
  }

}

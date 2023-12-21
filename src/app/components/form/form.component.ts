import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(
    private readonly listService: ListService
  ) {}

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl(10, [Validators.required, Validators.min(1)]),
    count: new FormControl(1,[Validators.required, Validators.min(1)])
  });

  submitForm(): void {
    if (!this.form.value.name) return; // если ничего нету в значении элемента формы this.form.value.name
    if (!this.form.value.price) return; // если ничего нету в значении элемента формы this.form.value.price
    if (!this.form.value.count) return;

    const newListItem = {
      name: this.form.value.name,
      price: this.form.value.price,
      count: this.form.value.count
    };

    this.listService.add(newListItem);
  }
}

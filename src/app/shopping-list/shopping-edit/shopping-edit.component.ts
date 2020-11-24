import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() {
  }

  ngOnInit(): void {
  }

  addItem(nameInput: HTMLInputElement, amountInput: HTMLInputElement) {
    const ingredient = new Ingredient(nameInput.value, Number(amountInput.value));
    this.ingredientAdded.emit(ingredient);
  }
}

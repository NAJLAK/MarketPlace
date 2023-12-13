import { Injectable } from '@angular/core';
import { MarketplaceItemType } from '../types/marketplace.type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartItems = new BehaviorSubject<Array<{ item: MarketplaceItemType, quantity: number }>>([]);

  constructor() { }

  getCartItems = () => this._cartItems;

  addItem = (item: MarketplaceItemType, quantity = 1) => {
    const currentCartItems = this._cartItems.getValue();
    const searchItem = currentCartItems.find(i => i.item.id === item.id);
    if (searchItem) {
      searchItem.quantity += quantity;
    } else {
      currentCartItems.push({
        item,
        quantity
      });
    }
    this._cartItems.next(currentCartItems);
  }

  removeItem = (item: MarketplaceItemType) => {
    let currentCartItems = this._cartItems.getValue();
    currentCartItems = currentCartItems.filter(i => i.item.id !== item.id);
    this._cartItems.next(currentCartItems);
  }
}


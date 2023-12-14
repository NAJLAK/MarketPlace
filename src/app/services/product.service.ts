import { Injectable } from '@angular/core';
import { MarketplaceItemType } from '../types/marketplace.type';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _products: MarketplaceItemType[] = [
    {
      id: 1,
      title: "ADIDAR MAX",
      category: "ADULT",
      image: "assets/img1.jpg",
      description: "Lorem ipsum is placeholder text commonly used in the graphic.",
      price: 65.00,
      isSelected: false
    },
    {
      id: 2,
      title: "LEBRON MAX AIR",
      category: "KIDS",
      image: "assets/img2.jpeg",
      description: "Lorem ipsum is placeholder text commonly used in the graphic.",
      price: 65.00,
      isSelected: false
    }
    ,
    {
      id: 3,
      title: "PUMA XS",
      category: "ADULT",
      image: "assets/img3.jpeg",
      description: "Lorem ipsum is placeholder text commonly used in the graphic.",
      price: 4.99,
      isSelected: false
    },
    {
      id: 4,
      title: "PUMA XS",
      category: "ADULT",
      image: "assets/img4.jpeg",
      description: "Lorem ipsum is placeholder text commonly used in the graphic.",
      price: 4.99,
      isSelected: false
    }
  ];

  constructor() { }

  getProducts = (): Observable<Array<MarketplaceItemType>> => {
    return of(this._products);
  }

  markProductAsSelected = (item: MarketplaceItemType) => {
    item.isSelected = true;
  }

  markProductAsUnselected = (item: MarketplaceItemType) => {
    item.isSelected = false;
  }
}

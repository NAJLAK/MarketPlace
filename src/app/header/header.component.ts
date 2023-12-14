import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MarketplaceItemType } from '../types/marketplace.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  showModal = false;
  
  toggleModal() {
    this.showModal = !this.showModal;
  }
  increaseQuantity(cartItem: { item: MarketplaceItemType; quantity: number }) {
    cartItem.quantity++;
  }
  
  cartItems: { item: MarketplaceItemType, quantity: number }[] = [];
  cartItemsSub!: Subscription;
  
  constructor(
    public cartService: CartService,
  ) {}

  // Decrease the quantity of a product, and remove it if the quantity becomes zero
  decreaseQuantity(cartItem: { item: MarketplaceItemType; quantity: number }) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      // Remove the product from the cart if the quantity becomes zero
      this.removeProduct(cartItem);
    }
  }

  // Remove a product from the cart
  removeProduct(cartItem: { item: MarketplaceItemType; quantity: number }) {
    const index = this.cartItems.indexOf(cartItem);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }
  addProductToCart(product: MarketplaceItemType, quantity: number = 1) {
    // Check if the quantity is not negative
    if (quantity > 0) {
      const existingProduct = this.cartItems.find(item => item.item.title === product.title);

      if (existingProduct) {
        // Product already exists, increase the quantity
        existingProduct.quantity += quantity;
      } else {
        // Add a new product to the cart
        this.cartItems.push({ item: product, quantity });
      }
    }
  }
  
  ngOnInit(): void {
    this.cartItemsSub = this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  ngOnDestroy(): void {
    this.cartItemsSub.unsubscribe();
  }
}


import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

// Category Interface
export interface ICategory {
  id: number,
  name: string,
  image: string,
}

// Product Interface
export interface IProduct {
  id: number,
  name: string,
  price: number,
  image: string,
}

// Cart Product Interface
export interface ICartProduct extends IProduct {
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private shoppingCartList: ICartProduct[] = [];
  private shoppingCart$: BehaviorSubject<ICartProduct[]> =
    new BehaviorSubject<ICartProduct[]>(this.shoppingCartList);

  constructor() { }

  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: 'Womens',
      image: '../../assets/categories/category-1.png'
    }
    let cat2: ICategory = {
      id: 2,
      name: 'Mens',
      image: '../../assets/categories/category-2.png'
    }
    let cat3: ICategory = {
      id: 3,
      name: 'Kids',
      image: '../../assets/categories/category-3.png'
    }

    categories.push(cat1, cat2, cat3);

    return categories;
  }

  getFeaturedProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 55,
      image: '../../assets/products/prod-1.png'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Mens T-Shirt',
      price: 34,
      image: '../../assets/products/prod-2.png'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 40,
      image: '../../assets/products/prod-3.png'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }

  getBestSellProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 55,
      image: '../../assets/products/prod-4.png'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Mens T-Shirt',
      price: 34,
      image: '../../assets/products/prod-5.png'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Womens T-Shirt',
      price: 40,
      image: '../../assets/products/prod-6.png'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }  

  get shoppingCart(): Observable<ICartProduct[]> {
    return this.shoppingCart$.asObservable();
  }

  addProductToCart(product: IProduct, amount: number = 1): void {
    const cartProduct = this.shoppingCartList.find(listProduct => product.id === listProduct.id);
    if (cartProduct === undefined) {
      const newCartProduct = product as ICartProduct;
      newCartProduct.amount = amount;
      this.shoppingCartList.push(newCartProduct);
    } else {
      cartProduct.amount += amount;
    }
    this.shoppingCart$.next(this.shoppingCartList);
  }

  removeProductFromCart(product: IProduct): void {
    this.shoppingCartList.forEach((listProduct, index) => {
      if (listProduct.id === product.id) {
          this.shoppingCartList.splice(index, 1);
          return false;
      }
  });
  }
}

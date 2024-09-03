import { Component, inject, Input, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@shared/services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export default class ProductDetailComponent {

  // constructor(
  //   private productService: ProductService
  // ){}

  productService = inject(ProductService);
  cartService = inject(CartService);

  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal('');

  ngOnInit(){
    if(this.id){
      this.productService.getDetail(this.id).subscribe(
        data => {
          console.log(data)
          this.product.set(data);
          if (data.images.length > 0){
            this.cover.set(data.images[0]);
          }
        },
        error => {
        }
      );
    }
  }

  changeCover(newImage: string){
    this.cover.set(newImage);
  }

  addToCart(){
    const product = this.product();
    if(product){
      this.cartService.addToCart(product);
    }
  }
}

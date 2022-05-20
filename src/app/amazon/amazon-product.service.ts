import { Injectable } from '@angular/core';
import { Link, Visibility } from '../links/link';
import PRODUCT_IDS from './data/product_ids.json';

@Injectable({
  providedIn: 'root'
})
export class AmazonProductService {

  constructor() { }

  getAmazonUrl(productId: string): string {
    return `https://www.amazon.com/dp/${productId}`;
  }

  getLinks(): Link[] {
    return PRODUCT_IDS.map(x => {
      return {
        url: this.getAmazonUrl(x),
        visibility: Visibility.PUBLIC,
        tags: ["amazon"]
      };
    });
  }
}

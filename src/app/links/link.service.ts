import { Injectable } from '@angular/core';
import { Link, Visibility } from './link';
import LINKS from './data/links.json';
import { AmazonProductService } from '../amazon/amazon-product.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(
    private amazonProductService: AmazonProductService,
    private http: HttpClient
  ) { }

  getLinks(): Link[] {
    return [...LINKS, ...this.amazonProductService.getLinks()];
  }

  getLinkById(id: string): Link | undefined {
    return this.getLinks().find(x => x.id === id);
  }

  getLinksByTag(tag: string): Link[] {
    return this.getLinks().filter(x => x.tags?.includes(tag.toLowerCase()));
  }

  getPublicLinks(): Link[] {
    return this.getLinks().filter(x => x.visibility === Visibility.PUBLIC);
  }

  async getRandomWikiLink(): Promise<Link> {
    const response: any = await firstValueFrom(this.http.get('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&origin=*'));
    return {
      url: `https://en.wikipedia.org/?curid=${Object.keys(response.query.pages)[0]}`,
      visibility: Visibility.PUBLIC
    };
  }
}

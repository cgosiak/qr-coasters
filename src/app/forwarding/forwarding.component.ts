import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Link } from '../links/link';
import { LinkService } from '../links/link.service';
import { Action } from './action';

@Component({
  selector: 'app-forwarding',
  templateUrl: './forwarding.component.html',
  styleUrls: ['./forwarding.component.scss']
})
export class ForwardingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private linkService: LinkService
  ) { }

  async ngOnInit() {
    const action: Action = this.route.snapshot.paramMap.get('action') as Action;

    let link: Link | undefined;
    let links: Link[];
    switch (action) {
      case Action.STATIC:
        const id: string = this.route.snapshot.paramMap.get('data') as string;
        link = this.linkService.getLinkById(id);
        break;
      case Action.TAG:
        const tag: string = this.route.snapshot.paramMap.get('data') as string;
        links = this.linkService.getLinksByTag(tag);
        link = links[Math.floor(Math.random() * links.length)];
        break;
      case Action.WIKI:
          link = await this.linkService.getRandomWikiLink();
          break;
      case Action.RANDOM:
      default:
        links = this.linkService.getPublicLinks();
        link = links[Math.floor(Math.random() * links.length)];
        break;
    }
    if (link && link.url) {
      window.location.href = link.url;
    }
  }

}

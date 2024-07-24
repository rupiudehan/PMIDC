import { Component, OnInit } from '@angular/core';
import {topcard,topcards} from './top-cards-data';
import { TopcardService } from './top-cards.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards:topcard[];

 
  constructor(private topcardService: TopcardService) { this.topcards=topcards;}

  ngOnInit(): void {
    this.fetchTopcardsData();
  }

  fetchTopcardsData(): void {
    this.topcardService.getTopcardsData().subscribe(
      data => {
        this.topcards = this.topcards.map((card, index) => ({
          ...card,
          title: data[index]?.title || card.title
        }));
      },
      error => {
        console.error('Error fetching topcards data', error);
      }
    );
  }

}

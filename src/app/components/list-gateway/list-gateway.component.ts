import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlecardService } from '../../services/titlecard.service';

const TITLE_CARD_LIST = 'List gateway'
@Component({
  selector: 'app-list-gateway',
  standalone: true,
  imports: [CommonModule],
  providers:[],
  templateUrl: './list-gateway.component.html',
  styleUrls: ['./list-gateway.component.scss']
})
export class ListGatewayComponent implements OnInit {

  constructor(private titleCardService: TitlecardService) { 
    this.titleCardService.setTitleCard(TITLE_CARD_LIST);
  }

  ngOnInit(): void {
    this.titleCardService.setTitleCard(TITLE_CARD_LIST);
  }

}

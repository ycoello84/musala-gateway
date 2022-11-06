import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlecardService } from 'src/app/services/titlecard.service';

@Component({
  selector: 'app-text-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-card.component.html',
  styleUrls: ['./text-card.component.scss']
})
export class TextCardComponent implements OnInit {

  constructor(public titlecardService: TitlecardService) { }

  ngOnInit(): void {
  }

}

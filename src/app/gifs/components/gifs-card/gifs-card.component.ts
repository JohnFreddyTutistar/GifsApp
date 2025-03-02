import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
  styleUrls: ['./gifs-card.component.scss']
})
export class GifsCardComponent implements OnInit {

  @Input() public gif!: Gif;

  constructor() { }

  ngOnInit(): void {
    if(!this.gif) throw new Error('Git property is required')
  }

}

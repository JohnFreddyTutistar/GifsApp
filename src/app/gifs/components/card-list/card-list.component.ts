import { Component, Input, OnInit } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
    selector: 'gifs-card-list',
    templateUrl: './card-list.component.html',
    styleUrls: ['./card-list.component.scss']
})

export class CardListComponent implements OnInit {

    @Input() gifs: Gif[] = [];

    constructor() { }

    ngOnInit() { }
}
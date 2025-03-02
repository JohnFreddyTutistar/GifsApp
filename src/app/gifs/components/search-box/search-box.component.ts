import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
    selector: 'search-box',
    templateUrl: './search-box.component.html'
})

export class SearchBoxComponent implements OnInit {

    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>

    constructor(private gifsService: GifsService) { }

    searchTag() {
        const newTag = this.tagInput.nativeElement.value;
        this.gifsService.searchTag(newTag);

        this.tagInput.nativeElement.value = '';
    }


    ngOnInit() { }
}
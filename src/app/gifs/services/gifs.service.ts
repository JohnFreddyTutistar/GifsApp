import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

    gifsList : Gif[] = []

    private apiKey: string = '8lqWiR71STWoLbbi9c5xHEaQWsUH1zOI';

    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

    private _tagHistory:string[] = [];

    constructor(private http: HttpClient) { 
        this.loadLocalStorage();
    }

    get tagsHistory() {
        return [...this._tagHistory]
    } 

    private organizeHistory(tag: string){
        tag = tag.toLowerCase();

        if(this._tagHistory.includes(tag)){
            this._tagHistory = this._tagHistory.filter(oldTag => oldTag !== tag)
        }

        this._tagHistory.unshift( tag );
        this._tagHistory = this.tagsHistory.splice(0,10);
        this.saveLocalStorage(); 
    }

    // Funcion para buscar 
    public searchTag( tag:string ):void{
        if(tag.length === 0) return

        this.organizeHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '20')
            .set('q', tag)

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
            .subscribe(res => {
                this.gifsList = res.data;
                console.log({gifs: this.gifsList});
            })
            
    }
    private saveLocalStorage():void{
        localStorage.setItem('history', JSON.stringify(this._tagHistory));
    }

    private loadLocalStorage():void {
        if(!localStorage.getItem('history')) return

        this._tagHistory = JSON.parse(localStorage.getItem('history')!);

        if(this._tagHistory.length === 0) return;   
        this.searchTag(this._tagHistory[0]);
    }

    // Funcion para limpiar el historial
    public cleanHistory():void{
        if((this.gifsList = []) && (this._tagHistory = [])){
            this._tagHistory = JSON.parse(localStorage.clear()!)
        };
    }
}
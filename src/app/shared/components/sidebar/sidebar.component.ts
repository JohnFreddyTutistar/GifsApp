import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private gifsService: GifsService) { 

  }

  get tags() {
    return this.gifsService.tagsHistory
  }

  searchTagInHistory(tag: string) {
    this.gifsService.searchTag(tag);
  }

  clearHistory(){
    Swal.fire({
      title: "Estas seguro?",
      text: "Seguro que deseas eliminar todo el historial!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Borrado!",
          text: "Tu historial ha sido borrado.",
          icon: "success"
        });
        this.gifsService.cleanHistory();
      }
    });
  }



  ngOnInit(): void {
  }

}

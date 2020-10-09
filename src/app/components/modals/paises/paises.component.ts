import { Component, OnInit } from '@angular/core';
import { Pais, Ciudad } from '../../../interfaces/interfaces';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss'],
})
export class PaisesComponent implements OnInit {

  paises: Pais[];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getPaises().subscribe( resp => {
      this.paises = resp;
    });
  }

  iconDetail(pais: Pais){
    if (pais.expanded){
      return 'chevron-down-outline';
    } else{
      return 'chevron-forward-outline';
    }
  }

  lines(pais: Pais){
    if (pais.expanded){
      return 'none';
    } else{
      return 'inset';
    }
  }

  seleccionaCiudad(ciudad: Ciudad){

  }

  onClickPais(pais: Pais) {
    if (pais.expanded) {
      pais.expanded = false;
    } else {
      this.paises.forEach(listItem => {
        if (pais === listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}

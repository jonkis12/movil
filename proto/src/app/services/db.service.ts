
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Scaneo } from './scaneo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private storage: Storage) {
    this.init();
   }

    async init() {
      await this.storage.create();
    }
  
    async agregarConKey(key: string, valor: string)
    {
      await this.storage.set(key, valor);
    }

    async agregar(valor:string)
    {
      let id = await this.storage.length() + 1 ;
      await this.storage.set(id.toString(), valor);
    }

    async rescatar(key:string){
      return await this.storage.get(key);
    }

    listar(){
      let listado = []
      this.storage.forEach((v,k) => {listado.push(v); })
      return listado;
    }
    eliminar(key:string)
    {}

}
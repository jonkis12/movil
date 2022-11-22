
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Scaneo } from './scaneo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  scaneosList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'positronx_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }
  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchScaneos(): Observable<Scaneo[]> {
    return this.scaneosList.asObservable();
  }
    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/datos.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getScaneo();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  // Get list
  getScaneo(){
    return this.storage.executeSql('SELECT * FROM SCANEO', []).then(res => {
      let items: Scaneo[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({
            id: res.rows.item(i).id,
            datos: res.rows.item(i).datos,
            fecha: res.rows.item(i).fecha,
          });
        }
      }
      this.scaneosList.next(items);
    });
  }
  // Add
  addScaneo(dato, fecha) {
    let data = [dato, fecha];
    return this.storage.executeSql('INSERT INTO SCANEO (dato, fecha) VALUES (?, ?)', data)
    .then(res => {
      this.getScaneo();
    });
  }
 
 // Get single object
  getScaneos(id): Promise<Scaneo> {
    return this.storage.executeSql('SELECT * FROM SCANEO WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        datos: res.rows.item(0).datos,  
        fecha: res.rows.item(0).fecha,
      }
    });
  }
  // Update
  updateScaneo(id, scaneo: Scaneo) {
    let data = [scaneo.datos, scaneo.fecha];
    return this.storage.executeSql(`UPDATE SCANEO SET artist_name = ?, song_name = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getScaneo();
    })
  }
  getSongs() {
    throw new Error('Method not implemented.');
  }
  // Delete
  deleteScaneo(id) {
    return this.storage.executeSql('DELETE FROM SCANEO WHERE id = ?', [id])
    .then(_ => {
      this.getScaneo();
    });
  }
}
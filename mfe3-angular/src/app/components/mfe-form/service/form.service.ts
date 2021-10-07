import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FormService {
    constructor(private http: HttpClient){}

    public obtener(){
        return this.http.get('https://jsonplaceholder.typicode.com/posts');
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GolfApiService
{
    private baseUrl = 'https://golf-courses-api.herokuapp.com/';

    constructor(private http: HttpClient) { }

    getCourses(): Observable<any[]>
    {
        return this.http.get<any[]>(this.baseUrl + "courses");
    }

    getCourse(id: string): Observable<any[]>
    {
        return this.http.get<any[]>(this.baseUrl + "courses/" + id);
    }
}

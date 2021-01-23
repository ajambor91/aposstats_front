import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";
import { Config } from "src/config/config";
import { RequestQueryHelper } from "../helpers/request-query.helper";
import { City } from "../models/administration-units/city.model"
import { Voivodeship } from "../models/administration-units/voivodeship.model";
import { Apostasy } from "../models/apostasy/apostasy.model";
import { Request } from "../models/request/request.model";
import { Statistics } from "../models/statisctics/statistic.model";

@Injectable()
export class MainService{

    private readonly config = Config;

    constructor(private http: HttpClient){}

    getVoivodeships(): Observable<Voivodeship[]> {
        return this.http.get<Voivodeship[]>(`${this.config.api}/get-available-voivodeships`);
    }

    getCities(voivodeshipId: number): Observable<City[]> {
        return this.http.get<City[]>(`${this.config.api}/get-available-cities?voivodeshipId=${voivodeshipId}`);
    }

    getApostasies(request: Request): Observable<Apostasy[]> {
        return this.http.get<Apostasy[]>(`${this.config.api}/${RequestQueryHelper.createQuery(request)}`);
    }

    getStatistics(request: Request): Observable<Statistics[]> {
        return this.http.get<Statistics[]>(`${this.config.api}/get-statistics/${RequestQueryHelper.createQuery(request)}`);
    }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Config } from "src/config/config";
import { RequestQueryHelper } from "../helpers/request-query.helper";
import { Apostasy } from "../models/apostasy/apostasy.model";
import { Request } from "../models/request/request.model";

@Injectable()
export class MainService{

    private readonly config = Config;

    constructor(private http: HttpClient){}

    getApostasies(request: Request): Observable<Apostasy> {
        return this.http.get<Apostasy>(`${this.config.api}/${RequestQueryHelper.createQuery(request)}`);
    }
}
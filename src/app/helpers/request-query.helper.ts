import { Request } from "../models/request/request.model";

export class RequestQueryHelper{

    static createQuery(request: Request): string {
        let query = '?';
        if(this.checkIsNotEmpty(request?.cityId)) {
            query = this.addAmpersand(query);
            query += `cityId=${request.cityId}`;
        }

        if(this.checkIsNotEmpty(request?.voivodeshipId)) {
            query = this.addAmpersand(query);
            query += `voivodeshipId=${request.voivodeshipId}`;
        }

        if(this.checkIsNotEmpty(request?.from)) {
            query = this.addAmpersand(query);
            query += `from=${request.from}`;
        }

        if(this.checkIsNotEmpty(request?.to)) {
            query = this.addAmpersand(query);
            query += `to=${request.to}`;
        }

        if (this.checkIsNotEmpty(request?.periodType)) {
            console.log(request.periodType,'period')
            query = this.addAmpersand(query);
            query += `periodBy=${request.periodType}`;
        }
        return query;
    }

    private static checkIsNotEmpty(value: any): boolean {
        if (value != null && value !== '') {
            return true;
        }
        return false;
    }

    private static addAmpersand(query: string): string {
        if(query === '?'){
            return query;
        }
        return query += '&';
        
    }
}
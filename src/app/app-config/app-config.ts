import { Injectable } from "@angular/core";
import { MainService } from "../services/main-service";

@Injectable()
export class AppConfig{
    config: {[key: string]: any} = {};
    constructor(private configService: MainService){}
    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.configService.getConfig().subscribe(res => {
                this.config = res;
                resolve(true);
            });
        });
    }
}
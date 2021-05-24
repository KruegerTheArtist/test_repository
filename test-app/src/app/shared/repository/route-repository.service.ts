import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Config } from "../models/config.model";
import { Response } from "../models/response.model";
import { Route } from "../models/route.model";

@Injectable({providedIn: 'root'})
export class RouteRepositoryService {
    
    constructor(private http: HttpClient) { }

    public async getRoutesCollection(): Promise<Response> {
        const settings = await this.getSettings();
        let result = await this.http.get<Response>(settings.apiUrl + 'routes').toPromise();
        return result;
    }

    public async createRoute(route: Route): Promise<Response> {
        const settings = await this.getSettings();
        let result = await this.http.post<Response>(settings.apiUrl + 'routes', route).toPromise();
        return result;
    }

    public async updateRoute(uuid: string, route: Route): Promise<Response> {
        const settings = await this.getSettings();
        let result = await this.http.put<Response>(settings.apiUrl + 'routes/' + uuid, route).toPromise();
        return result;
    }

    public async deleteRoute(uuid: string): Promise<Response> {
        const settings = await this.getSettings();
        let result = await this.http.delete<Response>(settings.apiUrl + 'routes/' + uuid).toPromise();
        return result;
    }

    private async getSettings(): Promise<Config> {
        return this.http.get<Config>("./assets/settings.json").toPromise();

    }
}
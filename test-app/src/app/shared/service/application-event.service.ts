import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Route } from '../models/route.model';

@Injectable({ providedIn: 'root' })
export class ApplicationEventService {

    constructor() { }

    private routeCreateSubject = new Subject<Route>();
    sendRouteCreateEvent(route: Route) {
        this.routeCreateSubject.next(route);
    }

    listenRouteCreateEvent(): Observable<Route> {
        return this.routeCreateSubject.asObservable();
    }

    private routeChangeSubject = new Subject<Route>();
    sendRouteChangeEvent(route: Route) {
        this.routeChangeSubject.next(route);
    }

    listenRouteChangeEvent(): Observable<Route> {
        return this.routeChangeSubject.asObservable();
    }

    private routeDeleteSubject = new Subject<string>();
    sendRouteDeleteEvent(uuid: string) {
        this.routeDeleteSubject.next(uuid);
    }

    listenRouteDeleteEvent(): Observable<string> {
        return this.routeDeleteSubject.asObservable();
    }

    private errorSubject = new Subject<any>();
    sendErrorEvent(error: any) {
        this.errorSubject.next(error);
    }

    listenErrorEvent(): Observable<any> {
        return this.errorSubject.asObservable();
    }
}
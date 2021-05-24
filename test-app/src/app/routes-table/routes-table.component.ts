import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SortType, SortByProperty } from '../shared/enum/sort-type.enum';
import { Route } from '../shared/models/route.model';
import { RouteRepositoryService } from '../shared/repository/route-repository.service';
import { ApplicationEventService } from '../shared/service/application-event.service';
import { RouteEditorDialogComponent } from './route-editor-dialog/route-editor-dialog.component';

@Component({
  selector: 'app-routes-table',
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.scss']
})
export class RoutesTableComponent implements OnInit, OnDestroy {
  selectedElement: Route;
  sortedBy = { sortBy: SortByProperty.gateway, sortType: SortType.asc };
  SortByProperty = SortByProperty;
  SortType = SortType;
  routes: Route[] = [];
  subs: Subscription[] = [];
  subDelete: Subscription;

  constructor(private routeRepository: RouteRepositoryService,
    private eventService: ApplicationEventService,
    public dialog: MatDialog) { }

  async ngOnInit() {
    let result = await this.routeRepository.getRoutesCollection();
    this.subs.push(this.eventService.listenRouteCreateEvent().subscribe(route => {
      if (this.routes.findIndex(r => r.uuid === route.uuid) === -1) {
        this.routes.push(route);
      }
    }));
    this.subDelete = this.eventService.listenRouteDeleteEvent().subscribe(uuid => this.deleteRoute(uuid));
    this.subs.push(this.eventService.listenRouteChangeEvent().subscribe(route => this.updateRoute(route)));
    this.routes = result.payload.routes;
    if (result && result.payload.routes.length > 1) {
      this.sortBy(this.sortedBy.sortBy);
    }
  }

  sortBy(property: SortByProperty) {
    switch (property) {
      case SortByProperty.gateway:
        if (this.sortedBy.sortType === SortType.asc) {
          this.routes.sort((a, b) => {
            return a.gateway > b.gateway ? 1 : a.gateway < b.gateway ? -1 : 0;
          });
          this.sortedBy.sortType = SortType.desc;
        } else {
          this.routes.sort((a, b) => {
            return a.gateway > b.gateway ? -1 : a.gateway < b.gateway ? 1 : 0;
          });
          this.sortedBy.sortType = SortType.asc;
        }
        this.sortedBy.sortBy = SortByProperty.gateway;

        break;
      case SortByProperty.address:
        if (this.sortedBy.sortType === SortType.asc) {
          this.routes.sort((a, b) => {
            return a.address > b.address ? 1 : a.address < b.address ? -1 : 0;
          });
          this.sortedBy.sortType = SortType.desc;
        } else {
          this.routes.sort((a, b) => {
            return a.address > b.address ? -1 : a.address < b.address ? 1 : 0;
          });
          this.sortedBy.sortType = SortType.asc;
        }
        this.sortedBy.sortBy = SortByProperty.address;
        break;
      case SortByProperty.interface:
        if (this.sortedBy.sortType === SortType.asc) {
          this.routes.sort((a, b) => {
            return a.interface > b.interface ? 1 : a.interface < b.interface ? -1 : 0;
          });
          this.sortedBy.sortType = SortType.desc;
        } else {
          this.routes.sort((a, b) => {
            return a.interface > b.interface ? -1 : a.interface < b.interface ? 1 : 0;
          });
          this.sortedBy.sortType = SortType.asc;
        }
        this.sortedBy.sortBy = SortByProperty.interface;
        break;

      default:
        break;
    }
  }

  openEditWindow(route: any) {
    this.dialog.open(RouteEditorDialogComponent, { data: route });
  }

  openEditWindowCommand() {
    this.dialog.open(RouteEditorDialogComponent, { data: this.selectedElement });
  }

  deleteRoute(uuid: string) {
    let findIndex = this.routes.findIndex(r => r.uuid === uuid);
    if (findIndex !== -1) {
      this.routes.splice(findIndex, 1);
    }
  }

  deleteRouteCommand() {
    this.routeRepository.deleteRoute(this.selectedElement.uuid).then(response => {
      if (response.successful) {
        this.eventService.sendRouteDeleteEvent(response.payload.uuid);
      }
    });
  }

  updateRoute(route: Route) {
    let findIndex = this.routes.findIndex(r => r.uuid === route.uuid);
    if (findIndex !== -1) {
      this.routes[findIndex].address = route.address;
      this.routes[findIndex].mask = route.mask;
      this.routes[findIndex].gateway = route.gateway;
      this.routes[findIndex].interface = route.interface;
    }
  }

  isWhole(index: number) {
    return index % 2 === 0;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}

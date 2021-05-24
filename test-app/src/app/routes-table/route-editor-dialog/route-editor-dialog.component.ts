import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Route } from 'src/app/shared/models/route.model';
import { RouteRepositoryService } from 'src/app/shared/repository/route-repository.service';
import { ApplicationEventService } from 'src/app/shared/service/application-event.service';

@Component({
  selector: 'app-route-editor-dialog',
  templateUrl: './route-editor-dialog.component.html',
  styleUrls: ['./route-editor-dialog.component.scss']
})
export class RouteEditorDialogComponent implements OnInit {

  ipv4RegExp = '^(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])){3}$';
  ipValidators = [Validators.pattern(this.ipv4RegExp), Validators.minLength(7), Validators.maxLength(15), Validators.required];
  address = this.fb.control(null, this.ipValidators);
  mask = this.fb.control(null, this.ipValidators);
  gateway = this.fb.control(null, this.ipValidators);
  interface = this.fb.control(null, Validators.required);

  model = this.fb.group({
    address: this.address,
    mask: this.mask,
    gateway: this.gateway,
    interface: this.interface,
  })

  constructor(public dialogRef: MatDialogRef<RouteEditorDialogComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Route,
    private routeRepository: RouteRepositoryService,
    private eventService: ApplicationEventService) { }

  ngOnInit(): void {

    this.setControls(this.data);

  }

  setControls(route: Route) {
    if (route) {
      this.address.setValue(route.address);
      this.mask.setValue(route.mask);
      this.gateway.setValue(route.gateway);
      this.interface.setValue(route.interface);
    }
  }

  deleteRoute() {
    this.routeRepository.deleteRoute(this.data.uuid).then(response => {
      if (response.successful) {
        this.eventService.sendRouteChangeEvent(new Route({ uuid: response.payload.uuid, }));
      }
    });
  }

  updateRoute() {
    this.routeRepository.updateRoute(this.data.uuid, this.model.value).then(response => {
      if (response.successful) {
        this.eventService.sendRouteChangeEvent(new Route({
          uuid: response.payload.uuid,
          gateway: this.gateway.value,
          mask: this.mask.value,
          address: this.address.value,
          interface: this.interface.value
        }));
      } else {
        this.eventService.sendErrorEvent(response);
      }
    });
  }

}

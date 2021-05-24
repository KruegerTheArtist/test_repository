import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route } from '../shared/models/route.model';
import { RouteRepositoryService } from '../shared/repository/route-repository.service';
import { ApplicationEventService } from '../shared/service/application-event.service';

@Component({
  selector: 'app-route-create-form',
  templateUrl: './route-create-form.component.html',
  styleUrls: ['./route-create-form.component.scss']
})
export class RouteCreateFormComponent implements OnInit {

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

  constructor(public fb: FormBuilder,
    private eventService: ApplicationEventService,
    private routeRepository: RouteRepositoryService) { }

  ngOnInit(): void {

  }

  createRoute() {
    this.routeRepository.createRoute(this.model.value).then(response => {
      if (response.successful) {
        this.eventService.sendRouteCreateEvent(new Route({
          uuid: response.payload.uuid,
          address: this.address.value,
          mask: this.mask.value,
          gateway: this.gateway.value,
          interface: this.interface.value
        }));
      } else {
        this.eventService.sendErrorEvent(response);
      }
    });
  }

}

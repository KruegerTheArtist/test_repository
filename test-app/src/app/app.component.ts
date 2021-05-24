import { Component, OnInit } from '@angular/core';
import { RouteRepositoryService } from './shared/repository/route-repository.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test-app';
  constructor(private routeRepository: RouteRepositoryService) {

  }

  async ngOnInit() {
    await this.routeRepository.getRoutesCollection();
  }
}

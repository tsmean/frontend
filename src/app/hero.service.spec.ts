import { TestBed, inject } from '@angular/core/testing';

import {ResourceService} from './resource.service';
import { HeroService } from './hero.service';
import {HttpModule} from '@angular/http';
import {UtilsService} from './utils.service';

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UtilsService,
        ResourceService,
        HeroService,
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));
});

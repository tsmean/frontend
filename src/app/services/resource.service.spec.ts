import { TestBed, inject } from '@angular/core/testing';

import { ResourceService } from './resource.service';
import {HttpModule} from '@angular/http';
import {UtilsService} from './utils.service';

describe('ResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResourceService,
        UtilsService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([ResourceService], (service: ResourceService) => {
    expect(service).toBeTruthy();
  }));
});

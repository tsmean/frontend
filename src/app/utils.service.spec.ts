import { TestBed, inject } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService]
    });
  });

  it('should ...', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
    expect(service.urlJoin('http://example.com', 'a')).toEqual('http://example.com/a');
    expect(service.urlJoin('http://example.com/', '/a')).toEqual('http://example.com/a');
    expect(service.urlJoin('/', '/blabla')).toEqual('/blabla');
    expect(service.urlJoin('/root/', '/blabla')).toEqual('/root/blabla');
    expect(service.urlJoin('/root/beer', '/blabla')).toEqual('/root/beer/blabla');
  }));

});

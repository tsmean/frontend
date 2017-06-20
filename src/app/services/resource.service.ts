import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {UtilsService} from './utils.service';
import {environment} from '../../environments/environment';
import {Resource} from '../models/resource';

@Injectable()
export class ResourceService {

  // A store for resources
  private resourceStore = {

    // contains data of the following format:
    // [resourceName][resourceId]

  };

  private resourcesUrl(resourceName: ResourceName) {
    return this.utils.urlJoin(environment.api, resourceName);
  };  // URL to web api

  constructor(
    private http: Http,
    private utils: UtilsService
  ) { }

  getResources(resourceName: ResourceName): Promise<Resource[]> {
    return this.http.get(this.resourcesUrl(resourceName))
      .map(resp => resp.json().data)
      .toPromise()
      .catch(this.handleError);
  }

  getResource(resourceId: string, resourceName: ResourceName): Promise<Resource> {
    return this.http.get(this.utils.urlJoin(this.resourcesUrl(resourceName), resourceId))
      .map(resp => resp.json().data)
      .toPromise()
      .catch(this.handleError);
  }


  createResource(newResource: Resource, resourceName: ResourceName): Promise<Resource> {
    return this.http.post(this.resourcesUrl(resourceName), newResource)
      .map(resp => resp.json().data)
      .toPromise()
      .catch(this.handleError);
  }

  updateResource(resource: Resource, resourceName: ResourceName): Promise<Resource> {
    return this.http.put(this.resourcesUrl(resourceName), resource)
      .map(resp => resp.json().data)
      .toPromise()
      .catch(this.handleError);
  }

  deleteResource(resourceId: string, resourceName: ResourceName): Promise<Object> {
    return this.http.delete(this.utils.urlJoin(this.resourcesUrl(resourceName), resourceId))
        .toPromise()
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

export type ResourceName = 'heroes';

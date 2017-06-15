# TsmeanFe

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
By default, the app makes use of a REST-API provided by http://demo.tsmean.com:4242. Note that other
 apps might use the same REST-API, so don't expect your data to be persistent! You
can change this in the `environment.ts` and `environment.prod.ts` files, for example use
`localhost:3000` to connect to your own backend.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

# Deployment

I have configured a small `deploy.sh` script.
That way you should be able to deploy on any remote (ubuntu) instance easily.
Just change the `server` variable in the script
and run
`./deploy.sh` or `./deploy.sh test` for a dry run on a different server / port
than your usual production setup. Using this deploy script,
the frontend is powered by the `server.js` script
while consuming a REST-API from a remote location. It's also bundled for
production.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

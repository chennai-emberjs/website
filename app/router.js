import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('schedule');
  this.route('location');
  this.route('about');
  this.route('sponsors');
  this.route('faq');
  this.route('code-of-conduct');
});

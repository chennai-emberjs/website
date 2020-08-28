import Application from 'chennai-ember-website/app';
import config from 'chennai-ember-website/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();

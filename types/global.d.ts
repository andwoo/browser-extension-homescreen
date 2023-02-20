// Types for compiled templates
declare module 'ember-quickstart/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}

import 'ember-concurrency-async';
import 'ember-concurrency-ts/async';

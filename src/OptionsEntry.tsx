import '../scss/options.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ReduxOptionsProvider from './redux/ReduxOptionsProvider';

ReactDOM.render(<ReduxOptionsProvider />, document.getElementById('app'));

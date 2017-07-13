import React from 'react';
import ReactDOM from 'react-dom';
import './css/normalize.css';
import AppHeader from './componets/AppHeader.js';
import AppBody from './componets/AppBody.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div>
                  <AppHeader />
                  <AppBody/>
                </div>, document.getElementById('root'));
registerServiceWorker();

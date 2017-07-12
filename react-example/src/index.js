import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function tick() {
    const element = (
    <div>
      <h1>Hello World!</h1>
      <h2>It is { new Date().toLocaleTimeString() }</h2>
    </div>
    );
    ReactDOM.render(<div>
                      <App/>
                      { element }
                    </div>, document.getElementById('root'));
}
setInterval(tick, 1000);



registerServiceWorker();


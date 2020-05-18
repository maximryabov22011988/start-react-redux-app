import React from 'react';
import ReactDOM from 'react-dom';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import Root from 'layouts/Root';

ReactDOM.render(<Root />, document.getElementById('root'));

// Включает внесение изменений без перезагрузки страницы
module.hot.accept();

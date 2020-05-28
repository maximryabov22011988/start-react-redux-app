import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'layouts/Root';

ReactDOM.render(<Root />, document.getElementById('root'));

// Включает внесение изменений без перезагрузки страницы
module.hot.accept();

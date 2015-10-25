import 'babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import ThermoContent from '../../shared/view/ThermoContent';
import $ from 'jquery';

$(document).ready(
    () => ReactDOM.render(
        (<ThermoContent />),
        document.getElementById('thermostat')
    )
);
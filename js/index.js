$ = jQuery = require('jquery');
var React = require('react');
var bootstrap = require('bootstrap');
var websocket = require('websocket');

var Hackaton = require('./components/Hackaton');

React.render(
    <Hackaton />,
    document.getElementById('hackaton')
);
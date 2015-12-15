var React = require('react');
var websocket = require('websocket').client;
var signalR = require('signalr-client');

console.log(require('websocket'));


var HackatonActions = require('../actions/HackatonActions');
var TwitterTorrentItem = require('./TwitterTorrentItem');
var HackatonStore = require('../stores/HackatonStore');

var {
    PropTypes
    } = React;

function getDatas () {
    return  {
        allStatuses: HackatonStore.getAllTwitterStatuses(),
        allKeywords: HackatonStore.getAllKeywords(),
        lastAddKeyword: HackatonStore.getLastAddedKeyword()
    }
}

class TwitterTorrent extends React.Component {

    constructor (props) {
        super(props);
        this.state = Object.assign({}, {
            //ws : new signalR.client(this.props.url, ['twitter'], 10, true),
            ws : new WebSocket(this.props.url),
            debug: false
        }, getDatas());
    }

    log (logline) {
        if (this.props.debug === true) {
            console.log(logline);
        }
    }

    componentWillUnmount () {
        HackatonStore.removeServerChangeListener(this._onServerChange);
        HackatonStore.removeChangeListener(this._onChange);

        var ws = this.state.ws;
        ws.close();
    }

    componentDidMount () {
        HackatonStore.addServerChangeListener(this._onServerChange.bind(this));
        HackatonStore.addChangeListener(this._onChange.bind(this));
    }

    _onChange () {
        var lastKeyword = HackatonStore.getLastAddedKeyword().keyword;
        var ws = this.state.ws;

        ws.send(`keyword|${lastKeyword}`);

        //ws.invoke('twitter', 'addKeyword', lastKeyword);
    }

    _onServerChange () {
        this.setState({
            allStatuses: HackatonStore.getAllTwitterStatuses(),
            allKeywords: HackatonStore.getAllKeywords()
        });
    }

    componentWillMount () {

        var self = this;
        var ws = self.state.ws;

        ws.onopen = function(){
            self.log('Socket Status: '+ws.readyState+' (open)');
        };

        ws.onmessage = function(msg){
            self.log('Received: '+msg.data);
            HackatonActions.addTwitterStatus(msg.data);
        };

        ws.onclose = function(){
            self.log('Socket Status: '+ws.readyState+' (Closed)');
        };

        //ws.on('twitter', 'stream', (name, message) => {
        //    self.log('Received: ' + message);
        //    HackatonActions.addTwitterStatus(message);
        //});

    }

    _start () {
        var ws = this.state.ws;
        ws.send('start');
        //ws.start();
    }

    _pause () {
        var ws = this.state.ws;
        ws.send('pause');
    }

    _stop () {
        var ws = this.state.ws;
        ws.close();
        //ws.end();
    }

    render () {

        var allStatuses = this.state.allStatuses;
        var allKeyword = this.state.allKeywords;
        var statuses = "";

        if(allStatuses) {
            statuses = Object.keys(allStatuses).reverse().map(function (item) {
                return <TwitterTorrentItem key={item} keywords={allKeyword} status={allStatuses[item]}></TwitterTorrentItem>;
            });
        }

        return (
            <div>
                <div className="clearfix twitter-control">
                    <div className="btn-group pull-right" role="group">
                        <span onClick={this._start.bind(this)} className="btn btn-default glyphicon glyphicon-play"></span>
                        <span onClick={this._pause.bind(this)} className="btn btn-default glyphicon glyphicon-pause"></span>
                        <span onClick={this._stop.bind(this)} className="btn btn-default glyphicon glyphicon-stop"></span>
                    </div>
                </div>
                <div className="row">
                    <ul className="list-group">
                        {statuses}
                    </ul>
                </div>
            </div>

        )
    }
}

TwitterTorrent.propTypes = {
    url: PropTypes.string.isRequired,
    debug: React.PropTypes.bool
};

module.exports = TwitterTorrent;
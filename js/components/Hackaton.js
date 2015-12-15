var React = require('react');

var HackatonStore = require('../stores/HackatonStore');
var KeywordInput = require('../components/KeywordInput');
var KeywordItem = require('../components/KeywordItem');
var TwitterTorrent = require('../components/TwitterTorrent');
var HackatonActions = require('../actions/HackatonActions');

function getHackatonState () {
    return {
        allKeywords: HackatonStore.getAllKeywords()
    }
}

class Hackaton extends React.Component{

    constructor (props) {
        super(props);
        this.state = getHackatonState();
    }

    componentDidMount () {
        HackatonStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount () {
        HackatonStore.removeChangeListener(this._onChange.bind(this));
    }

    render () {
        var allKeyword = this.state.allKeywords;

        return (
            <div className="row">
                <div className="keyword-container col-md-6">
                    <h4>Keywords</h4>
                    <KeywordInput placeholder="Insert keyword and hit enter" onSave={this._onSave.bind(this)}/>
                    <ul className="list-group">
                        {Object.keys(allKeyword).map(function (item) {
                            return <KeywordItem key={item} keyword={allKeyword[item]}></KeywordItem>;
                        })}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h4>Twitter Stream</h4>
                    <TwitterTorrent debug={true} url="ws://localhost:1337"/>
                </div>
            </div>
            );
    }

    _onSave  (keywordObj) {
        if(keywordObj.keyword.trim()) {
            HackatonActions.addKeyword(keywordObj);
        }
    }

    _onChange () {
        this.setState(getHackatonState());
    }

}

module.exports = Hackaton;

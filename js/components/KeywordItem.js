var React = require('react');
var HackatonActions = require('../actions/HackatonActions');

var {
    PropTypes
    } = React;

class KeywordItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: props.keyword || ''
        };
    }

    render () {
        var item = this.props.keyword;
        var style = {
            color: item.color
        };

        return (
            <li className="list-group-item"><span style={style}>{item.keyword}</span>
                <span className="pull-right glyphicon glyphicon-remove" onClick={this._removeOnClick.bind(this)}></span>
            </li>
        )
    }

    _removeOnClick () {
        HackatonActions.destroyKeyword(this.props.keyword.id);
    }
}

KeywordItem.propTypes = {
    keyword: PropTypes.object.isRequired
};


module.exports = KeywordItem;
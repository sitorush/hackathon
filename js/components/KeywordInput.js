var React = require('react');

var {
    PropTypes
} = React;

class KeywordInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: props.keyword || '',
            placeholder: props.placeholder
        };

        this.inputStyle = {
            //width: 200
        }
    }

    render () {

        return (
            <input
                placeholder={this.state.placeholder}
                value={this.state.keyword}
                onSave={this._onSave}
                style={this.inputStyle}
                onKeyDown={this._onKeyDown.bind(this)}
                onChange={this._onChange.bind(this)}/>
        )
    }

    _assignRandomColour () {
        //http://jsfiddle.net/xP5v8/
        var letters = '012345'.split('');
        var color = '#';
        color += letters[Math.round(Math.random() * 5)];
        letters = '0123456789ABCDEF'.split('');
        for (var i = 0; i < 5; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }

        return color;
    }

    _onKeyDown (event) {
        if(event.keyCode == 13) {
            this._save();
        }
    }

    _onChange (event) {
        this.setState({
            keyword: event.target.value
        });
    }

    _save () {
        this.props.onSave({
            keyword: this.state.keyword,
            color: this._assignRandomColour()
        });
        this.setState({
            keyword: ''
        })
    }
}

KeywordInput.propTypes = {
    keyword: PropTypes.string,
    placeholder: PropTypes.string,
    onSave: PropTypes.func.isRequired
};


module.exports = KeywordInput;
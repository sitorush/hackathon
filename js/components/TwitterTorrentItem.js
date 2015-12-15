var React = require('react');

var {
    PropTypes
    } = React;

class TwitterTorrentItem extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            status: props.status || {},
            keywords: props.keywords || {}
        };
    }

    componentWillMount () {
        var keywords = Object.keys(this.state.keywords);
        if(keywords.length == 0) return;

        keywords.forEach((id) => {
            var keyword = this.state.keywords[id].keyword;
            var color = this.state.keywords[id].color;
            var pattern = new RegExp("(" + keyword + ")", 'gi');
            this.state.status.text = this.state.status.text.replace(pattern, `<span style="color: ${color}">$1</span>`)
        });
    }

    parseText () {
        return {__html: this.state.status['text']}
    }

    render () {
        return (
            <li className="list-group-item" dangerouslySetInnerHTML={this.parseText()}></li>
        )
    }
}

TwitterTorrentItem.propTypes = {
    status: PropTypes.object.isRequired,
    keywords: PropTypes.object
};

module.exports = TwitterTorrentItem;
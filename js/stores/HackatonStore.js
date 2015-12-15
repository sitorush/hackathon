var HackatonDispatcher = require('../dispatcher/HackatonDispatcher');
var EventEmitter = require('events').EventEmitter;
var HackatonConstants = require('../constants/HackatonConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var SERVER_CHANGE_EVENT = 'server_change';

var _keywords = {};
var _twitterStatuses = {};
var _cacheLastAddedKeyword = null;

function createId () {
    return (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
}

function add (keywordObj) {
    var id = createId();
    _keywords[id] = {
        id: id,
        keyword: keywordObj.keyword,
        color: keywordObj.color
    };
    _cacheLastAddedKeyword = _keywords[id];
}

function addTwitterStatus (text) {
    var id = createId();
    _twitterStatuses[id] = {
        id: id,
        text: text
    };
}

function destroyKeyword (id) {
    delete _keywords[id];
}

var HackatonStore = assign({}, EventEmitter.prototype, {
    addChangeListener (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange () {
        this.emit(CHANGE_EVENT);
    },
    addServerChangeListener (callback) {
        this.on(SERVER_CHANGE_EVENT, callback);
    },
    removeServerChangeListener (callback) {
        this.removeListener(SERVER_CHANGE_EVENT, callback);
    },
    emitServerChange () {
        this.emit(SERVER_CHANGE_EVENT);
    },
    getLastAddedKeyword () {
        return _cacheLastAddedKeyword;
    },
    getAllKeywords () {

        return _keywords;
    },
    getAllTwitterStatuses () {
        return _twitterStatuses;
    }
});

HackatonDispatcher.register(function(action) {
    var text, status, keywordId;

    switch(action.actionType) {
        case HackatonConstants.HACKATON_ADD:
            text = action.keywordObj.keyword.trim();
            if (text !== '') {
                add(action.keywordObj);
                HackatonStore.emitChange();
            }
            break;

        case HackatonConstants.HACKATON_DESTROY_KEYWORD:
            keywordId = action.id.trim();
            if (keywordId !== '') {
                destroyKeyword(keywordId);
                HackatonStore.emitChange();
            }
            break;

        case HackatonConstants.TWITTER_STATUS_ADD:
            status = action.text.trim();
            if (status !== '') {
                addTwitterStatus(status);
                HackatonStore.emitServerChange();
            }
            break;

        default:
    }
});


module.exports = HackatonStore;

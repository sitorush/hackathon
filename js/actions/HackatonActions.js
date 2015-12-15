var HackatonDispatcher = require('../dispatcher/HackatonDispatcher');
var HackatonConstants = require('../constants/HackatonConstants');


HackatonActions = {
    addKeyword (keywordObj) {
        HackatonDispatcher.dispatch({
            actionType: HackatonConstants.HACKATON_ADD,
            keywordObj: keywordObj
        });
    },

    addTwitterStatus (status) {
        HackatonDispatcher.dispatch({
            actionType: HackatonConstants.TWITTER_STATUS_ADD,
            text: status
        });
    },

    destroyKeyword (id) {
        HackatonDispatcher.dispatch({
            actionType: HackatonConstants.HACKATON_DESTROY_KEYWORD,
            id: id
        });
    }
};

module.exports = HackatonActions;
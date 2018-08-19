import { NOTIFY_USER } from '../actions/index';

const initialState = {
    message: null,
    messageType: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case NOTIFY_USER:
            return {
                ...state, message: action.message, //settig what will come with action
                messageType: action.messageType
            }
        default:
            return state;
    }
}
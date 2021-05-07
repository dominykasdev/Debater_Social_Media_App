export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_COMMENT_FEED':
            return action.payload;
        case 'UPDATE_COMMENT':
            return state;
        case 'DELETE_COMMENT':
            return state;
        default:
            return state;
    }
}
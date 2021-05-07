export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_COMMENT_FEED':
            return action.payload;
        default:
            return state;
    }
}
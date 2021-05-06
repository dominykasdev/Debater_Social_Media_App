export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_POST_FEED':
            return action.payload;
        default:
            return state;
    }
}
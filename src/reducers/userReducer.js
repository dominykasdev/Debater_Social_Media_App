export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_USER_DATA':
            return { ...state, user: action.payload };
        default:
            return state;
    }
}
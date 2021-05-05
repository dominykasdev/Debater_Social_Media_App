export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_USER_DATA':
            // return { ...state, currentUserData: action.payload };
            return action.payload;
        default:
            return state;
    }
}
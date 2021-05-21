export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_USER_DATA':
            // return { ...state, currentUserData: action.payload };
            return action.payload;
        case 'REGISTER_USER':
            // return { ...state, currentUserData: action.payload };
            return action.payload;
        case 'LOGIN':
            // return { ...state, currentUserData: action.payload };
            return action.payload;
        case 'LOGOUT':
            // return { ...state, currentUserData: action.payload };
            return action.payload;
        default:
            return state;
    }
}
export default (state = {}, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { ...state, isSignedIn: true, userId: action.payload };
        case 'SIGN_OUT':
            return { ...state, isSignedIn: false };
        case 'LOGIN':
            return { ...state, isSignedIn: true, userId: action.payload };
        case 'LOGOUT':
            return { ...state, isSignedIn: false };
        default:
            return state;
    }
}
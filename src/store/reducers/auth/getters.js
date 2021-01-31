export function getIsAuth(state) {
    return !!state.auth.userId;
}

export function getUserId(state) {
    return state.auth.userId || 0;
}

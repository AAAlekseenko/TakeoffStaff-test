export default function checkToken() {
    const token = localStorage.getItem('accessToken');
    if (token) {
        return true
    } else {
        return false
    }
}

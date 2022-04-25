export default function auth(to, from, next) {
    console.log("a");
    // Verifico si el token existe o es diferente a null
    if (localStorage.getItem('auth')) {
        const auth = JSON.parse(localStorage.getItem('token'));
        if (auth.token && auth.token !== null) {
        return next();
        }
    }
    router.push('/login');
}
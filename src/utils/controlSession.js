export const userTypes = Object.freeze({
    CUPONERO: 'cuponero',
    VENDEDOR: 'vendedor'
})

export const checkIfUserIsLogged = () => {
    const host = window.location.host;
    const userData = localStorage.getItem('cuponeraToken') ?? null;
    if(userData){
        const { userType } = JSON.parse(userData);
        const location = userType == userTypes.CUPONERO ? '/cuponero/' : '/vendedor/';
        const basePath = `${host}${location}`;
        window.top.location = basePath;
    }
}
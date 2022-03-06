import Keycloak from 'keycloak-js';

const _kc =
	process.env.NODE_ENV === 'production'
		? new Keycloak('/keycloak_prod.json')
		: new Keycloak('/keycloak.json');

const initKC = (onAuthenticatedCallback) => {
	_kc
		.init({
			onLoad: 'check-sso',
			silentCheckSsoRedirectUri:
				window.location.origin + '/silent-check-sso.html',
			pkceMethod: 'S256',
		})
		.then((authenticated) => {
			if (!authenticated) {
				console.log('user is not authenticated..!');
			}
			onAuthenticatedCallback();
		})
		.catch(console.error);
};

const isLoggedIn = () => !!_kc.token;

const getToken = () => _kc.token;

const updateToken = (successCallback) =>
	_kc.updateToken(5).then(successCallback).catch(doLogin);

const doLogin = _kc.login;

const doLogout = _kc.logout;

const doRegister = _kc.register;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getFullName = () =>
	`${_kc.tokenParsed?.given_name} ${_kc.tokenParsed?.family_name}`;

const UserServices = {
	initKC,
	isLoggedIn,
	getToken,
	getFullName,
	doLogin,
	doRegister,
	doLogout,
	getUsername,
	updateToken,
	hasRole,
};

export default UserServices;

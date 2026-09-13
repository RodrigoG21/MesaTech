import { useMsal, useAccount } from '@azure/msal-react';
import { AUTH_ENABLED, MOCK_USER, loginRequest } from '../authConfig';

const MOCK_SESSION_KEY = 'mesatech_mock_session';

export function useAuth() {
  if (!AUTH_ENABLED) {
    let loggedIn = true;
    try { loggedIn = sessionStorage.getItem(MOCK_SESSION_KEY) !== 'out'; } catch {}

    return {
      user: loggedIn ? MOCK_USER : null,
      role: loggedIn ? MOCK_USER.role : null,
      isAuthenticated: loggedIn,
      login: () => { try { sessionStorage.removeItem(MOCK_SESSION_KEY); } catch {} window.location.href = '/'; },
      logout: () => { try { sessionStorage.setItem(MOCK_SESSION_KEY, 'out'); } catch {} window.location.href = '/login'; },
      getToken: async () => null,
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { instance, accounts } = useMsal();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const account = useAccount(accounts[0] || {});
  const isAuthenticated = accounts.length > 0;

  const claims = account?.idTokenClaims || {};
  const roles = claims.roles || [];
  const role = roles[0] || null;

  const user = isAuthenticated
    ? {
        name: claims.name || account?.name || '',
        email: claims.preferred_username || claims.email || '',
        role,
      }
    : null;

  const login = () => instance.loginRedirect(loginRequest);
  const logout = () => instance.logoutRedirect();

  const getToken = async () => {
    if (!account) return null;
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account,
    });
    return response.accessToken;
  };

  return { user, role, isAuthenticated, login, logout, getToken };
}

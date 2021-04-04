import { reloadAuthorized } from './Authorized';
import { getPageQuery, isEmptyString } from '@/utils/utils';
import { history } from '@@/core/history';
import { stringify } from 'querystring';

const authorityKey = 'aojiaoo_authority_key';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem(authorityKey) : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  // if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
  //   return ['admin'];
  // }
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem(authorityKey, JSON.stringify(proAuthority));
  // auto reload 设置到current
  reloadAuthorized();
}

export function removeAuthority(): void {
  localStorage.removeItem(authorityKey);
  // auto reload 设置到current
  reloadAuthorized();
}

export function isLogin(): boolean {
  return !isEmptyString(localStorage.getItem(authorityKey) as string);
}

export function getLoginPage(): void {
  const { redirect } = getPageQuery();
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: window.location.href,
      }),
    });
  }
}

export function checkLogin(): void {
  if (!isLogin()) {
    getLoginPage();
  }
}

export function logout(): void {
  removeAuthority();
  getLoginPage();
}

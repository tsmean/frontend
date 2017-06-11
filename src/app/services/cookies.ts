export namespace appCookies {

  const defaultExpiryDays = 365;

  export function setCookie(cname: string, cvalue: string, daysUntilExpiry?: number): void {
    const d = new Date();
    const exdays = daysUntilExpiry || defaultExpiryDays;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';';
  }

  export function setUserCookie(cvalue: string, daysUntilExpiry?: number) {
    setCookie('username', cvalue, daysUntilExpiry);
  }

  export function getCookie(cname: string): string {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  export function getUserCookie(): string {
    return getCookie('username');
  }

  export function userCookiePresent(): boolean {
    return getCookie('username') !== '';
  }

}

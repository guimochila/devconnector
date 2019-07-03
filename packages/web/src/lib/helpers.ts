export function getCookie(name: string) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName] = cookie.split('=');
    if (cookieName.trim() === name) {
      return true;
    }
  }
  return false;
}

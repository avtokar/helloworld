// utils.js
export async function fetchCurrentUserName(token) {
  try {
    const resp = await fetch("https://wedev-api.sky.pro/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) return "";
    const data = await resp.json();
    const user =
      (data?.пользователи && data.пользователи[0]) ||
      data?.users?.[0] ||
      data?.user;
    return user?.name ?? "";
  } catch {
    return "";
  }
}

const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const nativeUrl = "https://loginid-demo-services.herokuapp.com";

const request = async (
  url,
  { method = "POST", headers = {}, body = {} } = {}
) => {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const initAuthenticate = async (username) => {
  return await request(`${baseUrl}/authenticate/fido2/init`, {
    body: { client_id: apiKey, username },
  });
};

export const retrieveUser = async (username) => {
  return await request(`${nativeUrl}/manage/users/retrieve`, {
    body: { username },
  });
};

export default { initAuthenticate, retrieveUser };

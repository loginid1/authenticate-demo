const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const nativeUrl =
  "https://zpvh1d1z4c.execute-api.us-east-1.amazonaws.com/latest";

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

export const PURPOSE = {
  push: "temporary_authentication",
  add: "add_credential",
};

export const initAuthenticate = async (username) => {
  return await request(`${baseUrl}/authenticate/fido2/init`, {
    body: { client_id: apiKey, username },
  });
};

export const waitForAuthentication = async (username, code) => {
  return await request(`${baseUrl}/authenticate/code/wait`, {
    body: {
      client_id: apiKey,
      username,
      authentication_code: { code, type: "short" },
    },
  });
};

export const retrieveUser = async (username) => {
  return await request(`${nativeUrl}/manage/users/retrieve`, {
    body: { username },
  });
};

export const generateCode = async (user, purpose) => {
  return await request(`${nativeUrl}/codes/short/generate`, {
    body: { user, purpose },
  });
};

export const allowCode = async (user, code, purpose) => {
  return await request(`${nativeUrl}/codes/short/allow`, {
    body: { user, code, purpose },
  });
};

export const credentialsInit = async (user, code, type) => {
  return await request(`${nativeUrl}/credentials/init`, {
    body: { user, code, type },
  });
};

export const credentialsComplete = async (attestationPayload) => {
  return await request(`${baseUrl}/api/native/credentials/fido2/complete`, {
    body: { ...attestationPayload },
  });
};

const allrequests = {
  initAuthenticate,
  waitForAuthentication,
  retrieveUser,
  generateCode,
  allowCode,
  credentialsInit,
  credentialsComplete,
};

export default allrequests;

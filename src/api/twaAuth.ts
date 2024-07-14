export function api(url, data) {
  let auth = "mock 1";
  try {
    const params = retrieveLaunchParams();
    auth = "twa " + params.initDataRaw;
  } catch (e) {
    console.log("use mock");
    auth = "mock 1";
  }
  return fetch(url, {
    ...data,
    headers: { Authorization: auth, "Content-Type": "application/json" },
  });
}

export const tokenConfigJS = token => {
  // Get token from localStorage
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  //If we find the token, then it takes it and puts it in the
  //config. Config is what is ultimately made into an HTTP request.
  if(token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}

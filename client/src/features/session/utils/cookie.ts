export const setCookie = (
  name: string,
  token: string,
  params?: { [key: string]: string | boolean | Date | number }
) => {
  if (!params) {
    params = {};
  }

  const options = {
    path: "/",
    ...params,
  };

  if (params.expires instanceof Date) {
    params.expires = params.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(token);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = params[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, "", {
    "max-age": -1,
  });
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );

  return matches ? decodeURIComponent(matches[1]) : "";
};

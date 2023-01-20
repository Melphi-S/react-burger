type TCookieProps = {
  path?: string;
  expires?: Date | number | string;
};

export function setCookie(
  name: string,
  value: string | null,
  props?: TCookieProps
): void {
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  } else if (exp && exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
  } else {
    const d = new Date();
    d.setTime(d.getTime() + 2592000e3);
    props.expires = d;
  }
  if (value) {
    value = encodeURIComponent(value);
  }
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName as keyof TCookieProps];
    updatedCookie += "=" + propValue;
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
  setCookie(name, null, { expires: -1 });
}

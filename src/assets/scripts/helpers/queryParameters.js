const pushesQueryParameters = function (
  name,
  value,
  encodes = function (v) {
    return JSON.stringify(v);
  }
) {
  const url = new URL(window.location);
  const encodedValue = encodes(value);

  url.searchParams.set(name, encodedValue);

  window.history.pushState({}, "", url);
};

const getsQueryParams = function (
  name,
  decodes = function (value) {
    return JSON.parse(value);
  }
) {
  const url = new URL(window.location);
  const value = url.searchParams.get(name);
  const decodedValue = value && decodes(value);

  return decodedValue;
};

const deletesQueryParams = function (name) {
  const url = new URL(window.location);

  url.searchParams.delete(name);

  window.history.pushState({}, "", url);
};

export { pushesQueryParameters, getsQueryParams, deletesQueryParams };

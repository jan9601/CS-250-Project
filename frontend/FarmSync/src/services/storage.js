export function getData(key) {
  const stringData = localStorage.getItem(key);
  if (!stringData) return null;

  const data = JSON.parse(stringData);

  return data;
}

export function setData(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

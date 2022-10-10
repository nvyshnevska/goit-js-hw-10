const searchParams = {
  fields: 'name,capital,population,flags,languages',
};

export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?${searchParams}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

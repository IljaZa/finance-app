import {ERAPI} from '@env';

const baseUrl = 'http://api.exchangeratesapi.io/v1/';
const apiKey = ERAPI;

export const getLatestRates = async () => {
  const url = baseUrl + 'latest?access_key=' + apiKey;
  const response = await fetch(url);
  const json = await response.json();
  return json.rates;
};

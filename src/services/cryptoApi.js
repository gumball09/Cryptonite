import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '97e0691ee3mshcf2aea47bcb5880p16cba7jsn3b03090c4f9a',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

// Configure a complete request with request headers to RapidAPI CoinRanking
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// Define single API slice object
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),

  // DEFINE ENDPONTS
  endpoints: (builder) => ({
    // get global stats 
    getGlobalStats: builder.query({
      query: () => createRequest('/stats')
    }),

    // get all cryptos
    getCryptos: builder.query({
      query: (count) => {
          let url;
          if(count) {
              url = `/coins?limit=${count}`
          } else url = `/coins`

          return createRequest(url)
      }
    }),

    // get 1 crypto
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`)
    }),

    // get crypto history
    getCryptoHistory: builder.query({
      query: (coinId, period) => createRequest(`/coin/${coinId}/history/${period}`)
    })

  }),
});

// Export auto-generated HOOK for `getPost` query endpoint
// Hook starts with 'use'
export const { useGetGlobalStatsQuery, useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;

using HeroesRandomiser.Prismic;
using HeroesRandomiser.Prismic.DataTransferObjects;
using HeroesRandomiser.Prismic.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Services
{
    public class PrismicGenericService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private PrismicRef _prismicRef;

        public PrismicGenericService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<PrismicRef> GetMasterRef()
        {
            var response = await _httpClient.GetAsync(_configuration.GetValue<string>("Prismic:ApiUrl"));
            if (response.IsSuccessStatusCode)
            {
                var resultDto = JsonConvert.DeserializeObject<PrismicRefDto>(await response.Content.ReadAsStringAsync());

                return resultDto?.Refs?.SingleOrDefault(x => x.IsMasterRef);
            }

            return null;
        }

        public async Task<ICollection<PrismicQueryResult<T>>> QueryApi<T>(string query, int pageSize = 100) where T : IPrismicDocument
        {
            if (_prismicRef?.Ref == null)
            {
                var masterRef = await GetMasterRef();
                if (masterRef == null)
                    return null;

                _prismicRef = masterRef;
            }

            var results = new List<PrismicQueryResult<T>>();
            string nextPage = null;

            do
            {
                string response = await GetSerialisedResponse(nextPage ?? query, pageSize);

                var deserialised = JsonConvert.DeserializeObject<PrismicQueryDto<T>>(response);
                if (deserialised.ResultsSize > 0)
                    results.AddRange(deserialised.Results);

                nextPage = deserialised.NextPage;
            } while (nextPage != null);

            results.ForEach(x => {
                x.Data.Id = x.Id;
                x.Data.PrismicRef = _prismicRef;
            });

            return results;
        }

        private async Task<string> GetSerialisedResponse(string query, int pageSize)
        {
            if (Uri.TryCreate(query, UriKind.Absolute, out var uri))
                return await _httpClient.GetStringAsync(query);

            return await _httpClient.GetStringAsync(FormatQuery(query, pageSize));
        }

        private string FormatQuery(string query, int pageSize)
        {
            return $"{_configuration.GetValue<string>("Prismic:ApiUrl")}/documents/search?ref={_prismicRef.Ref}&pageSize={pageSize}&q={query}";
        }
    }
}

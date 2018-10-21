using HeroesRandomiser.Prismic;
using HeroesRandomiser.Prismic.DataTransferObjects;
using HeroesRandomiser.Prismic.Interfaces;
using HeroesRandomiser.Web.Caching;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
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
        private readonly ILogger _logger;
        private readonly HttpClient _httpClient;
        private readonly PrismicCacheProvider _prismicCacheProvider;
        private readonly string _prismicApiUrl;

        public PrismicGenericService(ILogger<PrismicGenericService> logger, HttpClient httpClient, PrismicCacheProvider prismicCacheProvider, IConfiguration configuration)
        {
            _logger = logger;
            _httpClient = httpClient;
            _prismicCacheProvider = prismicCacheProvider;
            _prismicApiUrl = configuration.GetValue<string>("Prismic:ApiUrl");
        }

        public async Task<PrismicRef> GetMasterRef()
        {
            var cachedRef = _prismicCacheProvider.GetMasterRef();
            if (cachedRef != null)
                return cachedRef;

            _logger.LogInformation("Querying for master ref");
            var response = await _httpClient.GetAsync(_prismicApiUrl);
            if (response.IsSuccessStatusCode)
            {
                var resultDto = JsonConvert.DeserializeObject<PrismicRefDto>(await response.Content.ReadAsStringAsync());

                var masterRef = resultDto?.Refs?.SingleOrDefault(x => x.IsMasterRef);
                _prismicCacheProvider.SetMasterRef(masterRef);

                return masterRef;
            }

            return null;
        }

        public async Task<ICollection<PrismicQueryResult<T>>> QueryApi<T>(string query, int pageSize = 100) where T : IPrismicDocument
        {
            _logger.LogWarning($"Querying Prismic API: \n\t{query}\n\tSize: {pageSize}");

            var masterRef = await GetMasterRef();

            var results = new List<PrismicQueryResult<T>>();
            string nextPage = null;

            do
            {
                var response = await GetSerialisedResponse(nextPage ?? query, pageSize, masterRef);

                var deserialised = JsonConvert.DeserializeObject<PrismicQueryDto<T>>(response);
                if (deserialised.ResultsSize > 0)
                    results.AddRange(deserialised.Results);

                nextPage = deserialised.NextPage;
            } while (nextPage != null);

            results.ForEach(x =>
            {
                x.Data.Id = x.Id;
                x.Data.PrismicRef = masterRef;
            });

            return results;
        }

        private async Task<string> GetSerialisedResponse(string query, int pageSize, PrismicRef prismicRef)
        {
            if (Uri.TryCreate(query, UriKind.Absolute, out var uri))
                return await _httpClient.GetStringAsync(query);

            return await _httpClient.GetStringAsync(FormatQuery(query, pageSize, prismicRef));
        }

        private string FormatQuery(string query, int pageSize, PrismicRef prismicRef) => $"{_prismicApiUrl}/documents/search?ref={prismicRef.Ref}&pageSize={pageSize}&q={query}";
    }
}

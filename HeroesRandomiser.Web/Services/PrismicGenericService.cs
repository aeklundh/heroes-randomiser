using HeroesRandomiser.Prismic;
using HeroesRandomiser.Prismic.DataTransferObjects;
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
            var resultDto = JsonConvert.DeserializeObject<PrismicRefDto>(await _httpClient.GetStringAsync(_configuration.GetValue<string>("Prismic:ApiUrl")));

            if (resultDto != null)
                return resultDto.Refs.SingleOrDefault(x => x.IsMasterRef);

            return null;
        }

        public async Task<ICollection<string>> QueryApi(string query)
        {
            if (_prismicRef?.Ref == null)
            {
                var masterRef = await GetMasterRef();
                if (masterRef == null)
                    return null;

                _prismicRef = masterRef;
            }

            var results = new List<string>();
            Uri nextPage = null;

            do
            {
                var response = JsonConvert.DeserializeObject<PrismicQueryDto>(await GetSerialisedResponse(query));
                if (response.ResultsSize > 0)
                {
                    results.Add(response.SerialisedResults);
                }

                nextPage = response.NextPage;
            } while (nextPage != null);

            return results;
        }

        private async Task<string> GetSerialisedResponse(string query)
        {
            return await _httpClient.GetStringAsync(FormatQuery(query));
        }

        private string FormatQuery(string query)
        {
            return $"{_configuration.GetValue<string>("Prismic:ApiUrl")}/?ref={_prismicRef.Ref}&pageSize=100&q={query}";
        }
    }
}

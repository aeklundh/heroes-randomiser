using Newtonsoft.Json;
using System;

namespace HeroesRandomiser.Prismic.DataTransferObjects
{
    public class PrismicQueryDto
    {
        public int Page { get; set; }

        [JsonProperty("results_per_page")]
        public int ResultsPerPage { get; set; }

        [JsonProperty("results_size")]
        public int ResultsSize { get; set; }

        [JsonProperty("total_results_size")]
        public int TotalResultsSize { get; set; }

        [JsonProperty("total_pages")]
        public int TotalPages { get; set; }

        [JsonProperty("next_page")]
        public Uri NextPage { get; set; }

        [JsonProperty("prev_page")]
        public Uri PreviousPage { get; set; }

        [JsonProperty("results")]
        public string SerialisedResults { get; set; }
    }
}

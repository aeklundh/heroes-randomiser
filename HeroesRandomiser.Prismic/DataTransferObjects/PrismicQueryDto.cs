﻿using HeroesRandomiser.Prismic.Interfaces;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace HeroesRandomiser.Prismic.DataTransferObjects
{
    public class PrismicQueryDto<T> where T : IPrismicDocument 
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
        public string NextPage { get; set; }

        [JsonProperty("prev_page")]
        public string PreviousPage { get; set; }

        [JsonProperty("results")]
        public ICollection<PrismicQueryResult<T>> Results { get; set; }
    }
}

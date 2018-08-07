using Newtonsoft.Json;
using System;

namespace HeroesRandomiser.Prismic.DataTransferObjects
{
    public class PrismicQueryResult
    {
        public string Id { get; set; }

        public string Uid { get; set; }

        public string Type { get; set; }

        [JsonProperty("first_publication_date")]
        public DateTime FirstPublicationDate { get; set; }

        [JsonProperty("last_publication_date")]
        public DateTime LastPublicationDate { get; set; }

        public dynamic Data { get; set; }
    }
}

using HeroesRandomiser.Prismic.Interfaces;
using Newtonsoft.Json;
using System;

namespace HeroesRandomiser.Prismic.DataTransferObjects
{
    public class PrismicQueryResult<T> where T : IPrismicDocument
    {
        public string Id { get; set; }

        public string Uid { get; set; }

        public string Type { get; set; }

        [JsonProperty("first_publication_date")]
        public DateTime FirstPublicationDate { get; set; }

        [JsonProperty("last_publication_date")]
        public DateTime LastPublicationDate { get; set; }

        public T Data { get; set; }
    }
}

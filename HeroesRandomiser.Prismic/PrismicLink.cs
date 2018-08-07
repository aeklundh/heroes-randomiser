using Newtonsoft.Json;

namespace HeroesRandomiser.Prismic
{
    public class PrismicLink
    {
        public string Id { get; set; }

        public string Type { get; set; }

        [JsonProperty("link_type")]
        public string LinkType { get; set; }

        public bool IsBroken { get; set; }
    }
}

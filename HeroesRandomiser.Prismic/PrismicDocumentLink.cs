using Newtonsoft.Json;

namespace HeroesRandomiser.Prismic
{
    public class PrismicDocumentLink
    {
        public string Id { get; set; }

        [JsonProperty("type")]
        public string DocumentType { get; set; }

        [JsonProperty("link_type")]
        public string LinkType { get; set; }

        public bool IsBroken { get; set; }

        public bool IsValid => LinkType == PrismicLinkTypes.Document && Id != null;
    }
}

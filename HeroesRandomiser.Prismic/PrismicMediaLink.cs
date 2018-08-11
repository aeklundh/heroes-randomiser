using Newtonsoft.Json;
using System;

namespace HeroesRandomiser.Prismic
{
    public class PrismicMediaLink
    {
        [JsonProperty("link_type")]
        public string LinkType { get; set; }

        public string Name { get; set; }

        public string Kind { get; set; }

        public string Url { get; set; }

        public string Height { get; set; }

        public string Width { get; set; }

        public bool IsValid => LinkType == PrismicLinkTypes.Media && Uri.IsWellFormedUriString(Url, UriKind.Absolute);
    }

    public class PrismicMediaLinkKind
    {
        public const string Image = "image";
    }
}

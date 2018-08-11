using HeroesRandomiser.ContentTypes.HeroData;
using Newtonsoft.Json;

namespace HeroesRandomiser.Prismic.HeroData
{
    public class PrismicTalent : Talent
    {
        [JsonProperty("talent_name")]
        public override string Name { get; set; }

        [JsonProperty("talent_level")]
        public override double? Level { get; set; }

        [JsonProperty("talent_type")]
        public override string Type { get; set; }
    }
}

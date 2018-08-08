using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Prismic.Interfaces;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace HeroesRandomiser.Prismic
{
    public class PrismicHero : Hero, IPrismicDocument
    {
        public PrismicRef PrismicRef { get; set; }

        public string UniverseId { get; set; }

        [JsonProperty("gold_price")]
        public override int GoldPrice { get; set; }

        [JsonProperty("gem_price")]
        public override int GemPrice { get; set; }

        public ICollection<PrismicLink> RoleLinks { get; set; }

        public ICollection<PrismicLink> TalentLinks { get; set; }

        [JsonProperty("in-game_categories")]
        public ICollection<PrismicLink> InGameCategoryLinks { get; set; }

        public PrismicHero(PrismicRef prismicRef)
        {
            PrismicRef = prismicRef;
        }
    }
}

using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Prismic.Interfaces;
using HeroesRandomiser.Prismic.SpecialisedDocumentRelationships;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace HeroesRandomiser.Prismic.HeroData
{
    public class PrismicHero : Hero, IPrismicDocument
    {
        public PrismicRef PrismicRef { get; set; }

        [JsonProperty("universe")]
        public PrismicDocumentLink UniverseLink { get; set; }

        [JsonProperty("image")]
        public PrismicMediaLink PrismicImageLink { get; set; }

        public override string Image => PrismicImageLink.IsValid && PrismicImageLink.Kind == PrismicMediaLinkKind.Image ? PrismicImageLink.Url : null; 

        [JsonProperty("gold_price")]
        public override double? GoldPrice { get; set; }

        [JsonProperty("gem_price")]
        public override double? GemPrice { get; set; }

        [JsonProperty("roles")]
        public ICollection<RoleDocumentLink> RoleLinks { get; set; }

        [JsonProperty("talents")]
        public ICollection<PrismicTalent> DeserialisableTalents { get; set; }

        [JsonProperty("in-game_categories")]
        public ICollection<CategoryDocumentLink> InGameCategoryLinks { get; set; }

        [JsonProperty("must_be_paired_with")]
        public PrismicDocumentLink MustBePairedWithLink { get; set; }
    }
}

using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Prismic.Interfaces;
using Newtonsoft.Json;

namespace HeroesRandomiser.Prismic.HeroData
{
    public class PrismicRole : Role, IPrismicDocument
    {
        public PrismicRef PrismicRef { get; set; }

        [JsonProperty("role_category")]
        public PrismicDocumentLink RoleCategoryLink { get; set; }
    }
}

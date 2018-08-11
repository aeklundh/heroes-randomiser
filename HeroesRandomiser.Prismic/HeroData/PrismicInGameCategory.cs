using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Prismic.Interfaces;

namespace HeroesRandomiser.Prismic.HeroData
{
    public class PrismicInGameCategory : InGameCategory, IPrismicDocument
    {
        public PrismicRef PrismicRef { get; set; }
    }
}

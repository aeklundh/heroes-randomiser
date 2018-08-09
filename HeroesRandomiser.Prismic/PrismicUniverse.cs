using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Prismic.Interfaces;

namespace HeroesRandomiser.Prismic
{
    public class PrismicUniverse : Universe, IPrismicDocument
    {
        public PrismicRef PrismicRef { get; set; }
    }
}

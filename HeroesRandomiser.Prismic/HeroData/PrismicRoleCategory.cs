using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Prismic.Interfaces;

namespace HeroesRandomiser.Prismic.HeroData
{
    public class PrismicRoleCategory : RoleCategory, IPrismicDocument
    {
        public PrismicRef PrismicRef { get; set; }
    }
}

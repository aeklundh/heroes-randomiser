using HeroesRandomiser.Prismic.Interfaces;
using Newtonsoft.Json;

namespace HeroesRandomiser.Prismic.Pages
{
    public class PrismicAboutPage : IPrismicDocument
    {
        public PrismicRef PrismicRef { get; set; }

        public string Id { get; set; }

        public string Uid { get; set; }

        public dynamic Body { get; set; }
    }
}

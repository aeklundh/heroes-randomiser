using System.Collections.Generic;

namespace HeroesRandomiser.Web.Models
{
    public class RandomHeroOptions
    {
        public IEnumerable<string> InGameCategoryIds { get; set; }

        public IEnumerable<string> UniverseIds { get; set; }

        public IEnumerable<string> HeroIds { get; set; }
    }
}

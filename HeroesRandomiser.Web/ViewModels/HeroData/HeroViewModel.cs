using HeroesRandomiser.ContentTypes.HeroData;
using System.Collections.Generic;

namespace HeroesRandomiser.Web.ViewModels.HeroData
{
    public class HeroViewModel
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public double? GoldPrice { get; set; }

        public double? GemPrice { get; set; }

        public UniverseViewModel Universe { get; set; }

        public IEnumerable<Talent> Talents { get; set; }

        public IEnumerable<InGameCategoryViewModel> InGameCategories { get; set; }
    }
}

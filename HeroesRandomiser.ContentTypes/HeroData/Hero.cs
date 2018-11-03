using System.Collections.Generic;
using System.Linq;

namespace HeroesRandomiser.ContentTypes.HeroData
{
    public class Hero
    {
        public virtual string Id { get; set; }

        public virtual string Name { get; set; }

        public virtual string Image { get; set; }

        public virtual double? GoldPrice { get; set; }

        public virtual double? GemPrice { get; set; }

        public virtual Universe Universe { get; set; }

        public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

        public virtual ICollection<Talent> Talents { get; set; } = new List<Talent>();

        public virtual ICollection<InGameCategory> InGameCategories { get; set; } = new List<InGameCategory>();

        public IEnumerable<RoleCategory> RoleCategories => Roles.Select(x => x.RoleCategory);

        public virtual Hero MustBePairedWith { get; set; }
    }
}

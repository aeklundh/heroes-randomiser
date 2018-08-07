using System;
using System.Collections.Generic;

namespace HeroesRandomiser.ContentTypes.HeroData
{
    public class Hero
    {
        public virtual string Id { get; set; }

        public virtual string Name { get; set; }

        public virtual Uri Image { get; set; }

        public virtual int GoldPrice { get; set; }

        public virtual int GemPrice { get; set; }

        public virtual Universe Universe { get; set; }

        public virtual ICollection<Role> Roles { get; set; }

        public virtual ICollection<Talent> Talents { get; set; }

        public virtual ICollection<InGameCategory> InGameCategories { get; set; }
    }
}

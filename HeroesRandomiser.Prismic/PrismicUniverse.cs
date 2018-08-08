using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Prismic.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace HeroesRandomiser.Prismic
{
    public class PrismicUniverse : Universe, IPrismicDocument
    {
        public PrismicRef PrismicRef { get; set; }

        public PrismicUniverse(PrismicRef prismicRef)
        {
            PrismicRef = prismicRef;
        }
    }
}

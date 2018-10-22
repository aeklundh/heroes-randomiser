using HeroesRandomiser.Web.Caching;
using Microsoft.Extensions.Caching.Memory;

namespace HeroesRandomiser.Tests.Utilities
{
    internal static class TestCacheFactory
    {
        internal static CacheProvider BuildCacheProvider()
        {
            var cache = new MemoryCache(new MemoryCacheOptions());
            return new CacheProvider(cache);
        }

        internal static PrismicCacheProvider BuildPrismicCacheProvider() => new PrismicCacheProvider(BuildCacheProvider());
    }
}

using Microsoft.Extensions.Caching.Memory;
using System;

namespace HeroesRandomiser.Web.Caching
{
    public class CacheProvider
    {
        private readonly IMemoryCache _cache;

        public CacheProvider(IMemoryCache cache)
        {
            _cache = cache;
        }

        internal T TryGetCacheItem<T>(string cacheKey)
        {
            if (_cache.TryGetValue(cacheKey, out T cacheItem))
                return cacheItem;

            return default(T);
        }

        internal void SetCacheItem<T>(string cacheKey, T item, MemoryCacheEntryOptions options = null) =>
            _cache.Set(cacheKey, item, options ?? new MemoryCacheEntryOptions() { SlidingExpiration = TimeSpan.FromHours(3) });

        internal void ClearCacheItem(string cacheKey) => _cache.Remove(cacheKey);
    }
}

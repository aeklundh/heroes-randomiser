﻿using HeroesRandomiser.Prismic;
using Microsoft.Extensions.Caching.Memory;
using System;

namespace HeroesRandomiser.Web.Caching
{
    public class PrismicCacheProvider
    {
        private readonly CacheProvider _cacheProvider;

        public PrismicCacheProvider(CacheProvider cacheProvider)
        {
            _cacheProvider = cacheProvider;
        }

        internal PrismicRef GetMasterRef() => _cacheProvider.TryGetCacheItem<PrismicRef>(CacheKeys.MasterRef);

        internal void SetMasterRef(PrismicRef prismicRef) => _cacheProvider.SetCacheItem(CacheKeys.MasterRef, prismicRef);

        internal T TryGetPrismicCacheItem<T>(PrismicRef prismicRef, string cacheKeyBase) =>
            _cacheProvider.TryGetCacheItem<T>(FormatCacheKey(prismicRef, cacheKeyBase));

        internal void SetPrismicCacheItem<T>(PrismicRef prismicRef, string cacheKeyBase, T item) =>
            _cacheProvider.SetCacheItem(FormatCacheKey(prismicRef, cacheKeyBase), item, new MemoryCacheEntryOptions() { AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(1) });

        private string FormatCacheKey(PrismicRef prismicRef, string cacheKeyBase) => $"{prismicRef.Ref}|{cacheKeyBase}";
    }
}

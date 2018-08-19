using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Prismic;
using HeroesRandomiser.Prismic.HeroData;
using HeroesRandomiser.Web.Caching;
using HeroesRandomiser.Web.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Services
{
    public class PrismicHeroService : IHeroService
    {
        private readonly PrismicGenericService _prismicService;
        private readonly IMemoryCache _cache;

        public PrismicHeroService(PrismicGenericService prismicService, IMemoryCache cache)
        {
            _prismicService = prismicService;
            _cache = cache;
        }

        public async Task<ICollection<Hero>> GetHeroes()
        {
            var cachedHeroes = await TryGetCacheItem<ICollection<Hero>>(CacheKeys.Heroes);
            if (cachedHeroes != null)
                return cachedHeroes;

            var queryResult = await _prismicService.QueryApi<PrismicHero>("[[at(document.type, \"hero\")]]");
            if (queryResult != null && queryResult.Any())
            {
                var prismicHeroes = queryResult.Select(x => x.Data);

                var inGameCategories = await GetInGameCategories();
                var roles = await GetRoles();
                var universes = await GetUniverses();

                foreach (var hero in prismicHeroes)
                {
                    hero.Talents = hero.DeserialisableTalents.Cast<Talent>().ToList();
                    hero.Universe = universes.SingleOrDefault(x => x.Id == hero.UniverseLink.Id);

                    foreach (var categoryLink in hero.InGameCategoryLinks)
                    {
                        var category = inGameCategories.SingleOrDefault(x => x.Id == categoryLink.Category.Id);
                        if (category != null)
                            hero.InGameCategories.Add(category);
                    }

                    foreach (var roleLink in hero.RoleLinks)
                    {
                        var role = roles.SingleOrDefault(x => x.Id == roleLink.Role.Id);
                        if (role != null)
                            hero.Roles.Add(role);
                    }
                }

                var retVal = prismicHeroes.Cast<Hero>().ToList();
                SetCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.Heroes, retVal);

                return retVal;
            }

            return new List<Hero>();
        }

        public async Task<ICollection<InGameCategory>> GetInGameCategories()
        {
            var cachedInGameCategories = await TryGetCacheItem<ICollection<InGameCategory>>(CacheKeys.InGameCategories);
            if (cachedInGameCategories != null)
                return cachedInGameCategories;

            var queryResult = await _prismicService.QueryApi<PrismicInGameCategory>("[[at(document.type, \"in-game_category\")]]");
            if (queryResult != null && queryResult.Any())
            {
                var retVal = queryResult.Select(x => x.Data).Cast<InGameCategory>().ToList();
                SetCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.InGameCategories, retVal);

                return retVal;
            }

            return new List<InGameCategory>();
        }

        public async Task<ICollection<RoleCategory>> GetRoleCategories()
        {
            var cachedRoleCategories = await TryGetCacheItem<ICollection<RoleCategory>>(CacheKeys.RoleCategories);
            if (cachedRoleCategories != null)
                return cachedRoleCategories;

            var queryResult = await _prismicService.QueryApi<PrismicRoleCategory>("[[at(document.type, \"role_category\")]]");
            if (queryResult != null && queryResult.Any())
            {
                var retVal = queryResult.Select(x => x.Data).Cast<RoleCategory>().ToList();
                SetCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.RoleCategories, retVal);

                return retVal;
            }

            return new List<RoleCategory>();
        }

        public async Task<ICollection<Role>> GetRoles()
        {
            var cachedRoles = await TryGetCacheItem<ICollection<Role>>(CacheKeys.Roles);
            if (cachedRoles != null)
                return cachedRoles;

            var queryResult = await _prismicService.QueryApi<PrismicRole>("[[at(document.type, \"role\")]]");
            if (queryResult != null && queryResult.Any())
            {
                var prismicRoles = queryResult.Select(x => x.Data);
                var roleCategories = await GetRoleCategories();

                foreach (var role in prismicRoles)
                    role.RoleCategory = roleCategories.SingleOrDefault(x => x.Id == role.RoleCategoryLink.Id);

                var retVal = prismicRoles.Cast<Role>().ToList();
                SetCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.Roles, retVal);

                return retVal;
            }

            return new List<Role>();
        }

        public async Task<ICollection<Universe>> GetUniverses()
        {
            var cachedUniverses = await TryGetCacheItem<ICollection<Universe>>(CacheKeys.Universes);
            if (cachedUniverses != null)
                return cachedUniverses;

            var queryResult = await _prismicService.QueryApi<PrismicUniverse>("[[at(document.type, \"universe\")]]");
            if (queryResult != null && queryResult.Any())
            {
                var retVal = queryResult.Select(x => x.Data).Cast<Universe>().ToList();
                SetCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.Universes, retVal);

                return retVal;
            }

            return new List<Universe>();
        }

        private async Task<T> TryGetCacheItem<T>(string cacheKey)
        {
            var currentRef = _prismicService.PrismicRef ?? await _prismicService.GetMasterRef();

            if (_cache.TryGetValue($"{currentRef.Ref}|{cacheKey}", out T cacheItem))
                return cacheItem;

            return default(T);
        }

        private void SetCacheItem<T>(PrismicRef currentRef, string cacheKey, T item)
        {
            var options = new MemoryCacheEntryOptions() { SlidingExpiration = TimeSpan.FromHours(3) };
            _cache.Set($"{currentRef.Ref}|{cacheKey}", item, options);
        }
    }
}

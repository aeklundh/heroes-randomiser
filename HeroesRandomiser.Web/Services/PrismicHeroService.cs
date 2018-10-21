using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Prismic.HeroData;
using HeroesRandomiser.Web.Caching;
using HeroesRandomiser.Web.Services.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Services
{
    public class PrismicHeroService : IHeroService
    {
        private readonly PrismicGenericService _prismicService;
        private readonly PrismicCacheProvider _prismicCacheProvider;

        public PrismicHeroService(PrismicGenericService prismicService, PrismicCacheProvider cacheProvider)
        {
            _prismicService = prismicService;
            _prismicCacheProvider = cacheProvider;
        }

        public async Task<ICollection<Hero>> GetHeroes()
        {
            var cachedHeroes = _prismicCacheProvider.TryGetPrismicCacheItem<ICollection<Hero>>(await _prismicService.GetMasterRef(), CacheKeys.Heroes);
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
                _prismicCacheProvider.SetPrismicCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.Heroes, retVal);

                return retVal;
            }

            return new List<Hero>();
        }

        public async Task<ICollection<InGameCategory>> GetInGameCategories()
        {
            var cachedInGameCategories = _prismicCacheProvider.TryGetPrismicCacheItem<ICollection<InGameCategory>>(await _prismicService.GetMasterRef(), CacheKeys.InGameCategories);
            if (cachedInGameCategories != null)
                return cachedInGameCategories;

            var queryResult = await _prismicService.QueryApi<PrismicInGameCategory>("[[at(document.type, \"in-game_category\")]]");
            if (queryResult != null && queryResult.Any())
            {
                var retVal = queryResult.Select(x => x.Data).Cast<InGameCategory>().ToList();
                _prismicCacheProvider.SetPrismicCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.InGameCategories, retVal);

                return retVal;
            }

            return new List<InGameCategory>();
        }

        public async Task<ICollection<RoleCategory>> GetRoleCategories()
        {
            var cachedRoleCategories = _prismicCacheProvider.TryGetPrismicCacheItem<ICollection<RoleCategory>>(await _prismicService.GetMasterRef(), CacheKeys.RoleCategories);
            if (cachedRoleCategories != null)
                return cachedRoleCategories;

            var queryResult = await _prismicService.QueryApi<PrismicRoleCategory>("[[at(document.type, \"role_category\")]]");
            if (queryResult != null && queryResult.Any())
            {
                var retVal = queryResult.Select(x => x.Data).Cast<RoleCategory>().ToList();
                _prismicCacheProvider.SetPrismicCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.RoleCategories, retVal);

                return retVal;
            }

            return new List<RoleCategory>();
        }

        public async Task<ICollection<Role>> GetRoles()
        {
            var cachedRoles = _prismicCacheProvider.TryGetPrismicCacheItem<ICollection<Role>>(await _prismicService.GetMasterRef(), CacheKeys.Roles);
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
                _prismicCacheProvider.SetPrismicCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.Roles, retVal);

                return retVal;
            }

            return new List<Role>();
        }

        public async Task<ICollection<Universe>> GetUniverses()
        {
            var cachedUniverses = _prismicCacheProvider.TryGetPrismicCacheItem<ICollection<Universe>>(await _prismicService.GetMasterRef(), CacheKeys.Universes);
            if (cachedUniverses != null)
                return cachedUniverses;

            var queryResult = await _prismicService.QueryApi<PrismicUniverse>("[[at(document.type, \"universe\")]]");
            if (queryResult != null && queryResult.Any())
            {
                var retVal = queryResult.Select(x => x.Data).Cast<Universe>().ToList();
                _prismicCacheProvider.SetPrismicCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.Universes, retVal);

                return retVal;
            }

            return new List<Universe>();
        }
    }
}

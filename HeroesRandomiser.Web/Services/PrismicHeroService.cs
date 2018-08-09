using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Prismic;
using HeroesRandomiser.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Services
{
    public class PrismicHeroService : IHeroService
    {
        private readonly PrismicGenericService _prismicService;

        public PrismicHeroService(PrismicGenericService prismicService)
        {
            _prismicService = prismicService;
        }

        public async Task<ICollection<Hero>> GetHeroes()
        {
            var queryResult = await _prismicService.QueryApi<PrismicHero>("[[at(document.type, \"hero\")]]");

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
                    {
                        hero.InGameCategories.Add(category);
                    }
                }

                foreach (var roleLink in hero.RoleLinks)
                {
                    var role = roles.SingleOrDefault(x => x.Id == roleLink.Role.Id);
                    if (role != null)
                    {
                        hero.Roles.Add(role);
                    }
                }
            }

            return prismicHeroes.Cast<Hero>().ToList();
        }

        public async Task<ICollection<InGameCategory>> GetInGameCategories()
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<RoleCategory>> GetRoleCategories()
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Role>> GetRoles()
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<Universe>> GetUniverses()
        {
            throw new NotImplementedException();
        }
    }
}

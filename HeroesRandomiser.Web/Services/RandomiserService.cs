using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Web.Models;
using HeroesRandomiser.Web.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Services
{
    public class RandomiserService
    {
        private readonly IHeroService _heroService;
        private readonly Random _rng;

        public RandomiserService(IHeroService heroService)
        {
            _heroService = heroService;
            _rng = new Random();
        }

        public async Task<IEnumerable<Hero>> GetRandomTeam(int teamSize)
        {
            var heroes = await _heroService.GetHeroes();

            var team = new List<Hero>();
            for (var i = 0; i < teamSize && team.Count < teamSize; i++)
            {
                Hero randomisedHero;
                if ((teamSize - team.Count) >= 2)
                {
                    randomisedHero = RandomiseHeroForTeam(heroes, team);
                    if (randomisedHero.MustBePairedWith != null)
                        team.Add(randomisedHero.MustBePairedWith);
                }
                else
                {
                    randomisedHero = RandomiseHeroForTeam(heroes.Where(x => x.MustBePairedWith == null).ToList(), team);
                }

                team.Add(randomisedHero);
            }

            return team;
        }

        public Hero RandomiseHeroForTeam(ICollection<Hero> heroes, IEnumerable<Hero> team)
        {
            var occupiedRoles = team.SelectMany(x => x.Roles).Distinct();
            var occupiedRoleCategories = occupiedRoles.Select(x => x.RoleCategory).Distinct();

            var primaryHeroesSubset = heroes.Where(x => x.RoleCategories.Except(occupiedRoleCategories).Any()).ToList();
            var secondaryHeroesSubset = heroes.Where(x => x.Roles.Except(occupiedRoles).Any()).ToList();

            if (primaryHeroesSubset.Any())
                return GetAnyRandomHero(primaryHeroesSubset);

            if (secondaryHeroesSubset.Any())
                return GetAnyRandomHero(secondaryHeroesSubset);

            return GetAnyRandomHero(heroes.Except(team).ToList());
        }

        public async Task<Hero> GetRandomHero(RandomHeroOptions options = null)
        {
            var heroes = await _heroService.GetHeroes();

            if (options?.InGameCategoryIds != null && options.InGameCategoryIds.Any())
                heroes = heroes.Where(x => x.InGameCategories.Any(y => options.InGameCategoryIds.Contains(y.Id))).ToList();

            if (options?.UniverseIds!= null && options.UniverseIds.Any())
                heroes = heroes.Where(x => options.UniverseIds.Contains(x.Universe.Id)).ToList();

            if (options?.HeroIds != null && options.HeroIds.Any())
                heroes = heroes.Where(x => options.HeroIds.Contains(x.Id)).ToList();

            return GetAnyRandomHero(heroes);
        }

        public Hero GetAnyRandomHero(ICollection<Hero> heroes)
        {
            if (!heroes.Any())
                return null;

            var randomisedIndex = _rng.Next(0, heroes.Count);
            return heroes.ElementAt(randomisedIndex);
        }
    }
}

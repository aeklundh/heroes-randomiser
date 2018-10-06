using HeroesRandomiser.ContentTypes.HeroData;
using HeroesRandomiser.Web.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Controllers
{
    [Route("api/[controller]")]
    public class HeroDataController : Controller
    {
        private readonly IHeroService _heroService;

        public HeroDataController(IHeroService heroService)
        {
            _heroService = heroService;
        }

        [HttpGet]
        [Route("heroes")]
        public async Task<IEnumerable<Hero>> GetHeroes() => await _heroService.GetHeroes();

        [HttpGet]
        [Route("ingamecategories")]
        public async Task<IEnumerable<InGameCategory>> GetInGameCategories() => await _heroService.GetInGameCategories();

        [HttpGet]
        [Route("roles")]
        public async Task<IEnumerable<Role>> GetRoles() => await _heroService.GetRoles();

        [HttpGet]
        [Route("rolecategories")]
        public async Task<IEnumerable<RoleCategory>> GetRoleCategories() => await _heroService.GetRoleCategories();

        [HttpGet]
        [Route("universes")]
        public async Task<IEnumerable<Universe>> GetUniverses() => await _heroService.GetUniverses();
    }
}

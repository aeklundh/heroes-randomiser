using AutoMapper;
using HeroesRandomiser.Web.Services.Interfaces;
using HeroesRandomiser.Web.ViewModels.HeroData;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Controllers
{
    [Route("api/[controller]")]
    public class HeroDataController : Controller
    {
        private readonly IHeroService _heroService;
        private readonly IMapper _mapper;

        public HeroDataController(IHeroService heroService, IMapper mapper)
        {
            _heroService = heroService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("heroes")]
        public async Task<IEnumerable<HeroViewModel>> GetHeroes() => _mapper.Map<IEnumerable<HeroViewModel>>(await _heroService.GetHeroes());

        [HttpGet]
        [Route("ingamecategories")]
        public async Task<IEnumerable<InGameCategoryViewModel>> GetInGameCategories() => _mapper.Map<IEnumerable<InGameCategoryViewModel>>(await _heroService.GetInGameCategories());

        [HttpGet]
        [Route("universes")]
        public async Task<IEnumerable<UniverseViewModel>> GetUniverses() => _mapper.Map<IEnumerable<UniverseViewModel>>(await _heroService.GetUniverses());
    }
}

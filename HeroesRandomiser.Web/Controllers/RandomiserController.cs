using AutoMapper;
using HeroesRandomiser.Web.Models;
using HeroesRandomiser.Web.Services;
using HeroesRandomiser.Web.ViewModels.HeroData;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RandomiserController : ControllerBase
    {
        private readonly RandomiserService _randomiserService;
        private readonly IMapper _mapper;

        public RandomiserController(RandomiserService randomiserService, IMapper mapper)
        {
            _randomiserService = randomiserService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("team")]
        public async Task<IEnumerable<HeroViewModel>> GetRandomTeam(int teamSize = 5) => _mapper.Map<IEnumerable<HeroViewModel>>(await _randomiserService.GetRandomTeam(teamSize));

        [HttpGet]
        [Route("single")]
        public async Task<HeroViewModel> GetRandomHero(RandomHeroOptions options) => _mapper.Map<HeroViewModel>(await _randomiserService.GetRandomHero(options));
    }
}

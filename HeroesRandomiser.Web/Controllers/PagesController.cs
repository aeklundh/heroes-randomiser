using AutoMapper;
using HeroesRandomiser.Web.Services.Interfaces;
using HeroesRandomiser.Web.ViewModels.Pages;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        private readonly IPageService _pageService;
        private readonly IMapper _mapper;

        public PagesController(IPageService pageService, IMapper mapper)
        {
            _pageService = pageService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("about")]
        public async Task<AboutPageViewModel> GetHeroes() => _mapper.Map<AboutPageViewModel>(await _pageService.GetAboutPage());
    }
}

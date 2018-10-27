using HeroesRandomiser.Prismic.Pages;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Services.Interfaces
{
    public interface IPageService
    {
        Task<PrismicAboutPage> GetAboutPage();
    }
}

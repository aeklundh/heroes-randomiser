using HeroesRandomiser.Prismic.Pages;
using HeroesRandomiser.Web.Caching;
using HeroesRandomiser.Web.Services.Interfaces;
using System.Linq;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Services
{
    public class PrismicPageService : IPageService
    {
        private readonly PrismicGenericService _prismicService;
        private readonly PrismicCacheProvider _cacheProvider;

        public PrismicPageService(PrismicGenericService prismicService, PrismicCacheProvider cacheProvider)
        {
            _prismicService = prismicService;
            _cacheProvider = cacheProvider;
        }

        public async Task<PrismicAboutPage> GetAboutPage()
        {
            var cachedAboutPage = _cacheProvider.TryGetPrismicCacheItem<PrismicAboutPage>(await _prismicService.GetMasterRef(), CacheKeys.AboutPage);
            if (cachedAboutPage != null)
                return cachedAboutPage;

            var queryResult = await _prismicService.QueryApi<PrismicAboutPage>("[[at(document.type, \"about_page\")]]");
            if (queryResult != null && queryResult.Any())
            {
                var retVal = queryResult.Select(x => x.Data).Cast<PrismicAboutPage>().SingleOrDefault();
                _cacheProvider.SetPrismicCacheItem(queryResult.First().Data.PrismicRef, CacheKeys.AboutPage, retVal);

                return retVal;
            }

            return null;
        }
    }
}

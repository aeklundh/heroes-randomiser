using HeroesRandomiser.Prismic.HeroData;
using HeroesRandomiser.Tests.Utilities;
using HeroesRandomiser.Web.Services;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace HeroesRandomiser.Tests
{
    public class PrismicIntegrationTestsFixture : IDisposable
    {
        public HttpClient HttpClient { get; set; } = new HttpClient();
        public IConfiguration Configuration { get; set; } = TestConfigurationUtility.GetTestConfiguration();

        public void Dispose()
        {
            HttpClient.Dispose();
        }
    }

    public class PrismicIntegrationTests : IClassFixture<PrismicIntegrationTestsFixture>
    {
        private PrismicIntegrationTestsFixture _fixture;
        private readonly ITestOutputHelper _outputHelper;

        public PrismicIntegrationTests(PrismicIntegrationTestsFixture fixture, ITestOutputHelper outputHelper)
        {
            _fixture = fixture;
            _outputHelper = outputHelper;
        }

        [Fact]
        public async Task GetApiRef()
        {
            var prismicService = new PrismicGenericService(_fixture.HttpClient, _fixture.Configuration);
            var result = await prismicService.GetMasterRef();
            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetPaginatedResult()
        {
            var prismicService = new PrismicGenericService(_fixture.HttpClient, _fixture.Configuration);
            var result = await prismicService.QueryApi<PrismicUniverse>("[[at(document.type, \"universe\")]]", 1);

            Assert.NotNull(result);
            Assert.NotEmpty(result);
            Assert.True((result?.Count ?? 0) > 1);
        }

        [Fact]
        public async Task GetHeroes()
        {
            var cache = new MemoryCache(new MemoryCacheOptions());
            var prismicService = new PrismicGenericService(_fixture.HttpClient, _fixture.Configuration);
            var prismicHeroService = new PrismicHeroService(prismicService, cache);

            var result = await prismicHeroService.GetHeroes();
            Assert.NotEmpty(result);
            Assert.Contains(result, x => x.Roles.Any(y => y.RoleCategory != null));
            Assert.Contains(result, x => x.InGameCategories.Any());
        }

        [Fact]
        public async Task UtiliseCacheWithHeroData()
        {
            var cache = new MemoryCache(new MemoryCacheOptions());
            var prismicService = new PrismicGenericService(_fixture.HttpClient, _fixture.Configuration);
            var prismicHeroService = new PrismicHeroService(prismicService, cache);

            var timer = new Stopwatch();

            timer.Start();
            var result1 = await prismicHeroService.GetHeroes();
            timer.Stop();
            _outputHelper.WriteLine($"Time for first result: { timer.Elapsed }");

            timer.Restart();
            var result2 = await prismicHeroService.GetHeroes();
            timer.Stop();
            _outputHelper.WriteLine($"Time for second result: {timer.Elapsed}");

            var roles = await prismicHeroService.GetRoles();
            var roleCategories = await prismicHeroService.GetRoleCategories();
            var universes = await prismicHeroService.GetUniverses();
            var inGameCategories = await prismicHeroService.GetInGameCategories();

            var firstHero = result1.FirstOrDefault();

            Assert.Same(result1, result2);

            var category = firstHero?.InGameCategories?.FirstOrDefault();
            Assert.NotNull(category);
            Assert.Same(category, inGameCategories.SingleOrDefault(x => x.Id == category.Id));

            var role = firstHero?.Roles?.FirstOrDefault();
            Assert.NotNull(role);
            Assert.Same(role, roles.SingleOrDefault(x => x.Id == role.Id));

            var roleCategory = firstHero?.Roles?.FirstOrDefault()?.RoleCategory;
            Assert.NotNull(roleCategory);
            Assert.Same(roleCategory, roleCategories.SingleOrDefault(x => x.Id == roleCategory.Id));

            var universe = firstHero?.Universe;
            Assert.NotNull(universe);
            Assert.Same(universe, universes.SingleOrDefault(x => x.Id == universe.Id));

            var inGameCategory = firstHero?.InGameCategories?.FirstOrDefault();
            Assert.NotNull(inGameCategory);
            Assert.Same(inGameCategory, inGameCategories.SingleOrDefault(x => x.Id == inGameCategory.Id));
        }
    }
}

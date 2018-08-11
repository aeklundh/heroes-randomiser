using HeroesRandomiser.Prismic.HeroData;
using HeroesRandomiser.Tests.Utilities;
using HeroesRandomiser.Web.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;

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
        private PrismicIntegrationTestsFixture Fixture { get; set; }

        public PrismicIntegrationTests(PrismicIntegrationTestsFixture fixture)
        {
            Fixture = fixture;
        }

        [Fact]
        public async Task GetApiRef()
        {
            var prismicService = new PrismicGenericService(Fixture.HttpClient, Fixture.Configuration);
            var result = await prismicService.GetMasterRef();
            Assert.NotNull(result);
        }

        [Fact]
        public async Task GetPaginatedResult()
        {
            var prismicService = new PrismicGenericService(Fixture.HttpClient, Fixture.Configuration);
            var result = await prismicService.QueryApi<PrismicUniverse>("[[at(document.type, \"universe\")]]", 1);

            Assert.NotNull(result);
            Assert.NotEmpty(result);
            Assert.True((result?.Count ?? 0) > 1);
        }

        [Fact]
        public async Task GetHeroes()
        {
            var prismicService = new PrismicGenericService(Fixture.HttpClient, Fixture.Configuration);
            var prismicHeroService = new PrismicHeroService(prismicService);

            var result = await prismicHeroService.GetHeroes();
            Assert.NotEmpty(result);
            Assert.Contains(result, x => x.Roles.Any(y => y.RoleCategory != null));
            Assert.Contains(result, x => x.InGameCategories.Any());
        }
    }
}

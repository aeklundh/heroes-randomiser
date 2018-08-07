using HeroesRandomiser.Tests.Utilities;
using HeroesRandomiser.Web.Services;
using Microsoft.Extensions.Configuration;
using System;
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
    }
}

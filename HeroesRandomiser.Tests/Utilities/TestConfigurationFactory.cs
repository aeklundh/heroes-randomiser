using Microsoft.Extensions.Configuration;

namespace HeroesRandomiser.Tests.Utilities
{
    internal static class TestConfigurationFactory
    {
        internal static IConfiguration GetTestConfiguration()
        {
            return new ConfigurationBuilder()
                .AddJsonFile("appsettings.test.json")
                .Build();
        }
    }
}

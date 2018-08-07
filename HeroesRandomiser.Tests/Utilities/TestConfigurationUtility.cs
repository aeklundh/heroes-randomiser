using Microsoft.Extensions.Configuration;

namespace HeroesRandomiser.Tests.Utilities
{
    internal static class TestConfigurationUtility
    {
        internal static IConfiguration GetTestConfiguration()
        {
            return new ConfigurationBuilder()
                .AddJsonFile("appsettings.test.json")
                .Build();
        }
    }
}

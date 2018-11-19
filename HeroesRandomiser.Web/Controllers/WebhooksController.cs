using HeroesRandomiser.Prismic;
using HeroesRandomiser.Prismic.DataTransferObjects;
using HeroesRandomiser.Web.Caching;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;

namespace HeroesRandomiser.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebhooksController : ControllerBase
    {
        private readonly string _prismicWebhookSecretKey;
        private readonly PrismicCacheProvider _cacheProvider;

        public WebhooksController(IConfiguration configuration, PrismicCacheProvider cacheProvider)
        {
            _prismicWebhookSecretKey = configuration.GetValue<string>("Prismic:WebhookSecretKey");
            _cacheProvider = cacheProvider;
        }

        [HttpPost]
        [Route("prismic")]
        public IActionResult OnPrismicPublish(PrismicWebhookDto dto)
        {
            if (string.IsNullOrEmpty(_prismicWebhookSecretKey))
                return new StatusCodeResult(StatusCodes.Status500InternalServerError);

            if (ModelState.IsValid)
            {
                if (_prismicWebhookSecretKey.Equals(dto.Secret, StringComparison.Ordinal))
                {
                    _cacheProvider.SetMasterRef(new PrismicRef()
                    {
                        Id = "master",
                        Ref = dto.MasterRef,
                        Label = "Master",
                        IsMasterRef = true
                    });

                    return Ok();
                }

                return Unauthorized();
            }

            return BadRequest();
        }
    }
}

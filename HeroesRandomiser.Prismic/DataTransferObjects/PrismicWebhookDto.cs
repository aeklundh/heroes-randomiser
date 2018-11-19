using System.ComponentModel.DataAnnotations;

namespace HeroesRandomiser.Prismic.DataTransferObjects
{
    public class PrismicWebhookDto
    {
        public string Type { get; set; }

        [Required]
        public string Secret { get; set; }

        public string MasterRef { get; set; }

        public string Domain { get; set; }

        public string ApiUrl { get; set; }
    }
}

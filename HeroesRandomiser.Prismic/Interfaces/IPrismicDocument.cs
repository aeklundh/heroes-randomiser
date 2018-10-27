namespace HeroesRandomiser.Prismic.Interfaces
{
    public interface IPrismicDocument
    {
        string Id { get; set; }

        PrismicRef PrismicRef { get; set;  }
    }
}

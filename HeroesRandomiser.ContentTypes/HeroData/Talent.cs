namespace HeroesRandomiser.ContentTypes.HeroData
{
    public class Talent
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public int Level { get; set; }

        public TalentType Type { get; set; }

        public enum TalentType
        {
            Basic,
            Heroic,
            Storm
        }
    }
}

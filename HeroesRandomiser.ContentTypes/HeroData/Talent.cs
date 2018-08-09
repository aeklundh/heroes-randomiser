namespace HeroesRandomiser.ContentTypes.HeroData
{
    public class Talent
    {
        public virtual string Name { get; set; }

        public virtual double? Level { get; set; }

        public virtual string Type { get; set; }
    }

    public class TalentTypes
    {
        public const string Basic = "Basic";
        public const string Heroic = "Heroic";
        public const string Storm = "Storm";
    }
}

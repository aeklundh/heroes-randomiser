namespace HeroesRandomiser.ContentTypes.HeroData
{
    public abstract class Role
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public RoleCategory RoleCategory { get; set; }
    }
}

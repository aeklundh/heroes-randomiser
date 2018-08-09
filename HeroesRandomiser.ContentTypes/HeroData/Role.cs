namespace HeroesRandomiser.ContentTypes.HeroData
{
    public class Role
    {
        public virtual string Id { get; set; }

        public virtual string Name { get; set; }

        public virtual RoleCategory RoleCategory { get; set; }
    }
}

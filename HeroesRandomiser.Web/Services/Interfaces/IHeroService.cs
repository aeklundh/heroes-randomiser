using HeroesRandomiser.ContentTypes.HeroData;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HeroesRandomiser.Web.Services.Interfaces
{
    public interface IHeroService
    {
        Task<ICollection<Hero>> GetHeroes();
        Task<ICollection<InGameCategory>> GetInGameCategories();
        Task<ICollection<Role>> GetRoles();
        Task<ICollection<RoleCategory>> GetRoleCategories();
        Task<ICollection<Universe>> GetUniverses();
    }
}

using Microsoft.AspNetCore.Identity;

namespace CMS_API.Repository
{
    public interface ITokenRepository
    {
        string CreateJWTToken(IdentityUser user);
    }
}

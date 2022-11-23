using Microsoft.AspNetCore.Mvc;
using System.Linq;
using HumanResourceApplication.Domain.UserModule;
using HumanResourceApplication.Models.Main;
using RxWeb.Core.AspNetCore;
using RxWeb.Core.Security.Authorization;

namespace HumanResourceApplication.Api.Controllers.UserModule
{
    [ApiController]
    [Route("api/[controller]")]
	
	public class UsersController : BaseDomainController<User,User>

    {
        public UsersController(IUserDomain domain):base(domain) {}

    }
}

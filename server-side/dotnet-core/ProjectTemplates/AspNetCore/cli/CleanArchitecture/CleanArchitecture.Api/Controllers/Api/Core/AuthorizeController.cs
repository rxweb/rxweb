using Microsoft.AspNetCore.Mvc;
using CleanArchitecture.Models.Main;
using CleanArchitecture.Infrastructure.Security;
using CleanArchitecture.Infrastructure.Singleton;
using CleanArchitecture.Models.ViewModels;
using CleanArchitecture.UnitOfWork.Main;
using Newtonsoft.Json;
using RxWeb.Core;
using RxWeb.Core.Security;
using System.Threading.Tasks;

namespace CleanArchitecture.Api.Controllers
{
        [ApiController]
    [Route("api/[controller]")]
    public class AuthorizeController : ControllerBase
    {
        private ILoginUow LoginUow { get; set; }

        private IUserClaim UserClaim { get; set; }
        private UserAccessConfigInfo UserAccessConfig { get; set; }

        private IApplicationTokenProvider ApplicationTokenProvider { get; set; }

        public AuthorizeController(ILoginUow loginUow, UserAccessConfigInfo userAccessConfig, IUserClaim userClaim,IApplicationTokenProvider applicationTokenProvider)
        {
            this.LoginUow = loginUow;
            UserAccessConfig = userAccessConfig;
            this.UserClaim = userClaim;
            this.ApplicationTokenProvider = applicationTokenProvider;
        }

        [HttpGet(ACCESS)]
        public async Task<IActionResult> Get()
        {
            var accessModules = await UserAccessConfig.GetFullInfoAsync(UserClaim.UserId, LoginUow);
            return Ok(JsonConvert.SerializeObject(accessModules));
        }

        [HttpPost(LOGOUT)]
        public async Task<IActionResult> LogOut(UserConfig userConfig)
        {
            await ApplicationTokenProvider.RemoveTokenAsync(userConfig);
            return Ok();
        }

        [HttpPost(REFRESH)]
        public async Task<IActionResult> Refresh(UserConfig userConfig)
        {
            var user = await this.LoginUow.Repository<vUser>().SingleAsync(t => t.UserId == UserClaim.UserId);
            var token = await ApplicationTokenProvider.RefereshTokenAsync(user, userConfig);
            return Ok(token);
        }

        const string LOGOUT = "logout";

        const string ACCESS = "access";

        const string REFRESH = "refresh";
    }
}


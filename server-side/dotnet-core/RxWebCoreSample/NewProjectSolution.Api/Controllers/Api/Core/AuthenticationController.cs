using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NewProjectSolution.Infrastructure.Security;
using NewProjectSolution.Models.Main;
using NewProjectSolution.Models.ViewModels;
using NewProjectSolution.UnitOfWork.Main;
using RxWeb.Core.Security.Cryptography;
using RxWeb.Core.Security.Filters;
using System.Threading.Tasks;


namespace NewProjectSolution.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {

        public AuthenticationController(ILoginUow loginUow, IApplicationTokenProvider tokenProvider, IPasswordHash passwordHash)
        {
            this.LoginUow = loginUow;
            ApplicationTokenProvider = tokenProvider;
            PasswordHash = passwordHash;
        }

        [HttpGet]
        [AllowAnonymous]
        [AllowRequest(MaxRequestCountPerIp=100)]
        public async Task<IActionResult> Get() {
            var token = await ApplicationTokenProvider.GetTokenAsync(new vUser { UserId=0,ApplicationTimeZoneName=string.Empty,LanguageCode=string.Empty });
            return Ok(token);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post(AuthenticationModel authentication)
        {
            //var person = new Person
            //{
            //    PersonName = "abc"
            //};
            //await LoginUow.RegisterNewAsync<Person>(person);
            //await LoginUow.CommitAsync();
            //var person = LoginUow.Repository<Person>().FindByKey(15);
            //await LoginUow.RegisterDeletedAsync<Person>(person);
            await LoginUow.CommitAsync();
            var user = await LoginUow.Repository<vUser>().SingleOrDefaultAsync(t => t.UserName == authentication.UserName && !t.LoginBlocked);
            if (user != null && PasswordHash.VerifySignature(authentication.Password, user.Password, user.Salt))
            {
                var token = await ApplicationTokenProvider.GetTokenAsync(user);
                return Ok(token);
            }
            else
                return BadRequest();
        }


        private ILoginUow LoginUow { get; set; }
        private IApplicationTokenProvider ApplicationTokenProvider { get; set; }
        private IPasswordHash PasswordHash { get; set; }
    }
}


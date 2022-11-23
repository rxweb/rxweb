using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HumanResourceApplication.Infrastructure.Security;
using HumanResourceApplication.Models.Main;
using HumanResourceApplication.Models.ViewModels;
using HumanResourceApplication.UnitOfWork.Main;
using RxWeb.Core.Security.Cryptography;
using System;
using System.Linq;
using System.Threading.Tasks;
using RxWeb.Core.Security.Filters;

namespace HumanResourceApplication.Api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthenticationController : ControllerBase
  {
    private ILoginUow LoginUow { get; set; }
    private IApplicationTokenProvider ApplicationTokenProvider { get; set; }
    private IPasswordHash PasswordHash { get; set; }

    public AuthenticationController(ILoginUow loginUow, IApplicationTokenProvider tokenProvider, IPasswordHash passwordHash)
    {
      this.LoginUow = loginUow;
      ApplicationTokenProvider = tokenProvider;
      PasswordHash = passwordHash;
    }

    [HttpGet]
    [AllowAnonymous]
    [AllowRequest(MaxRequestCountPerIp = 100)]
    public async Task<IActionResult> Get()
    {
      var token = await ApplicationTokenProvider.GetTokenAsync(new vUser { UserId = 0, ApplicationTimeZoneName = string.Empty, LanguageCode = string.Empty });
      return Ok(token);
    }

    [HttpPost]
    [AllowAnonymousUser]
    public async Task<IActionResult> Post(AuthenticationModel authentication)
    {
      var user = await LoginUow.Repository<vUser>().SingleOrDefaultAsync(t => t.UserName == authentication.UserName && !t.LoginBlocked);
      if (user != null && PasswordHash.VerifySignature(authentication.Password, user.Password, user.Salt))
      {
        var token = await ApplicationTokenProvider.GetTokenAsync(user);
        return Ok(token);
      }
      else
        return BadRequest();
    }
  }
}


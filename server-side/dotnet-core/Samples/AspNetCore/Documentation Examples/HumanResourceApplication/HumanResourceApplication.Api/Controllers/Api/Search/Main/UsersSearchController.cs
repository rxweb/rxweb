using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RxWeb.Core.Security;
using RxWeb.Core.Data;
using HumanResourceApplication.Models.ViewModels;
using HumanResourceApplication.BoundedContext.SqlContext;
using Microsoft.Data.SqlClient;

namespace HumanResourceApplication.Api.Controllers.UserModule
{
  [ApiController]
  [Route("api/[controller]")]
  public class SearchUsersController : ControllerBase
  {
    private IDbContextManager<MainSqlDbContext> DbContextManager { get; set; }
    public SearchUsersController(IDbContextManager<MainSqlDbContext> dbContextManager)
    {
      DbContextManager = dbContextManager;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody]Dictionary<string, string> searchParams)
    {
      var spParameters = new SqlParameter[1];
      spParameters[0] = new SqlParameter() { ParameterName = "Query", Value = searchParams["query"] };
      var result = await DbContextManager.StoreProc<StoreProcResult>("[dbo].spSearchUsers", spParameters);
      return Ok(result.SingleOrDefault()?.Result);
    }
  }
}

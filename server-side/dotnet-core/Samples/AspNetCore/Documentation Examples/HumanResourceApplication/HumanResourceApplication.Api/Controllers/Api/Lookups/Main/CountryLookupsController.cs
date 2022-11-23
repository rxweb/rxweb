using Microsoft.AspNetCore.Mvc;
using System.Linq;
using HumanResourceApplication.UnitOfWork.Main;
using HumanResourceApplication.Models.Main;
using RxWeb.Core.AspNetCore;
using RxWeb.Core.Security.Authorization;

namespace HumanResourceApplication.Api.Controllers.UserModule
{
  [ApiController]
  [Route("api/[controller]")]
  public class CountryLookupsController : BaseLookupController
  {
    public CountryLookupsController(IUserUow uow) : base(uow) { }

    #region Lookups
    [HttpGet("CountryLookups")]
    public IQueryable<vCountryLookup> GetCountryLookups()
    {
      return Uow.Repository<vCountryLookup>().Queryable();
    }
    #endregion Lookups

  }
}

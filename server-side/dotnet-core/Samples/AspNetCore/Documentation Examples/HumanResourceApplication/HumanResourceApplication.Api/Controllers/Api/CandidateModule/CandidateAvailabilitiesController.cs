using Microsoft.AspNetCore.Mvc;
using System.Linq;
using HumanResourceApplication.UnitOfWork.Main;
using HumanResourceApplication.Models.Main;
using RxWeb.Core.AspNetCore;
using RxWeb.Core.Security.Authorization;

namespace HumanResourceApplication.Api.Controllers.CandidateModule
{
  [ApiController]
  [Route("api/candidates/[controller]")]
  public class CandidateAvailabilitiesController : BaseController<CandidateAvailability, CandidateAvailability, CandidateAvailability>
  {
    public CandidateAvailabilitiesController(ICandidateUow uow) : base(uow) { }

  }
}

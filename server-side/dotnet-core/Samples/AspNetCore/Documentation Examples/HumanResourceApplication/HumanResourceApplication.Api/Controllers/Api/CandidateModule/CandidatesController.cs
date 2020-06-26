using Microsoft.AspNetCore.Mvc;
using System.Linq;
using HumanResourceApplication.UnitOfWork.Main;
using HumanResourceApplication.Models.Main;
using RxWeb.Core.AspNetCore;
using RxWeb.Core.Security.Authorization;

namespace HumanResourceApplication.Api.Controllers.CandidateModule
{
    [ApiController]
    [Route("api/[controller]")]
	
	public class CandidatesController : BaseController<Candidate,vCandidate,vCandidateRecord>

    {
        public CandidatesController(ICandidateUow uow):base(uow) {}

    }
}

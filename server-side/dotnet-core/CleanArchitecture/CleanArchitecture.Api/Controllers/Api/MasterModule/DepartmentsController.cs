using Microsoft.AspNetCore.Mvc;
using System.Linq;
using CleanArchitecture.UnitOfWork.Main;
using CleanArchitecture.Models.Main;
using RxWeb.Core.AspNetCore;
using RxWeb.Core.Security.Authorization;

namespace CleanArchitecture.Api.Controllers.MasterModule
{
    [ApiController]
    [Route("api/[controller]")]
	
	public class DepartmentsController : BaseController<Department,Department,Department>

    {
        public DepartmentsController(IMasterUow uow):base(uow) {}

    }
}

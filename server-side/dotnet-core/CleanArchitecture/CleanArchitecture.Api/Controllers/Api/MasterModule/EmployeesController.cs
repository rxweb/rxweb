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
	
	public class EmployeesController : BaseController<Employee,Employee,Employee>

    {
        public EmployeesController(IMasterUow uow):base(uow) {}

    }
}

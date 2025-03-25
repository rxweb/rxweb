using Microsoft.AspNetCore.Mvc;
using System.Linq;
using PrimePro_Sample.UnitOfWork.Main;
using PrimePro_Sample.Models.Main;
using RxWeb.Core.AspNetCore;
using RxWeb.Core.Security.Authorization;

namespace PrimePro_Sample.Api.Controllers.MasterModule
{
    [ApiController]
    [Route("api/[controller]")]
	
	public class EmployeesController : BaseController<Employee,Employee,Employee>

    {
        public EmployeesController(IMasterUow uow):base(uow) {}

    }
}

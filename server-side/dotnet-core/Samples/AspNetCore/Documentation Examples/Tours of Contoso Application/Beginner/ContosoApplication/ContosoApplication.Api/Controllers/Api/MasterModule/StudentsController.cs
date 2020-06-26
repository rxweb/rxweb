using Microsoft.AspNetCore.Mvc;
using System.Linq;
using ContosoApplication.UnitOfWork.Main;
using ContosoApplication.Models.Main;
using RxWeb.Core.AspNetCore;
using RxWeb.Core.Security.Authorization;

namespace ContosoApplication.Api.Controllers.MasterModule
{
    [ApiController]
    [Route("api/[controller]")]
	
	public class StudentsController : BaseController<Student,vStudent,vStudentRecord>

    {
        public StudentsController(IMasterUow uow):base(uow) {}

    }
}

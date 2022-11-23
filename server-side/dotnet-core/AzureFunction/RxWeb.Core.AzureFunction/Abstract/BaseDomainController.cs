//using Microsoft.AspNetCore.JsonPatch;
//using Microsoft.AspNetCore.Mvc;
//using RxWeb.Core.AspNetCore.Binder;
//using RxWeb.Core.AspNetCore.Extensions;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace RxWeb.Core.AspNetCore
//{
//    public abstract class BaseDomainController<T> : ControllerBase where T : class
//    {
//        protected ICoreDomain<T> Domain { get; set; }

//        public BaseDomainController(ICoreDomain<T> domain)
//        {
//            this.Domain = domain;
//        }

//        [HttpGet]
//        public virtual async Task<IActionResult> Get([ModelBinder(typeof(QueryParamsBinder))]Dictionary<string,object> queryParams) => Ok(await this.Domain.GetAsync(queryParams));


//        [HttpGet("{id}")]
//        public virtual async Task<IActionResult> GetBy([ModelBinder(typeof(QueryParamsBinder))]Dictionary<string,object> queryParams) => Ok(await this.Domain.GetBy(queryParams));

//        [HttpPost]
//        public virtual async Task<IActionResult> Post([FromBody]T entity)
//        {
//            var validations = this.Domain.AddValidation(entity);
//            if (validations.Count() == 0)
//            {
//                await this.Domain.AddAsync(entity);
//                return Created(HttpContext.Request.Path.ToUriComponent(), ApplicationExtensions.GetKeyValue(entity));
//            }
//            return BadRequest(validations);
//        }

//        [HttpPut("{id}")]
//        public virtual async Task<IActionResult> Put(int id, [FromBody]T entity)
//        {
//            var validations = this.Domain.UpdateValidation(entity);
//            if (validations.Count() == 0)
//            {
//                await this.Domain.UpdateAsync(entity);
//                return NoContent();
//            }
//            return BadRequest(validations);
//        }

//        [HttpDelete("{id}")]
//        public virtual async Task<IActionResult> Delete([ModelBinder(typeof(QueryParamsBinder))]Dictionary<string,object> queryParams)
//        {
//            var validations = this.Domain.DeleteValidation(queryParams);
//            if (validations.Count() == 0)
//            {
//                await this.Domain.DeleteAsync(queryParams);
//                return NoContent();
//            }
//            return BadRequest(validations);
//        }
//    }
//}

//using Microsoft.AspNetCore.JsonPatch;
//using Microsoft.AspNetCore.Mvc;
//using RxWeb.Core.AspNetCore.Binder;
//using RxWeb.Core.AspNetCore.Extensions;
//using RxWeb.Core.Data;
//using System.Threading.Tasks;

//namespace RxWeb.Core.AspNetCore
//{
//    public abstract class BaseController<T, ListEntity, RecordEntity> : ControllerBase where T : class where ListEntity : class where RecordEntity : class
//    {
//        protected ICoreUnitOfWork Uow { get; set; }
//        public BaseController(ICoreUnitOfWork uow)
//        {
//            this.Uow = uow;
//        }

//        [HttpGet]
//        public virtual async Task<IActionResult> Get() => Ok(await this.Uow.Repository<ListEntity>().AllAsync());


//        [HttpGet("{id}")]
//        public virtual async Task<IActionResult> Get(int id) => Ok(await this.Uow.Repository<RecordEntity>().FindByKeyAsync(id));

//        [HttpPost]
//        public virtual async Task<IActionResult> Post([FromBody]T entity)
//        {
//            await this.Uow.RegisterNewAsync<T>(entity);
//            await Uow.CommitAsync();
//            return Created(HttpContext.Request.Path.ToUriComponent(), ApplicationExtensions.GetKeyValue(entity));
//        }

//        [HttpPut("{id}")]
//        public virtual async Task<IActionResult> Put(int id, [FromBody]T entity)
//        {
//            await Uow.RegisterDirtyAsync<T>(entity);
//            await Uow.CommitAsync();
//            return NoContent();
//        }

//        [HttpPatch("{id}")]
//        public virtual async Task<IActionResult> Patch(int id, [FromBody] JsonPatchDocument<T> entity)
//        {
//            var serverEntity = Uow.Repository<T>().FindByKey(id);
//            entity.ApplyTo(serverEntity);
//            return await Put(id, serverEntity);
//        }

//        [HttpDelete("{id}")]
//        public virtual async Task<IActionResult> Delete(int id)
//        {
//            var entity = Uow.Repository<T>().FindByKey(id);
//            await Uow.RegisterDeletedAsync<T>(entity);
//            await Uow.CommitAsync();
//            return NoContent();
//        }
//    }
//}

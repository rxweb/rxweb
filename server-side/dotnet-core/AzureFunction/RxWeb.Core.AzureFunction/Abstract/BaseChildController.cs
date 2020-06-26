//using Microsoft.AspNetCore.JsonPatch;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Azure.WebJobs;
//using RxWeb.Core.Data;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace RxWeb.Core.AspNetCore
//{
//    public abstract class BaseChildFunction<T,ListEntity,RecordEntity> where T: class where ListEntity:class where RecordEntity : class 
//    {
//        protected ICoreUnitOfWork Uow { get; set; }
//        public BaseChildFunction(ICoreUnitOfWork uow) {
//            this.Uow = uow;
//        }

//        public virtual async Task<IActionResult> Get([ModelBinder(typeof(QueryParamsBinder))]Dictionary<string, object> queryParams) => Ok(await this.Uow.Repository<ListEntity>().FindBySharedKeyAsync(queryParams));


//        public async Task<IActionResult> Get(int id) => Ok(await this.Uow.Repository<RecordEntity>().FindByKeyAsync(id));

//        public virtual async Task<IActionResult> Post(T entity)
//        {
//            await this.Uow.RegisterNewAsync<T>(entity);
//            await Uow.CommitAsync();
//            return Created(HttpContext.Request.Path.ToUriComponent(), ApplicationExtensions.GetKeyValue(entity));
//        }

//        public virtual async Task<IActionResult> Put(int id, [FromBody]T entity)
//        {
//            await Uow.RegisterDirtyAsync<T>(entity);
//            await Uow.CommitAsync();
//            return NoContent();
//        }

//        public virtual async Task<IActionResult> Patch(int id, [FromBody] JsonPatchDocument<T> entity)
//        {
//            var serverEntity = Uow.Repository<T>().FindByKey(id);
//            entity.ApplyTo(serverEntity);
//            return await Put(id, serverEntity);
//        }

//        public virtual async Task<IActionResult> Delete(int id)
//        {
//            var entity = Uow.Repository<T>().FindByKey(id);
//            await Uow.RegisterDeletedAsync<T>(entity);
//            await Uow.CommitAsync();
//            return NoContent();
//        }
//    }
//}

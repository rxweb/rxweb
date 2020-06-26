using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using RxWeb.Core.AspNetCore.Binder;
using RxWeb.Core.AspNetCore.Extensions;
using RxWeb.Core.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RxWeb.Core.AspNetCore
{
    public abstract class BaseChildController<T,ListEntity,RecordEntity> : ControllerBase where T: class where ListEntity:class where RecordEntity : class
    {
        protected ICoreUnitOfWork Uow { get; set; }
        public BaseChildController(ICoreUnitOfWork uow) {
            this.Uow = uow;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public virtual async Task<IActionResult> Get([ModelBinder(typeof(QueryParamsBinder))]Dictionary<string, object> queryParams) => Ok(await this.Uow.Repository<ListEntity>().FindBySharedKeyAsync(queryParams));


        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get(int id) => Ok(await this.Uow.Repository<RecordEntity>().FindByKeyAsync(id));

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public virtual async Task<IActionResult> Post([FromBody]T entity)
        {
            await this.Uow.RegisterNewAsync<T>(entity);
            await Uow.CommitAsync();
            return Created($"{HttpContext.Request.Path.ToUriComponent()}/{ApplicationExtensions.GetKeyValue(entity)}", ApplicationExtensions.GetKeyValue(entity));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public virtual async Task<IActionResult> Put(int id, [FromBody]T entity)
        {
            await Uow.RegisterDirtyAsync<T>(entity);
            await Uow.CommitAsync();
            return NoContent();
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public virtual async Task<IActionResult> Patch(int id, [FromBody] JsonPatchDocument<T> entity)
        {
            var serverEntity = Uow.Repository<T>().FindByKey(id);
            entity.ApplyTo(serverEntity);
            return await Put(id, serverEntity);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public virtual async Task<IActionResult> Delete(int id)
        {
            var entity = Uow.Repository<T>().FindByKey(id);
            if (entity != null) {
                await Uow.RegisterDeletedAsync<T>(entity);
                await Uow.CommitAsync();
                return NoContent();
            }
            return NotFound();
        }
    }
}

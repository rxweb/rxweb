using Microsoft.AspNetCore.Mvc;
using RxWeb.Core.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RxWeb.Core.AspNetCore
{
    public abstract class BaseLookupController : ControllerBase 
    {
        protected ICoreUnitOfWork Uow { get; set; }
        public BaseLookupController(ICoreUnitOfWork uow)
        {
            this.Uow = uow;
        }

        protected virtual async Task<IEnumerable<T>> AllAsync<T>() where T : class =>
                                        await this.Uow.Repository<T>().AllAsync();

        protected IEnumerable<T> OrderBy<T>(Expression<Func<T, bool>> predicate) where T:class =>  this.Uow.Repository<T>().Queryable().OrderBy(predicate);

        protected IEnumerable<T> Where<T>(Expression<Func<T, bool>> predicate) where T : class => this.Uow.Repository<T>().FindBy(predicate);

    }
}

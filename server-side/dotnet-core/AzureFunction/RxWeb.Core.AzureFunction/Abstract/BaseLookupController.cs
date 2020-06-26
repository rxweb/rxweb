//using Microsoft.AspNetCore.Mvc;
//using RxWeb.Core.AspNetCore.Binder;
//using RxWeb.Core.Data;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Linq.Expressions;
//using System.Threading.Tasks;

//namespace RxWeb.Core.AspNetCore
//{
//    public abstract class BaseLookupController : ControllerBase 
//    {
//        protected ICoreUnitOfWork Uow { get; set; }
//        public BaseLookupController(ICoreUnitOfWork uow)
//        {
//            this.Uow = uow;
//        }

//        public virtual async Task<IEnumerable<T>> AllAsync<T>() where T : class =>
//                                        await this.Uow.Repository<T>().AllAsync();
         
//        public IEnumerable<T> OrderBy<T>(Expression<Func<T, bool>> predicate) where T:class =>  this.Uow.Repository<T>().Queryable().OrderBy(predicate);

//        public IEnumerable<T> Where<T>(Expression<Func<T, bool>> predicate) where T : class => this.Uow.Repository<T>().FindBy(predicate);

//    }
//}

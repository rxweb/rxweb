#region Namespace
using Microsoft.Extensions.DependencyInjection;
using CleanArchitecture.Infrastructure.Security;
using RxWeb.Core.Data;
using RxWeb.Core.Security;
using RxWeb.Core.Annotations;
using RxWeb.Core;
using CleanArchitecture.UnitOfWork.DbEntityAudit;
using CleanArchitecture.BoundedContext.Main;
            using CleanArchitecture.UnitOfWork.Main;
            #endregion Namespace



namespace CleanArchitecture.Api.Bootstrap
{
    public static class ScopedExtension
    {

        public static void AddScopedService(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IRepositoryProvider, RepositoryProvider>();
            serviceCollection.AddScoped<ITokenAuthorizer, TokenAuthorizer>();
            serviceCollection.AddScoped<IModelValidation, ModelValidation>();
			serviceCollection.AddScoped<IAuditLog, AuditLog>();
			serviceCollection.AddScoped<IApplicationTokenProvider, ApplicationTokenProvider>();
            serviceCollection.AddScoped(typeof(IDbContextManager<>), typeof(DbContextManager<>));
            #region ContextService

                        serviceCollection.AddScoped<ILoginContext, LoginContext>();
            serviceCollection.AddScoped<ILoginUow, LoginUow>();
            #endregion ContextService



            #region DomainService
            
            #endregion DomainService
        }
    }
}





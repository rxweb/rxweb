#region Namespace
using Microsoft.Extensions.DependencyInjection;
using $ext_safeprojectname$.Infrastructure.Security;
using RxWeb.Core.Data;
using RxWeb.Core.Security;
using RxWeb.Core.Annotations;
using RxWeb.Core;
using $ext_safeprojectname$.UnitOfWork.DbEntityAudit;
using $ext_safeprojectname$.BoundedContext.Main;
            using $ext_safeprojectname$.UnitOfWork.Main;
            #endregion Namespace



namespace $ext_safeprojectname$.Api.Bootstrap
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





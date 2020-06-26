#region Namespace
using Microsoft.Extensions.DependencyInjection;
using ContosoApplication.Infrastructure.Security;
using RxWeb.Core.Data;
using RxWeb.Core.Security;
using RxWeb.Core.Annotations;
using RxWeb.Core;
using ContosoApplication.UnitOfWork.DbEntityAudit;
using ContosoApplication.BoundedContext.Main;
using ContosoApplication.UnitOfWork.Main;
#endregion Namespace



namespace ContosoApplication.Api.Bootstrap
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

            #region ContextService

            serviceCollection.AddScoped<ILoginContext, LoginContext>();
            serviceCollection.AddScoped<ILoginUow, LoginUow>();
                        serviceCollection.AddScoped<IMasterContext, MasterContext>();
            serviceCollection.AddScoped<IMasterUow, MasterUow>();
            #endregion ContextService




            #region DomainService

            #endregion DomainService
        }
    }
}





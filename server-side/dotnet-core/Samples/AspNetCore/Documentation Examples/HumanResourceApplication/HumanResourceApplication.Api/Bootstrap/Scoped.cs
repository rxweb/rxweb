#region Namespace
using Microsoft.Extensions.DependencyInjection;
using HumanResourceApplication.Infrastructure.Security;
using RxWeb.Core.Data;
using RxWeb.Core.Security;
using RxWeb.Core.Annotations;
using RxWeb.Core;
using HumanResourceApplication.UnitOfWork.DbEntityAudit;
using HumanResourceApplication.BoundedContext.Main;
using HumanResourceApplication.UnitOfWork.Main;
using HumanResourceApplication.Domain.UserModule;
            #endregion Namespace




namespace HumanResourceApplication.Api.Bootstrap
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
                  serviceCollection.AddScoped<ICandidateContext, CandidateContext>();
            serviceCollection.AddScoped<ICandidateUow, CandidateUow>();
                        serviceCollection.AddScoped<ICandidateLookupContext, CandidateLookupContext>();
            serviceCollection.AddScoped<ICandidateLookupUow, CandidateLookupUow>();
                        serviceCollection.AddScoped<IUserContext, UserContext>();
            serviceCollection.AddScoped<IUserUow, UserUow>();
            #endregion ContextService






      #region DomainService

      
            serviceCollection.AddScoped<IUserDomain, UserDomain>();
            
            serviceCollection.AddScoped<IUserDomain, UserDomain>();
            
            serviceCollection.AddScoped<IUserDomain, UserDomain>();
            
            serviceCollection.AddScoped<IUserDomain, UserDomain>();
            
            serviceCollection.AddScoped<IUserDomain, UserDomain>();
            #endregion DomainService





    }
  }
}





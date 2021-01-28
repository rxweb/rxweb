#region Namespace
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using NewProjectSolution.BoundedContext.Main;
using NewProjectSolution.Infrastructure.Security;
using NewProjectSolution.UnitOfWork.DbEntityAudit;
using NewProjectSolution.UnitOfWork.Main;
using RxWeb.Core.Annotations;
using RxWeb.Core.Annotations.Interface;
using RxWeb.Core.Data;
using RxWeb.Core.Security;
#endregion Namespace





namespace NewProjectSolution.Api.Bootstrap
{
    public class ValidatorResponse : RxWeb.Core.Annotations.Interface.IValidatorResponse
    {
        public object CreateInvalidResponse(Dictionary<string, string> errors, string title)
        {
            return new { abc = "ab" };
        }
    }
    public static class ScopedExtension
    {

        public static void AddScopedService(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IRepositoryProvider, RepositoryProvider>();
            serviceCollection.AddScoped<ITokenAuthorizer, TokenAuthorizer>();
            serviceCollection.AddScoped<IModelValidation, ModelValidation>();
            serviceCollection.AddScoped<IAuditLog, AuditLog>();
            serviceCollection.AddScoped<IApplicationTokenProvider, ApplicationTokenProvider>();
            serviceCollection.AddScoped<IValidatorResponse, ValidatorResponse>();

            #region ContextService

            serviceCollection.AddScoped<ILoginContext, LoginContext>();
            serviceCollection.AddScoped<ILoginUow, LoginUow>();
                        serviceCollection.AddScoped<IMasterContext, MasterContext>();
            serviceCollection.AddScoped<IMasterUow, MasterUow>();
                        serviceCollection.AddScoped<IMasterContext, MasterContext>();
            serviceCollection.AddScoped<IMasterUow, MasterUow>();
                        serviceCollection.AddScoped<IMasterContext, MasterContext>();
            serviceCollection.AddScoped<IMasterUow, MasterUow>();
            #endregion ContextService








            #region DomainService
           
            #endregion DomainService



















        }
    }
}





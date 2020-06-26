
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using HumanResourceApplication.Api.Bootstrap;
using RxWeb.Core.Extensions;
using RxWeb.Core.AspNetCore.Extensions;
using Newtonsoft.Json.Serialization;

namespace HumanResourceApplication.Api
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {


      services.AddConfigurationOptions(Configuration);

      services.AddHttpContextAccessor();
      services.AddPerformance();
      services.AddSecurity(Configuration);
      services.AddSingletonService();
      services.AddScopedService();
      services.AddDbContextService();
      services.AddRxWebLocalization();
      services.AddControllers();
      services.AddSwaggerOptions();
      services.AddMvc(options =>
      {
        options.AddRxWebSanitizers();
        options.AddValidation();
      }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0).AddNewtonsoftJson(
          oo =>
          {
            var resolver = new CamelCasePropertyNamesContractResolver();
            if (resolver != null)
            {
              var res = resolver as DefaultContractResolver;
              res.NamingStrategy = null;
            }
            oo.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
          });

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UsePerformance();

      app.UseRouting();

      app.UseSecurity(env);



      app.UseStaticFiles();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers().RequireAuthorization(); ;
      });
    }
  }
}




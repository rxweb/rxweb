using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Serialization;
using PrimePro_Sample.Api.Bootstrap;
using RxWeb.Core.AspNetCore.Extensions;
using RxWeb.Core.Extensions;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container
builder.Services.AddConfigurationOptions(configuration);
builder.Services.AddHttpContextAccessor();
builder.Services.AddPerformance();
builder.Services.AddSecurity(configuration);
builder.Services.AddSingletonService();
builder.Services.AddScopedService();
builder.Services.AddDbContextService();
builder.Services.AddRxWebLocalization();
builder.Services.AddEndpointsApiExplorer(); // Required for Swagger
builder.Services.AddSwaggerOptions();

builder.Services.AddControllers()
    .AddNewtonsoftJson(oo =>
    {
        var resolver = new CamelCasePropertyNamesContractResolver();
        if (resolver != null)
        {
            var res = resolver as DefaultContractResolver;
            res.NamingStrategy = null;
        }
        oo.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });

// Build the app
var app = builder.Build();

// Configure middleware
app.UsePerformance();
app.UseRouting();
app.UseSecurity(app.Environment);
app.UseStaticFiles();

// Enable Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

app.Run();

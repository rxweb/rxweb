using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;

namespace HumanResourceApplication.Api.Bootstrap
{
  public static class SwaggerIntegration
  {
    public static void AddSwaggerOptions(this IServiceCollection serviceCollection)
    {
      serviceCollection.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "New Project", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
          Description = "JWT Authorization header using the Bearer scheme.",
          Name = "Authorization",
          In = ParameterLocation.Header,
          Type = SecuritySchemeType.ApiKey,
          Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement()
              {{new OpenApiSecurityScheme {
                                Reference = new OpenApiReference
                                {Type = ReferenceType.SecurityScheme,Id = "Bearer"},
                                Scheme = "oauth2",Name = "Bearer",In = ParameterLocation.Header},
                            new List<string>()
                        }
              });
      });
    }

    public static void UseSwaggerGen(this IApplicationBuilder applicationBuilder, IWebHostEnvironment environment)
    {
      if (environment.IsDevelopment())
      {
        applicationBuilder.UseSwagger();
        applicationBuilder.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "New Project"));
      }

    }
  }
}

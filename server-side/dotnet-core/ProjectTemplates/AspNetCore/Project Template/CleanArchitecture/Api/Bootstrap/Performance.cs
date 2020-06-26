using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.DependencyInjection;
using System.IO.Compression;
using System.Linq;

namespace $ext_safeprojectname$.Api.Bootstrap
{
    public static class Performance
    {
        public static void AddPerformance(this IServiceCollection serviceCollection)
        {

            serviceCollection.AddMemoryCache();

            serviceCollection.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
                options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[] { "image/svg+xml" });
            });


            serviceCollection.Configure<GzipCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Fastest;
            });

        }

        public static void UsePerformance(this IApplicationBuilder applicationBuilder)
        {
            applicationBuilder.UseResponseCompression();
        }
    }
}





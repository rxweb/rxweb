using Microsoft.EntityFrameworkCore.Infrastructure;

namespace RxWeb.Core.Data.Extensions
{
    internal static class SqlDbContextOptionExtensions
    {
        public static SqlServerDbContextOptionsBuilder AddConnectionResiliency(this SqlServerDbContextOptionsBuilder options, Dictionary<string, int> resiliencyOptions)
        {
            if (resiliencyOptions != null && resiliencyOptions.Keys.Count > 0)
                if (resiliencyOptions.ContainsKey(MAX_RETRY_COUNT) && resiliencyOptions.ContainsKey(MAX_RETRY_DELAY))
                    return options.EnableRetryOnFailure(resiliencyOptions[MAX_RETRY_COUNT], TimeSpan.FromMilliseconds(resiliencyOptions[MAX_RETRY_DELAY]), null);
                else if (resiliencyOptions.ContainsKey(MAX_RETRY_COUNT))
                    return options.EnableRetryOnFailure(resiliencyOptions[MAX_RETRY_COUNT]);
                else
                    return options.EnableRetryOnFailure();
            return options;
        }

        private static string MAX_RETRY_COUNT = "MaxRetryCount";

        public static string MAX_RETRY_DELAY = "MaxRetryDelay";
    }
}


using RxWeb.Core.Security.Authorization;
using System.Collections.Concurrent;

namespace RxWeb.Core.Security.Singleton
{
    internal static class PolicyProviderAdditionalValue
    {
        public static ConcurrentDictionary<string, AccessAtributeInfo> Values { get; set; } = new ConcurrentDictionary<string, AccessAtributeInfo>();
    }
}

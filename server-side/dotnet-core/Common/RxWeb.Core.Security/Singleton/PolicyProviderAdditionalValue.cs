using RxWeb.Core.Security.Authorization;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;

namespace RxWeb.Core.Security.Singleton
{
    internal static class PolicyProviderAdditionalValue
    {
        public static ConcurrentDictionary<string, AccessAtributeInfo> Values { get; set; } = new ConcurrentDictionary<string, AccessAtributeInfo>();
    }
}

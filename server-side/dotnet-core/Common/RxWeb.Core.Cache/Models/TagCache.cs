using System;

namespace RxWeb.Core.Cache
{
    internal class TagCache
    {
        public Type Controller { get; set; }

        public string Etag { get; set; }
    }
}

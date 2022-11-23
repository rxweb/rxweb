using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace RxWeb.Core.Cache
{
    public class CacheETag : ActionFilterAttribute
    {

        private Type Controller { get; set; }

        private Type[] Controllers { get; set; }

        public Type[] PostControllers { get; set; }

        public Type[] GetControllers { get; set; }

        public Type[] PutControllers { get; set; }

        public Type[] PatchControllers { get; set; }

        public Type[] DeleteControllers { get; set; }

        public int CacheMinutes { get; set; }

        public CacheETag()
        {
        }

        internal static ConcurrentDictionary<string, TagCache> etags = new ConcurrentDictionary<string, TagCache>();

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (Controller == null)
                Controller = context.Controller.GetType();
            TagCache tagCache;
            var request = context.HttpContext.Request;
            var requestMethod = request.Method.ToUpper();
            SetControllers(requestMethod);
            if (requestMethod == "GET")
            {
                var key = GetKey(request);
                if (etags.TryGetValue(key, out tagCache))
                {
                        if (context.HttpContext.Request.Headers.Keys.Contains(HeaderNames.IfNoneMatch) && context.HttpContext.Request.Headers[HeaderNames.IfNoneMatch].ToString() == tagCache.Etag)
                        {
                            context.Result = new StatusCodeResult(304);
                        }
                        else 
                            etags.TryRemove(key, out tagCache);
                }
            }
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            var request = context.HttpContext.Request;
            var key = GetKey(request);
            string etag = string.Empty;
            var isGet = request.Method == "GET";
            var isPutOrPost = request.Method == "PUT" || request.Method == "POST" || request.Method == "PATCH" || request.Method == "DELETE";
            TagCache tagCache;
            if (context.HttpContext.Response.StatusCode == 200 && (isGet) || isPutOrPost)
            {
                if (isGet)
                {
                    if (!etags.TryGetValue(key, out tagCache))
                    {
                        etag = Guid.NewGuid().ToString();
                        tagCache = new TagCache
                        {
                            Etag = etag,
                            Controller = Controller
                        };
                        etags.AddOrUpdate(key, tagCache, (k, val) => tagCache);
                    }
                    else
                    {
                        etag = tagCache.Etag;
                    }
                    if (!context.HttpContext.Response.Headers.Keys.Contains("ETag"))
                        context.HttpContext.Response.Headers.Add("ETag", etag);
                    SetResponseCacheControl(context.HttpContext.Response);
                }
                else
                {
                    RemoveRelatedKeys();
                }
            }
        }
        private string GetKey(HttpRequest request)
        {
            return request.Path.ToString().ToLower();
        }

        private void SetControllers(string requestMethod) {
            switch (requestMethod) {
                case "GET":
                    Controllers = this.GetControllers;
                    break;
                case "POST":
                    Controllers = this.PostControllers;
                    break;
                case "PUT":
                    Controllers = this.PutControllers;
                    break;
                case "PATCH":
                    Controllers = this.PatchControllers;
                    break;
                case "DELETE":
                    Controllers = this.DeleteControllers;
                    break;
            }
        }

        private void RemoveRelatedKeys()
        {
            var controllerKeys = etags.Where(t => t.Value.Controller == Controller).ToList();
            RemoveController(controllerKeys);
            if (Controllers != null && Controllers.Count() > 0)
                foreach (var controller in Controllers)
                {
                    controllerKeys = etags.Where(t => t.Value.Controller == controller).ToList();
                    RemoveController(controllerKeys);
                }
        }

        private void RemoveController(List<KeyValuePair<string, TagCache>> controllerKeys)
        {
            foreach (var key in controllerKeys)
            {
                TagCache tagCache;
                etags.TryRemove(key.Key, out tagCache);
            }
        }

        private void SetResponseCacheControl(HttpResponse response)
        {
            if (CacheMinutes > 0)
            {
                response.GetTypedHeaders().CacheControl = new CacheControlHeaderValue()
                {
                    MaxAge = TimeSpan.FromMinutes(CacheMinutes),
                    MustRevalidate = false,
                    Private = true
                };
            }

        }
    }
}

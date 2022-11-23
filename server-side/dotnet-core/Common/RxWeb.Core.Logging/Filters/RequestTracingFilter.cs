using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Generic;
using System.Linq;

namespace RxWeb.Core.Logging.Filters
{
    public class RequestTracing : ActionFilterAttribute
    {
        
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            var result = context.HttpContext.Items.SingleOrDefault(t => (t.Key as string) == TRACE);
            var itemObject = result.Value as Dictionary<string, object>;
            if (itemObject != null)
            {
                var traceRequest = context.Controller.GetType().GetCustomAttributes(typeof(TraceRequest), true).SingleOrDefault() as TraceRequest;
                if (traceRequest != null)
                {
                    var requestMethod = context.HttpContext.Request.Method.ToUpper();
                    var title = GetTitle(requestMethod, traceRequest);
                    var category = GetCategory(requestMethod, traceRequest);
                    itemObject["TraceTitle"] = title == string.Empty ? itemObject["Title"] : title;
                    itemObject["TraceType"] = category == string.Empty ? itemObject["TraceType"] : category;
                }
            }
            base.OnActionExecuted(context);
        }

        public string GetTitle(string method, TraceRequest traceRequest)
        {
            var text = string.Empty;
            switch (method)
            {
                case GET:
                    text = traceRequest.GetTitle;
                    break;
                case POST:
                    text = traceRequest.PostTitle;
                    break;
                case PUT:
                    text = traceRequest.PutTitle;
                    break;
                case PATCH:
                    text = traceRequest.PatchTitle;
                    break;
                case DELETE:
                    text = traceRequest.DeleteTitle;
                    break;

            }
            return text;
        }

        public string GetCategory(string method, TraceRequest traceRequest)
        {
            var text = string.Empty;
            switch (method)
            {
                case GET:
                    text = traceRequest.GetCategory;
                    break;
                case POST:
                    text = traceRequest.PostCategory;
                    break;
                case PUT:
                    text = traceRequest.PutCategory;
                    break;
                case PATCH:
                    text = traceRequest.PatchCategory;
                    break;
                case DELETE:
                    text = traceRequest.DeleteCategory;
                    break;

            }
            return text;
        }

        private const string GET = "GET";
        private const string POST = "POST";
        private const string PUT = "PUT";
        private const string PATCH = "PATCH";
        private const string DELETE = "DELETE";
        private const string TRACE = "TRACE";
    }
}

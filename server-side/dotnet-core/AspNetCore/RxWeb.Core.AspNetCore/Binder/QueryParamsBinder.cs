using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json.Linq;

namespace RxWeb.Core.AspNetCore.Binder
{
    public class QueryParamsBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var routeValues = bindingContext.ActionContext.RouteData.Values.Where(t => t.Key != "action" && t.Key != "controller");
            var model = new JObject();
            foreach (var query in bindingContext.HttpContext.Request.Query)
                model.Add(query.Key, new JValue(query.Value));
            foreach (var routeValue in routeValues)
                model.Add(routeValue.Key, Convert.ToInt32(routeValue.Value));
            bindingContext.Result = ModelBindingResult.Success(model);
            return Task.CompletedTask;
        }
    }
}

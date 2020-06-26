using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;

namespace RxWeb.Core.Annotations.Filters
{
    internal class ModelValidationFilter : IActionFilter, IOrderedFilter
    {
        internal const int ValidationFilterOrder = -3000;

        
        public int Order => ValidationFilterOrder;

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var modelValidation = (IModelValidation)context.HttpContext.RequestServices.GetService(typeof(IModelValidation));
            var argument = context.ActionArguments.LastOrDefault().Value;
            if (argument != null && modelValidation != null) {
                var result = modelValidation.Validate(argument, context.HttpContext);
                if (result != null) {
                    context.Result = new ObjectResult(result);
                    context.HttpContext.Response.StatusCode = 400;
                }
            }
        }
    }
}

using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System;

namespace RxWeb.Core.Annotations.Conventions
{
    public class ModelValidationFilterConvention : IApplicationModelConvention 
    {
        private readonly ModelValidationFilterFactory validationFilterFactory = new ModelValidationFilterFactory();

        public void Apply(ActionModel action)
        {
            if (action == null)
            {
                throw new ArgumentNullException(nameof(action));
            }

            if (!ShouldApply(action))
            {
                return;
            }

            action.Filters.Add(validationFilterFactory);
        }

        public void Apply(ApplicationModel application)
        {
            application.Filters.Add(validationFilterFactory);
        }

        protected virtual bool ShouldApply(ActionModel action) => true;
    }
}

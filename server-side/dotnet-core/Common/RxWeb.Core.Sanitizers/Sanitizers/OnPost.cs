using Microsoft.AspNetCore.Http;
using RxWeb.Core.Sanitizers.Enums;
using RxWeb.Core.Sanitizers.Interface;
using System.Security.Claims;

namespace RxWeb.Core.Sanitizers
{
    public class OnAction : Attribute, IActionSanitizer
    {
        private ActionValueType ValueType { get; set; }
        private string ActionType { get; set; }
        public OnAction(string actionType,ActionValueType valueType) {
            ValueType = valueType;
            ActionType = actionType;
        }

        public object Sanitize(object value,HttpContext context)
        {
            if (this.ActionType == context.Request.Method.ToUpper()) {
                switch (ValueType)
                {
                    case ActionValueType.DateTime:
                        value = DateTime.Now;
                        break;
                    case ActionValueType.DateTimeUtc:
                        value = DateTime.UtcNow;
                        break;
                    case ActionValueType.DateTimeOffsetUtc:
                        value = DateTimeOffset.UtcNow;
                        break;
                    case ActionValueType.NameClaimIdentifier:
                        var userClaim = context.User.Claims.FirstOrDefault(t => t.Type == ClaimTypes.NameIdentifier);
                        if (userClaim != null)
                            value = Convert.ToInt32(userClaim.Value);
                        break;
                }
            }
            return value;
        }
    }
}

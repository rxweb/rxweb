using RxWeb.Core.Sanitizers.Interface;
using System;
using System.Text.Encodings.Web;
using System.Text.Unicode;

namespace RxWeb.Core.Sanitizers
{
    public class EscapeText : Attribute, ISanitize
    {
        public object Sanitize(object value, object entity, object rootEntity)
        {
            if (!string.IsNullOrEmpty(value as string))
            {
                var htmlEncoder = HtmlEncoder.Create(allowedRanges: new[] { UnicodeRanges.BasicLatin,
                                               UnicodeRanges.CjkUnifiedIdeographs });
                return htmlEncoder.Encode(value as string);
            }
            return value;
        }
    }
}

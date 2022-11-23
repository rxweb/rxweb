using System;
using System.Linq.Expressions;

namespace RxWeb.Core.Data.Annotations
{
    public class HasOneAttribute : Attribute
    {

        public HasOneAttribute(string[] foreignKeys, string withMany = "", string[] principalKeys = null)
        {
            this.ForeignKeys = foreignKeys;
            this.WithMany = withMany;
            this.PrincipalKeys = principalKeys;
        }

        public string[] PrincipalKeys { get; set; }
        public string[] ForeignKeys { get; set; }
        public string WithMany { get; set; }
    }
}

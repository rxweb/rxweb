using System;

namespace RxWeb.Core.Data.Annotations
{
    public class RelationshipTableAttribue : Attribute
    {
        public RelationshipTableAttribue(string name, string schema, string primaryTextColumnName ="", string primaryKeyName = "",string secondaryKeyName = "")
        {
            Name = name;
            Schema = schema;
            PrimaryKeyName = primaryKeyName;
            SecondaryKeyName = secondaryKeyName;
            PrimaryTextColumnName = primaryTextColumnName;
        }

        public string Name { get; private set; }
        public string Schema { get; set; }

        public string PrimaryKeyName { get; set; }

        public string SecondaryKeyName { get; set; }

        public string PrimaryTextColumnName { get; set; }
    }
}

namespace RxWeb.Core.Data.Annotations
{
    public class DefaultSchema : Attribute
    {
        public DefaultSchema(string name) {
            SchemaName = name;
        }

        public string SchemaName { get; set; }
    }
}

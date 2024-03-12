namespace RxWeb.Core.Data.Models
{
    public class MultiTenantConfig
    {
        public DatabaseBased Database { get; set; } = new DatabaseBased();
        public SchemaBased Schema { get; set; } = new SchemaBased();
        public string TenantColumnName { get; set; }
    }
}


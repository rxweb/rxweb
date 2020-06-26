using RxWeb.Core.Annotations.Enums;

namespace RxWeb.Core.Annotations.Models
{
    public class UniqueQuery
    {
        public string ColumnName { get; set; }

        public SqlQueryOperator QueryOperator { get; set; }

        public object Value { get; set; }

    }
}

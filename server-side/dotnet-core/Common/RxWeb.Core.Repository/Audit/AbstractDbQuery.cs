using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using RxWeb.Core.Data.Annotations;
using System.Text;

namespace RxWeb.Core.Data.Audit
{
    internal abstract class AbstractDbQuery
    {
        public AbstractDbQuery(DatabaseFacade databaseFacade) {
            DatabaseFacade = databaseFacade;
        }

        public Dictionary<string, string> GetRelationshipColumnText(PropertyValues propertyValues)
        {
            var index = 0;
            var stringBuilder = new StringBuilder();
            var sqlCommand = new SqlCommand();
            var properties = propertyValues.Properties.Where(t => t.IsForeignKey());
            foreach (var property in properties)
            {
                var value = propertyValues[property.Name];
                if (value != null)
                {
                    var relationShipTable = property.PropertyInfo.GetCustomAttributes(typeof(RelationshipTableAttribue), false).SingleOrDefault() as RelationshipTableAttribue;
                    if (relationShipTable != null)
                    {
                        if (index != 0)
                            stringBuilder.Append(" UNION ALL ");
                        stringBuilder.Append($" select '{property.Name}' as PropertyName, {relationShipTable.PrimaryTextColumnName} as Name from {relationShipTable.Schema}.{relationShipTable.Name} where {relationShipTable.PrimaryKeyName} = @{relationShipTable.PrimaryKeyName}{index}");
                        sqlCommand.Parameters.Add(new SqlParameter($"@{relationShipTable.PrimaryKeyName}{index}", value));
                    }
                }
            }
            return GetResult(stringBuilder.ToString(), sqlCommand);
        }


        private Dictionary<string, string> GetResult(string commandText,SqlCommand sqlCommand) {
            var resultDictionary = new Dictionary<string, string>();
            if (!string.IsNullOrEmpty(commandText))
            {
                var sqlConnection = new SqlConnection(DatabaseFacade.GetDbConnection().ConnectionString);
                sqlCommand.CommandText = commandText;
                sqlCommand.Connection = sqlConnection;
                sqlConnection.Open();
                var reader = sqlCommand.ExecuteReader();
                while (reader.Read())
                    resultDictionary.Add(reader.GetString(0), reader.GetString(1));
                reader.Close();
                sqlConnection.Close();
                sqlConnection.Dispose();
            }
            return resultDictionary;
        }

        private DatabaseFacade DatabaseFacade { get; set; }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using RxWeb.Core.Annotations.Enums;
using RxWeb.Core.Annotations.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;

namespace RxWeb.Core.Annotations
{
    public class UniqueAttribute : BaseValidationAttribute, IValidator
    {
        private Type ConnectionType { get; set; }
        private string UniqueQueryMethod { get; set; }
        public UniqueAttribute(Type connection,string uniqueQueryMethod = null, string messageKey = null, string conditionalExpressionName = null,string dynamicConfigExpressionName = null) : base("unique", messageKey, conditionalExpressionName, dynamicConfigExpressionName)
        {
            this.ConnectionType = connection;
            this.UniqueQueryMethod = uniqueQueryMethod;
        }



        public string Validate(object value, HttpContext httpContext, PropertyInfo property,ILocalizationInfo localizationInfo)
        {
            var propertyValue = property.GetValue(value);
            if (this.IsContinue(value)) {
                if (this.HaveValue(propertyValue))
                {
                    var connection = (IDatabaseFacade)httpContext.RequestServices.GetService(this.ConnectionType);
                    if (connection != null)
                    {
                        var sqlConnection = new SqlConnection(connection.Database.GetDbConnection().ConnectionString);
                        var type = value.GetType();
                        var tableAttribute = type.GetCustomAttributes(typeof(TableAttribute), true).SingleOrDefault() as TableAttribute;
                        var primaryKeys = GetPrimaryKeys(type, value);
                        if (tableAttribute != null)
                        {
                            var sqlCommand = DesignQuery(value, property, primaryKeys, tableAttribute);
                            sqlCommand.Connection = sqlConnection;
                            sqlConnection.Open();
                            var reader = sqlCommand.ExecuteReader();
                            if (reader.HasRows)
                                this.Fail(localizationInfo);
                            sqlConnection.Close();
                            reader.Close();
                            sqlConnection.Dispose();
                        }
                    }
                }
            }
            if (this.ValidationMessage != null && value != null)
                this.ValidationMessage = this.ValidationMessage.Replace("{0}", property.Name).Replace("{1}", value.ToString());
            return this.ValidationMessage;
        }

        private SqlCommand DesignQuery(object value, PropertyInfo property, Dictionary<string,object> primaryKeys,TableAttribute tableAttribute)
        {
            var sqlCommand = new SqlCommand();
            var stringBuilder = new StringBuilder();
            foreach (var primaryKey in primaryKeys) {
                sqlCommand.Parameters.AddWithValue($"@{primaryKey.Key}", primaryKey.Value);
                stringBuilder.Append($"{GetClause(primaryKey.Key,"<>")} and ");
            }
            
            if (!string.IsNullOrEmpty(this.UniqueQueryMethod)) {
                var result = this.GetMethodResult<List<UniqueQuery>>(this.UniqueQueryMethod, value);
                if (result != null) {
                    foreach (var query in result) {
                        stringBuilder.Append($"{GetClause(query.ColumnName, SqlQueryOperator(query.QueryOperator))} and ");
                        sqlCommand.Parameters.AddWithValue($"@{query.ColumnName}", query.Value);
                    }
                }
            }
            stringBuilder.Append(GetClause(property.Name, "="));
            sqlCommand.Parameters.AddWithValue($"@{property.Name}", property.GetValue(value));
            sqlCommand.CommandText = $"select {property.Name} from {tableAttribute.Schema}.{tableAttribute.Name} where {stringBuilder.ToString()}";
            return sqlCommand;
        }

        private string GetClause(string propName,string logicalOperator) {
            return $"{propName} {logicalOperator} @{propName}";
        }

        private string SqlQueryOperator(SqlQueryOperator queryOperator) {
            var result = string.Empty;
            switch (queryOperator) {
                case Enums.SqlQueryOperator.Equal:
                    result = "=";
                    break;
                case Enums.SqlQueryOperator.NotEqual:
                    result = "<>";
                    break;
            }
            return result;
        }

        private Dictionary<string,object> GetPrimaryKeys(Type type, object value)
        {
            var primaryKeyProperties = type.GetProperties().Where(t => t.GetCustomAttributes(typeof(KeyAttribute), true).Count() > 0);
            var keyCollections = new Dictionary<string,object>();
            foreach (var property in primaryKeyProperties)
            {
                var propValue = property.GetValue(value);
                if (property.PropertyType == typeof(int) && (int)propValue != 0)
                    keyCollections.Add(property.Name,propValue);
            }
            return keyCollections;
        }

    }
}

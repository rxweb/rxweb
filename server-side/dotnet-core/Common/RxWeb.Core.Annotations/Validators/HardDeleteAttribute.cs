using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
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
    public class HardDeleteAttribute : BaseValidationAttribute, IValidator
    {
        private Type ConnectionType { get; set; }
        public HardDeleteAttribute(Type connection, string messageKey = null, string conditionalExpressionName = null,string dynamicConfigExpressionName = null) : base("unique", messageKey, conditionalExpressionName, dynamicConfigExpressionName)
        {
            this.ConnectionType = connection;
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
            return this.ValidationMessage;
        }

        private SqlCommand DesignQuery(object value, PropertyInfo property, Dictionary<string,object> primaryKeys,TableAttribute tableAttribute)
        {
            var sqlCommand = new SqlCommand();
            var stringBuilder = new StringBuilder();
            var spParameters = new object[2];
            spParameters[0] = new SqlParameter() { ParameterName = "TableName", Value = $"{tableAttribute.Schema}.{tableAttribute.Name }" };
            foreach (var primaryKey in primaryKeys) {
                spParameters[1] = new SqlParameter() { ParameterName = "RecordId", Value = primaryKey.Value };
            }
            sqlCommand.CommandText = $"spCanDeleteRecord";
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            return sqlCommand;
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

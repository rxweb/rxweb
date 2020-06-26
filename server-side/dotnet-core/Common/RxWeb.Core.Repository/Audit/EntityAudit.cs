using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using RxWeb.Core.Data.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace RxWeb.Core.Data.Audit
{
    internal class EntityAudit : AbstractDbQuery, IEntityAudit
    {
        public List<CoreAuditRecord> CoreAudits { get; set; }

        public EntityAudit(DatabaseFacade databaseFacade) : base(databaseFacade)
        {
            CoreAudits = new List<CoreAuditRecord>();
        }

        public void Log(PropertyValues newValues, PropertyValues oldValues, EntityState entityState)
        {
            var entityType = newValues.EntityType.ClrType;
            var tableAttribute = entityType.GetCustomAttributes(typeof(TableAttribute), false).SingleOrDefault() as TableAttribute;
            var keys = newValues.EntityType.FindPrimaryKey();

            var auditRecord = new CoreAuditRecord
            {
                KeyId = Convert.ToInt32(newValues[keys.Properties.First().Name]),
                EventType = entityState.ToString(),
                TableName = tableAttribute.Name,
                AuditRecordDetails = entityState == EntityState.Modified ? GetEntityColumnChangedInfo(newValues, oldValues) : GetEntityColumnValues(newValues)
            };
            if ((entityState == EntityState.Modified && auditRecord.AuditRecordDetails.Count > 0) || (entityState == EntityState.Added || entityState == EntityState.Deleted))
                CoreAudits.Add(auditRecord);
        }

        private List<CoreAuditRecordDetail> GetEntityColumnValues(PropertyValues newValues)
        {
            var auditRecordDetails = new List<CoreAuditRecordDetail>();
            var keys = newValues.EntityType.FindPrimaryKey();
            foreach (var property in newValues.Properties)
            {
                var oldValue = string.Empty;
                var newValue = newValues[property.Name];
                if (newValue != null && keys.Properties.Count(t => t.Name == property.Name) == 0)
                {
                    var auditRecordDetail = new CoreAuditRecordDetail
                    {
                        ColumnName = property.Name,
                        NewValue = newValue.ToString(),
                        OldValue = oldValue
                    };
                    auditRecordDetails.Add(auditRecordDetail);
                }

            }
            return auditRecordDetails;
        }

        public List<CoreAuditRecordDetail> GetEntityColumnChangedInfo(PropertyValues newValues, PropertyValues oldValues)
        {
            var auditRecordDetails = new List<CoreAuditRecordDetail>();
            var newRelationShipValues = GetRelationshipColumnText(newValues);
            var oldRelationShipValues = GetRelationshipColumnText(oldValues);
            foreach (var property in newValues.Properties)
            {
                var newValue = string.Empty;
                var oldValue = string.Empty;
                if (!newRelationShipValues.ContainsKey(property.Name))
                {
                    newValue = newValues[property.Name] != null ? newValues[property.Name].ToString() : string.Empty;
                    oldValue = oldValues[property.Name] != null ? oldValues[property.Name].ToString() : String.Empty;
                }
                else
                {
                    newValue = newRelationShipValues[property.Name];
                    oldValue = oldRelationShipValues[property.Name];
                }
                if (newValue != oldValue)
                {
                    var auditRecordDetail = new CoreAuditRecordDetail
                    {
                        ColumnName = property.Name,
                        NewValue = newValue,
                        OldValue = oldValue
                    };
                    auditRecordDetails.Add(auditRecordDetail);
                }
            }
            return auditRecordDetails;
        }
    }

    public interface IEntityAudit
    {
        void Log(PropertyValues newValues, PropertyValues oldValues, EntityState entityState);
    }
}

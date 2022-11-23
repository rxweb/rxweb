
using Microsoft.AspNetCore.Http;
using RxWeb.Core.Data;
using RxWeb.Core.Data.Models;
using System;
using System.Collections.Generic;

namespace ContosoApplication.UnitOfWork.DbEntityAudit
{
    public class AuditLog : IAuditLog
    {

        public AuditLog(IHttpContextAccessor contextAccessor)
        {
            HttpContext = contextAccessor.HttpContext;
        }
        public void Log(List<CoreAuditRecord> auditRecords)
        {
            var id = 0;
            if (HttpContext.Request.Method == PUT && HttpContext.Items.ContainsKey(KEY))
                id = Convert.ToInt32(HttpContext.Items[KEY]);
            if (!HttpContext.Items.ContainsKey(AUDIT_REQUEST))
            {
                var coreAuditRequest = new CoreAuditRequest();
                coreAuditRequest.KeyId = id;
                coreAuditRequest.TraceIdentifier = HttpContext.TraceIdentifier;
                coreAuditRequest.AuditRecords = auditRecords;
                HttpContext.Items.Add(AUDIT_REQUEST, coreAuditRequest);
            }
            else
            {
                var auditRequest = HttpContext.Items[AUDIT_REQUEST] as CoreAuditRequest;
                auditRequest.AuditRecords.AddRange(auditRecords);
            }

        }

        public void OnException(Exception ex)
        {
            if (!HttpContext.Items.ContainsKey(AUDIT_EXCEPTION))
                HttpContext.Items.Add(AUDIT_EXCEPTION, ex);
        }


        private HttpContext HttpContext { get; set; }

        const string AUDIT_REQUEST = "AUDITREQUEST";
        const string AUDIT_EXCEPTION = "AUDITEXCEPTION";
        const string PUT = "PUT";
        const string KEY = "KEY";
    }
}




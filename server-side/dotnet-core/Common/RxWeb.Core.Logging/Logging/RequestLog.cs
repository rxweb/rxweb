using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RxWeb.Core.Annotations;
using System.Security.Claims;

namespace RxWeb.Core.Logging
{
    public class RequestLogMiddleware
    {
        private readonly RequestDelegate next;

        private readonly Type DatabaseFacadeType;

        


        public RequestLogMiddleware(RequestDelegate _next, Type databaseFacadeType)
        {
            next = _next;
            DatabaseFacadeType = databaseFacadeType;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var requestHeaders = string.Empty;
            foreach (var header in httpContext.Request.Headers)
                requestHeaders += $"{header.Key}={header.Value};";
            var logService = httpContext.RequestServices.GetService(DatabaseFacadeType) as IDatabaseFacade;
            var dictionary = new Dictionary<string, object>();
            dictionary.Add("TraceIdentifier", httpContext.TraceIdentifier);
            dictionary.Add("UserId", string.Empty);
            dictionary.Add("TraceType", "Log");
            dictionary.Add("TraceTitle", "Standard Log");
            dictionary.Add("Uri", httpContext.Request.Host.Value);
            dictionary.Add("Verb", httpContext.Request.Method);
            dictionary.Add("ClientIp", httpContext.Connection.RemoteIpAddress.ToString());
            dictionary.Add("RequestHeader", requestHeaders);
            dictionary.Add("InTime", DateTime.UtcNow);
            httpContext.Items.Add("TRACE", dictionary);
            await next(httpContext);
            var logDictionary = new Dictionary<string, object>();
            var exceptionDictionary = new Dictionary<string, object>();
            if (httpContext.Items.ContainsKey("EXCEPTION"))
                logDictionary["exception"] = httpContext.Items["EXCEPTION"] as Dictionary<string, object>;
            var entityAudit = new Dictionary<string, object>();
            if (httpContext.Items.ContainsKey("AUDITREQUEST"))
                logDictionary["entityAudit"] = httpContext.Items["AUDITREQUEST"];
            if (httpContext.Items.ContainsKey("AUDITEXCEPTION"))
                logDictionary["auditException"] = httpContext.Items["AUDITEXCEPTION"] as Dictionary<string, object>;
            var responseHeaders = string.Empty;
            foreach (var header in httpContext.Response.Headers)
                responseHeaders += $"{header.Key}={header.Value};";
            dictionary.Add("ResponseHeader", responseHeaders);
            dictionary.Add("StatusCode", httpContext.Response.StatusCode);
            dictionary.Add("OutTime", DateTime.UtcNow);
            if (httpContext.User != null && httpContext.User.Claims != null)
            {
                var claim = httpContext.User.Claims.SingleOrDefault(t => t.Type == ClaimTypes.NameIdentifier);
                if (claim != null)
                    dictionary["UserId"] = claim.Value;
            }
            logDictionary["trace"] = dictionary;
            this.WriteLogAsync(logDictionary, logService);

        }


        private async Task WriteLogAsync(Dictionary<string, object> log, IDatabaseFacade logService)
        {
            try
            {
                var sqlConnection = new SqlConnection(logService.Database.GetDbConnection().ConnectionString);
                var sqlCommand = new SqlCommand();
                var serializeText = JsonConvert.SerializeObject(log);
                sqlCommand.Parameters.Add(new SqlParameter("@Log", serializeText.Replace("'",string.Empty)));
                sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
                sqlCommand.CommandText = "ApplicationLog";
                sqlCommand.Connection = sqlConnection;
                await sqlConnection.OpenAsync();
                await sqlCommand.ExecuteNonQueryAsync();
                sqlConnection.Close();
                sqlConnection.Dispose();
            }
            catch (Exception ex)
            {

            }
            

        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using NewProjectSolution.Models.Enums.Main;
using NewProjectSolution.BoundedContext.SqlContext;

namespace NewProjectSolution.Models.Main
{
    [Table("Persons",Schema="dbo")]
    [RecordLog]
    public partial class Developer
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int DeveloperId { get; set; }
    
        [TenantQueryFilter] // Single Database Multitenant
        public int ClientId { get; set; }

        [Unique(typeof(IMainDatabaseFacade))] //Unique Validation
        public string DeveloperName { get; set; }

        [Required(conditionalExpressionName:nameof(Developer.IsRequiredSkills))]
        public List<string> Skills { get; set; }

        [ValueConversion(typeof(EncryDecryValueConversion))]
        public string Email { get; set; }

        [OnAction("POST",RxWeb.Core.Sanitizers.Enums.ActionValueType.NameClaimIdentifier)]
        public int CreatedBy { get; set; }

        [TimeZoneValueConversion]
        public DateTimeOffset CreatedDate { get; set; }
	}

    public partial class Developer {
        public void IsRequiredSkills() { }
    }

    public class EncryDecryValueConversion { }

}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using HumanResourceApplication.Models.Enums.Main;
using HumanResourceApplication.BoundedContext.SqlContext;
namespace HumanResourceApplication.Models.Main
{
    [Table("Candidates",Schema="dbo")]
    public partial class Candidate
    {
		#region CandidateId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion CandidateId Annotations

        public int CandidateId { get; set; }

		#region FirstName Annotations

        [Required]
        [MaxLength(100)]
		#endregion FirstName Annotations

        public string FirstName { get; set; }

		#region EmailId Annotations

        [Required]
        [MaxLength(50)]
        [ValueConversion(typeof(EncryptDecryptConverter))]
        [Unique(connection: typeof(IMainDatabaseFacade))]
		#endregion EmailId Annotations

        public string EmailId { get; set; }

		#region CountryId Annotations

        [Range(1, int.MaxValue)]
        [Required]
		#endregion CountryId Annotations

        public int CountryId { get; set; }

		#region Designation Annotations

        [Required]
        [MaxLength(50)]
		#endregion Designation Annotations

        public string Designation { get; set; }

		#region Experience Annotations

        [Range(1, int.MaxValue)]
        [Required]
		#endregion Experience Annotations

        public int Experience { get; set; }


        public Candidate()
        {
        }
	}
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using RxWeb.Core.Annotations;
using RxWeb.Core.Data.Annotations;
using RxWeb.Core.Sanitizers;
using CleanArchitecture.Models.Enums.Main;
using CleanArchitecture.BoundedContext.SqlContext;
namespace CleanArchitecture.Models.Main
{
    [Table("ApplicationUserTokens",Schema="dbo")]
    public partial class ApplicationUserToken
    {
		#region ApplicationUserTokenId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion ApplicationUserTokenId Annotations

        public int ApplicationUserTokenId { get; set; }

		#region UserId Annotations

        [Range(1, int.MaxValue)]
        [Required]
        [RelationshipTableAttribue("Users","dbo","","UserId")]
		#endregion UserId Annotations

        public int UserId { get; set; }

		#region SecurityKey Annotations

        [Required]
        [MaxLength(200)]
		#endregion SecurityKey Annotations

        public string SecurityKey { get; set; }

		#region JwtToken Annotations

        [Required]
		#endregion JwtToken Annotations

        public string JwtToken { get; set; }

		#region AudienceType Annotations

        [Required]
        [MaxLength(50)]
		#endregion AudienceType Annotations

        public string AudienceType { get; set; }

		#region CreatedDateTime Annotations

        [Required]
		#endregion CreatedDateTime Annotations

        public System.DateTimeOffset CreatedDateTime { get; set; }

		#region User Annotations

        [HasOne(foreignKeys: new string[] { nameof(UserId),}, nameof(CleanArchitecture.Models.Main.User.ApplicationUserTokens))]
		#endregion User Annotations

        public virtual User User { get; set; }


        public ApplicationUserToken()
        {
        }
	}
}
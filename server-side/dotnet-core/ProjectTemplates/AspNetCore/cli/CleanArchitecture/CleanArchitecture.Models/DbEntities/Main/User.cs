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
    [Table("Users",Schema="dbo")]
    public partial class User
    {
		#region UserId Annotations

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [System.ComponentModel.DataAnnotations.Key]
		#endregion UserId Annotations

        public int UserId { get; set; }

		#region ApplicationLocaleId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion ApplicationLocaleId Annotations

        public int ApplicationLocaleId { get; set; }

		#region ApplicationTimeZoneId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion ApplicationTimeZoneId Annotations

        public int ApplicationTimeZoneId { get; set; }

		#region LanguageCode Annotations

        [Required]
        [MaxLength(3)]
		#endregion LanguageCode Annotations

        public string LanguageCode { get; set; }

		#region UserName Annotations

        [Required]
        [MaxLength(50)]
		#endregion UserName Annotations

        public string UserName { get; set; }

		#region Password Annotations

        [Required]
        [MaxLength(132)]
		#endregion Password Annotations

        public byte[] Password { get; set; }

		#region Salt Annotations

        [Required]
        [MaxLength(140)]
		#endregion Salt Annotations

        public byte[] Salt { get; set; }

		#region LoginBlocked Annotations

        [Required]
		#endregion LoginBlocked Annotations

        public bool LoginBlocked { get; set; }

		#region StatusId Annotations

        [Range(1,int.MaxValue)]
        [Required]
		#endregion StatusId Annotations

        public Status StatusId { get; set; }

		#region ApplicationUserTokens Annotations

        [InverseProperty("User")]
		#endregion ApplicationUserTokens Annotations

        public virtual ICollection<ApplicationUserToken> ApplicationUserTokens { get; set; }

		#region UserRoles Annotations

        [InverseProperty("User")]
		#endregion UserRoles Annotations

        public virtual ICollection<UserRole> UserRoles { get; set; }


        public User()
        {
			ApplicationUserTokens = new HashSet<ApplicationUserToken>();
			UserRoles = new HashSet<UserRole>();
        }
	}
}
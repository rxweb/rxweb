using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using RxWeb.Core;
using HumanResourceApplication.UnitOfWork.Main;
using HumanResourceApplication.Models.Main;
using RxWeb.Core.Security.Cryptography;

namespace HumanResourceApplication.Domain.UserModule
{
  public class UserDomain : IUserDomain
  {
    //private IPasswordHash PasswordHash { get; set; }
    //public UserDomain(IPasswordHash passwordHash)
    //{
    //  PasswordHash = passwordHash;
    //}

    public UserDomain(IUserUow uow)
    {
      this.Uow = uow;
    }

    public Task<object> GetAsync(User parameters)
    {
      throw new NotImplementedException();
    }

    public Task<object> GetBy(User parameters)
    {
      throw new NotImplementedException();
    }


    public HashSet<string> AddValidation(User entity)
    {
      return ValidationMessages;
    }

    public async Task AddAsync(User entity)
    {
      //var UserPassword = "admin";

      //PasswordResult passwordResult = PasswordHash.Encrypt(UserPassword);
      //entity.Password = passwordResult.Signature;
      //entity.Salt = passwordResult.Salt;
      await Uow.RegisterNewAsync(entity);
      await Uow.CommitAsync();
    }

    public HashSet<string> UpdateValidation(User entity)
    {
      return ValidationMessages;
    }

    public async Task UpdateAsync(User entity)
    {
      await Uow.RegisterDirtyAsync(entity);
      await Uow.CommitAsync();
    }

    public HashSet<string> DeleteValidation(User parameters)
    {
      return ValidationMessages;
    }

    public Task DeleteAsync(User parameters)
    {
      throw new NotImplementedException();
    }

    public IUserUow Uow { get; set; }

    private HashSet<string> ValidationMessages { get; set; } = new HashSet<string>();
  }

  public interface IUserDomain : ICoreDomain<User, User> { }
}

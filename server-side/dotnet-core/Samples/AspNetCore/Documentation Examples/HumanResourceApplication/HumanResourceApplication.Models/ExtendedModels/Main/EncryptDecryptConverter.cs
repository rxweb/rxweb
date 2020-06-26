using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Linq.Expressions;

public class EncryptDecryptConverter : ValueConverter<string, string>
{
  public static Expression<Func<string, string>> ConvertToProviderExpressions => (v) => ConvertToProviderExpressionsValue(v);

  public static Expression<Func<string, string>> ConvertFromProviderExpressions => (v) => ConvertFromProviderExpressionsValue(v);

  public static string ConvertToProviderExpressionsValue(string str)
  {
    return "XXXX";
  }

  public static string ConvertFromProviderExpressionsValue(string str)
  {
    return "XXXX";
  }

  public EncryptDecryptConverter()
      : base(ConvertToProviderExpressions, ConvertFromProviderExpressions) { }
}
﻿namespace RxWeb.Core.Common
{
    public interface IEmail
    {
        Task SendAsync(MailConfig config);
    }
}

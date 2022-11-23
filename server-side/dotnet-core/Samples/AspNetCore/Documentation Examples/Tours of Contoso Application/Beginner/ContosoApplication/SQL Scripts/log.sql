SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuditRecordDetails](
	[AuditRecordDetailId] [int] IDENTITY(1,1) NOT NULL,
	[AuditRecordId] [int] NULL,
	[ColumnName] [varchar](100) NOT NULL,
	[OldValue] [nvarchar](max) NULL,
	[NewValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AuditRecordDetails] PRIMARY KEY CLUSTERED 
(
	[AuditRecordDetailId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AuditRecords]    Script Date: 16-01-2020 16:35:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuditRecords](
	[AuditRecordId] [int] IDENTITY(1,1) NOT NULL,
	[AuditRequestId] [int] NOT NULL,
	[KeyId] [int] NOT NULL,
	[CompositeKeyId] [int] NULL,
	[EventType] [varchar](10) NOT NULL,
	[TableName] [varchar](100) NOT NULL,
 CONSTRAINT [PK_AuditRecords] PRIMARY KEY CLUSTERED 
(
	[AuditRecordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AuditRequests]    Script Date: 16-01-2020 16:35:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuditRequests](
	[AuditRequestId] [int] IDENTITY(1,1) NOT NULL,
	[TraceIdentifier] [varchar](50) NOT NULL,
	[KeyId] [int] NOT NULL,
	[CompositeKeyId] [int] NULL,
 CONSTRAINT [PK_AuditRequests] PRIMARY KEY CLUSTERED 
(
	[AuditRequestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExceptionLogs]    Script Date: 16-01-2020 16:35:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExceptionLogs](
	[ExceptionLogId] [int] IDENTITY(1,1) NOT NULL,
	[TraceIdentifier] [varchar](100) NOT NULL,
	[Message] [varchar](500) NOT NULL,
	[ExceptionType] [varchar](200) NOT NULL,
	[ExceptionSource] [varchar](max) NOT NULL,
	[StackTrace] [varchar](max) NOT NULL,
	[InnerExceptionMessage] [varchar](200) NULL,
	[InnerExceptionStackTrace] [varchar](max) NULL,
	[RequestBody] [varchar](max) NULL,
	[CreatedDate] [datetimeoffset](7) NOT NULL,
 CONSTRAINT [PK_ExceptionLog] PRIMARY KEY CLUSTERED 
(
	[ExceptionLogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RequestTraces]    Script Date: 16-01-2020 16:35:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RequestTraces](
	[TraceId] [int] IDENTITY(1,1) NOT NULL,
	[TraceIdentifier] [varchar](100) NOT NULL,
	[UserId] [int] NULL,
	[TraceType] [varchar](10) NOT NULL,
	[TraceTitle] [varchar](200) NOT NULL,
	[Uri] [varchar](1024) NOT NULL,
	[Verb] [varchar](10) NOT NULL,
	[ClientIp] [varchar](50) NOT NULL,
	[RequestHeader] [varchar](max) NOT NULL,
	[ResponseHeader] [varchar](max) NOT NULL,
	[StatusCode] [int] NOT NULL,
	[InTime] [datetimeoffset](7) NOT NULL,
	[OutTime] [datetimeoffset](7) NOT NULL,
 CONSTRAINT [PK_RequestTraces] PRIMARY KEY CLUSTERED 
(
	[TraceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[AuditRecordDetails]  WITH CHECK ADD  CONSTRAINT [FK_AuditRecordDetails_AuditRecords] FOREIGN KEY([AuditRecordId])
REFERENCES [dbo].[AuditRecords] ([AuditRecordId])
GO
ALTER TABLE [dbo].[AuditRecordDetails] CHECK CONSTRAINT [FK_AuditRecordDetails_AuditRecords]
GO
ALTER TABLE [dbo].[AuditRecords]  WITH CHECK ADD  CONSTRAINT [FK_AuditRecords_AuditRequests] FOREIGN KEY([AuditRequestId])
REFERENCES [dbo].[AuditRequests] ([AuditRequestId])
GO
ALTER TABLE [dbo].[AuditRecords] CHECK CONSTRAINT [FK_AuditRecords_AuditRequests]
GO
/****** Object:  StoredProcedure [dbo].[ApplicationLog]    Script Date: 16-01-2020 16:35:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ApplicationLog] @Log nvarchar(max)
AS
BEGIN
	DECLARE @Exception		NVARCHAR(MAX)
	DECLARE @EntityAudit	NVARCHAR(MAX)
	DECLARE @RequestTrace	NVARCHAR(MAX)
	DECLARE @AuditRecords	NVARCHAR(MAX)
	DECLARE @AuditRequestId INT
	DECLARE @AuditRecordId	INT
	DECLARE @AuditRecordDetails NVARCHAR(MAX)

	--DECLARE @Log nvarchar(max)=N'{  "exception": {    "TraceIdentifier": "800001c1-0002-fc00-b63f-84710c7967bb",    "Message": "Attempted to divide by zero.",    "ExceptionType": "System.DivideByZeroException",    "ExceptionSource": "NewProjectSolution.Api",    "StackTrace": "   at NewProjectSolution.Api.Controllers.AuthenticationController.Post(AuthenticationModel authentication) in D:\\Git-Project\\RxWebCore\\src\\RxWebCoreSample\\NewProjectSolution.Api\\Controllers\\Api\\Core\\AuthenticationController.cs:line 44\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ActionMethodExecutor.TaskOfIActionResultExecutor.Execute(IActionResultTypeMapper mapper, ObjectMethodExecutor executor, Object controller, Object[] arguments)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.<InvokeActionMethodAsync>g__Logged|12_1(ControllerActionInvoker invoker)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.<InvokeNextActionFilterAsync>g__Awaited|10_0(ControllerActionInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Rethrow(ActionExecutedContextSealed context)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.<InvokeInnerFilterAsync>g__Awaited|13_0(ControllerActionInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeNextResourceFilter>g__Awaited|24_0(ResourceInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.Rethrow(ResourceExecutedContextSealed context)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeFilterPipelineAsync>g__Awaited|19_0(ResourceInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeAsync>g__Logged|17_1(ResourceInvoker invoker)\r\n   at Microsoft.AspNetCore.Routing.EndpointMiddleware.<Invoke>g__AwaitRequestTask|6_0(Endpoint endpoint, Task requestTask, ILogger logger)\r\n   at Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware.<Invoke>g__Awaited|6_0(ExceptionHandlerMiddleware middleware, HttpContext context, Task task)",    "InnerExceptionMessage": "",    "InnerExceptionStackTrace": "",    "RequestBody": "",    "CreatedDate": "2019-12-10T09:44:36.4862351Z"  },  "entityAudit": {    "TraceIdentifier": "800001c1-0002-fc00-b63f-84710c7967bb",    "KeyId": 0,    "CompositeKeyId": null,    "AuditRecords": [      {        "KeyId": 10,        "CompositeKeyId": null,        "EventType": "Added",        "TableName": "Persons",        "AuditRecordDetails": [          {            "ColumnName": "IsActive",            "OldValue": "",            "NewValue": "True"          },          {            "ColumnName": "PersonName",            "OldValue": "",            "NewValue": "Ajay Ojha"          }        ]      }    ]  },  "trace": {    "TraceIdentifier": "800001c1-0002-fc00-b63f-84710c7967bb",    "UserId": "",    "TraceType": "Log",    "TraceTitle": "Standard Log",    "Uri": "localhost:44394",    "Verb": "POST",    "ClientIp": "::1",    "RequestHeader": "Accept=*/*;Accept-Encoding=gzip, deflate;Cache-Control=no-cache;Connection=keep-alive;Content-Length=71;Content-Type=application/json;Host=localhost:44394;User-Agent=PostmanRuntime/7.20.1;Postman-Token=e9b1c030-6ee9-4127-864a-3fd9d3ec3d64;",    "InTime": "2019-12-10T09:43:42.4152897Z",    "ResponseHeader": "Content-Type=application/json;;Cache-Control=no-cache;Pragma=no-cache;Expires=-1;",    "StatusCode": 500,    "OutTime": "2019-12-10T09:44:38.1641055Z"  }}'
	Select @Exception=exception,@EntityAudit=entityAudit,@RequestTrace=trace from OPENJSON(@Log)
	with 
	(
		exception nvarchar(max) as json,
		entityAudit nvarchar(max) as json,
		trace nvarchar(max) as json
	)

	SELECT 
			@AuditRecords=AuditRecords
	FROM 
			OPENJSON(@EntityAudit)
	WITH
	(
				[AuditRecords] nvarchar(max)	as JSON--	'$.entityAudit.AuditRecords'
	)

	SELECT 
			@AuditRecordDetails=AuditRecordDetails
	FROM 
			OPENJSON(@AuditRecords)
	WITH
	(
				AuditRecordDetails nvarchar(max) as jSON
	)
	
	--0. INSERT INTO ExceptionLogs
	EXEC spExceptionLogInsert @Exception 

	--1. Insert into RequestTraces
	EXEC spRequestTraceInsert @RequestTrace

	--2. Insert into AuditRequests -- Get last Id--Pending
	EXEC spAuditRequestInsert @EntityAudit, @AuditRequestId OUT

	--3. Insert into AuditRecords
	EXEC spAuditRecordInsert @AuditRecords,  @AuditRequestId,  @AuditRecordId OUT

	--4. INSERT INTO AuditRecordDetail
	EXEC spAuditRecordDetailInsert @AuditRecordDetails,  @AuditRecordId 

	return 1;
END


GO
/****** Object:  StoredProcedure [dbo].[spAuditRecordDetailInsert]    Script Date: 16-01-2020 16:35:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--DECLARE @AuditRecordDetails nvarchar(max)='[          {            "ColumnName": "IsActive",            "OldValue": "",            "NewValue": "True"          },          {            "ColumnName": "PersonName",            "OldValue": "",            "NewValue": "Ajay Ojha"          }        ]'
--DECLARE @AuditRecordId int
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spAuditRecordDetailInsert](@AuditRecordDetails nvarchar(max), @AuditRecordId int)
AS
BEGIN
		DECLARE @AuditRecordDetailRecord nvarchar(max)

		DECLARE cur_AuditRecordDetails CURSOR
		FOR
		Select VALUE from OPENJSON(@AuditRecordDetails)
		OPEN cur_AuditRecordDetails 
		FETCH NEXT FROM cur_AuditRecordDetails INTO @AuditRecordDetailRecord     
		WHILE @@FETCH_STATUS = 0          
		BEGIN
		
				INSERT INTO AuditRecordDetails
				(
						AuditRecordId
						,ColumnName
						,OldValue
						,NewValue
				)
				SELECT         
						@AuditRecordId
						,ColumnName 
						,OldValue
						,NewValue        
				FROM        
						OPENJSON(@AuditRecordDetailRecord)        
				with         
					  (        
					   ColumnName nvarchar(50) '$.ColumnName',        
					   OldValue nvarchar(MAX) '$.OldValue',        
					   NewValue nvarchar(MAX) '$.NewValue'        
					  ) 
				FETCH NEXT FROM cur_AuditRecordDetails INTO @AuditRecordDetailRecord     
		END
		CLOSE cur_AuditRecordDetails          
		DEALLOCATE cur_AuditRecordDetails  
END
GO
/****** Object:  StoredProcedure [dbo].[spAuditRecordInsert]    Script Date: 16-01-2020 16:35:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--DECLARE @AuditRecordId int
--DECLARE @AuditRecords nvarchar(max)='[      {        "KeyId": 10,        "CompositeKeyId": null,        "EventType": "Added",        "TableName": "Persons",        "AuditRecordDetails": [          {            "ColumnName": "IsActive",            "OldValue": "",            "NewValue": "True"          },          {            "ColumnName": "PersonName",            "OldValue": "",            "NewValue": "Ajay Ojha"          }        ]      }    ]'

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spAuditRecordInsert] (@AuditRecords nvarchar(max),  @AuditRequestId int,  @AuditRecordId int OUT)
AS
BEGIN

		INSERT INTO [dbo].[AuditRecords]
				   (
					[AuditRequestId]
				   ,[KeyId]
				   ,[CompositeKeyId]
				   ,[EventType]
				   ,[TableName]
				   )

		SELECT 
					@AuditRequestId
					,KeyId
					,CompositeKeyId
					,EventType
					,TableName
		FROM 
				OPENJSON(@AuditRecords)
		WITH
			(
					
					[KeyId] [int]					'$.KeyId',
					[CompositeKeyId] [int]			'$.CompositeKeyId',
					[EventType] nvarchar(10)		'$.EventType',
					[TableName] varchar(100)		'$.TableName'
			)

		SET @AuditRecordId=SCOPE_IDENTITY()
END
GO
/****** Object:  StoredProcedure [dbo].[spAuditRequestInsert]    Script Date: 16-01-2020 16:35:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spAuditRequestInsert](@EntityAudit nvarchar(max), @AuditRequestId int OUT)
as
BEGIN
		INSERT INTO [dbo].[AuditRequests]
				   ([TraceIdentifier]
				   ,[KeyId]
				   ,[CompositeKeyId])
		SELECT TraceIdentifier, KeyId, CompositeKeyId
		FROM OPENJSON(@EntityAudit)
		WITH
			(
		
					[TraceIdentifier] [varchar](100) '$.TraceIdentifier',
					[KeyId] [int]					'$.KeyId',
					[CompositeKeyId] [int]			'$.CompositeKeyId',
					[AuditRecords] nvarchar(max)	as JSON--	'$.entityAudit.AuditRecords'
			)
		SET @AuditRequestId=SCOPE_IDENTITY()
	--Select * from AuditRequests(nolock)
END

GO
/****** Object:  StoredProcedure [dbo].[spExceptionLogInsert]    Script Date: 16-01-2020 16:35:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
--DECLARE @Exception nvarchar(max)= '{    "TraceIdentifier": "800001c1-0002-fc00-b63f-84710c7967bb",    "Message": "Attempted to divide by zero.",    "ExceptionType": "System.DivideByZeroException",    "ExceptionSource": "NewProjectSolution.Api",    "StackTrace": "   at NewProjectSolution.Api.Controllers.AuthenticationController.Post(AuthenticationModel authentication) in D:\\Git-Project\\RxWebCore\\src\\RxWebCoreSample\\NewProjectSolution.Api\\Controllers\\Api\\Core\\AuthenticationController.cs:line 44\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ActionMethodExecutor.TaskOfIActionResultExecutor.Execute(IActionResultTypeMapper mapper, ObjectMethodExecutor executor, Object controller, Object[] arguments)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.<InvokeActionMethodAsync>g__Logged|12_1(ControllerActionInvoker invoker)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.<InvokeNextActionFilterAsync>g__Awaited|10_0(ControllerActionInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Rethrow(ActionExecutedContextSealed context)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.<InvokeInnerFilterAsync>g__Awaited|13_0(ControllerActionInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeNextResourceFilter>g__Awaited|24_0(ResourceInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.Rethrow(ResourceExecutedContextSealed context)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.Next(State& next, Scope& scope, Object& state, Boolean& isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeFilterPipelineAsync>g__Awaited|19_0(ResourceInvoker invoker, Task lastTask, State next, Scope scope, Object state, Boolean isCompleted)\r\n   at Microsoft.AspNetCore.Mvc.Infrastructure.ResourceInvoker.<InvokeAsync>g__Logged|17_1(ResourceInvoker invoker)\r\n   at Microsoft.AspNetCore.Routing.EndpointMiddleware.<Invoke>g__AwaitRequestTask|6_0(Endpoint endpoint, Task requestTask, ILogger logger)\r\n   at Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware.<Invoke>g__Awaited|6_0(ExceptionHandlerMiddleware middleware, HttpContext context, Task task)",    "InnerExceptionMessage": "",    "InnerExceptionStackTrace": "",    "RequestBody": "",    "CreatedDate": "2019-12-10T09:44:36.4862351Z"  }'
CREATE PROCEDURE [dbo].[spExceptionLogInsert] (@Exception nvarchar(max))
AS
BEGIN
		INSERT INTO [dbo].[ExceptionLogs]
						(
							[TraceIdentifier]
						   ,[Message]
						   ,[ExceptionType]
						   ,[ExceptionSource]
						   ,[StackTrace]
						   ,[InnerExceptionMessage]
						   ,[InnerExceptionStackTrace]
						   ,[RequestBody]
						   ,[CreatedDate]
						 )
		SELECT 
						[TraceIdentifier]			
						,[Message]					
						,[ExceptionType]				
						,[ExceptionSource]			
						,[StackTrace]				
						,[InnerExceptionMessage]		
						,[InnerExceptionStackTrace]	
						,[RequestBody]				
						,[CreatedDate]				
		FROM 
						OPENJSON(@Exception)
		WITH
			(
						[TraceIdentifier]			[varchar](100) '$.TraceIdentifier',
						[Message]					[varchar](500) '$.Message',
						[ExceptionType]				[varchar](200) '$.ExceptionType',
						[ExceptionSource]			[varchar] (max)'$.ExceptionSource',
						[StackTrace]				[varchar] (max)'$.StackTrace',
						[InnerExceptionMessage]		[varchar](200) '$.InnerExceptionMessage',
						[InnerExceptionStackTrace]	[varchar](max) '$.InnerExceptionStackTrace',
						[RequestBody]				[varchar](max) '$.RequestBody' ,
						[CreatedDate]				[datetimeoffset](7) '$.CreatedDate'
			)
END
GO
/****** Object:  StoredProcedure [dbo].[spRequestTraceInsert]    Script Date: 16-01-2020 16:35:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[spRequestTraceInsert] (@RequestTrace nvarchar(max))
AS
BEGIN
		INSERT INTO 
		RequestTraces([TraceIdentifier]
				     ,[UserId]
				     ,[TraceType]
				     ,[TraceTitle]
				     ,[Uri]
				     ,[Verb]
				     ,[ClientIp]
				     ,[RequestHeader]
				     ,[ResponseHeader]
				     ,[StatusCode]
				     ,[InTime]
				     ,[OutTime])
		Select [TraceIdentifier]
			  ,[UserId]
			  ,[TraceType]
			  ,[TraceTitle]
			  ,[Uri]
			  ,[Verb]
			  ,[ClientIp]
			  ,[RequestHeader]
			  ,[ResponseHeader]
			  ,[StatusCode]
			  ,[InTime]
			  ,[OutTime] from OPENJSON(@RequestTrace)
		WITH
		(
			[TraceIdentifier] [varchar](100)		'$.TraceIdentifier',
			[UserId] [int]							'$.UserId',
			[TraceType] [varchar](10)				'$.TraceType',
			[TraceTitle] [varchar](200)				'$.TraceTitle',
			[Uri] [varchar](1024)					'$.Uri',
			[Verb] [varchar](10)					'$.Verb',
			[ClientIp] [varchar](50)				'$.ClientIp',
			[RequestHeader] [varchar](max)			'$.RequestHeader',
			[ResponseHeader] [varchar](max)			'$.ResponseHeader',
			[StatusCode] [int]						'$.StatusCode',
			[InTime] [datetimeoffset](7)			'$.InTime',
			[OutTime] [datetimeoffset](7)			'$.OutTime'
		)

END
GO
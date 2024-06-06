# Prerequisites
- .NET 8 SDK
- SQL Server or any other compatible database.
- Visual Studio 2022 or Visual Studio Code with C# extensions.

# Getting Started
## Clone the Repository

git clone "github-url"

#### Update the appsettings.json file with your database connection string:
```
"ConnectionStrings": {
    "DefaultConnection": "Server=your_server_name;Database=your_database_name;Trusted_Connection=true;TrustServerCertificate=true;"
}
```

####### Start the projects for both frontend and backend

Open the Package Manager Console in Visual Studio. Run the following command to apply migrations and create the database.
```
dotnet ef database update
```


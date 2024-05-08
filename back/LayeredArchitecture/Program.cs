
var builder = WebApplication.CreateBuilder(args);
//builder.Services.Add<IService, IDriver
builder.Services.AddControllers();
builder.Services.AddServices();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddSingleton<IPassengerService, PassengerService>();
var provider = builder.Services.BuildServiceProvider();
var configuration = provider.GetRequiredService<IConfiguration>();
//builder.Services.AddCors(options =>
//{
//    var frontedURL = configuration.GetValue<string>("fronted_url");
//    options.AddDefaultPolicy(builder =>
//    {
//        builder.WithOrigins(frontedURL).AllowAnyMethod().AllowAnyHeader();
//    });

//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors();
app.UseAuthorization();
app.MapControllers();
app.Run();




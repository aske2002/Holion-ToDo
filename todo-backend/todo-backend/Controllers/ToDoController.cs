using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;
using System.Text.Json.Serialization;
using todo_backend.Authentication;
using todo_backend.Authentication.DBModels;
using todo_backend.Models;

namespace todo_backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ApplicationDbContext dbContext;
        private readonly IConfiguration _configuration;

        public ToDoController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, ApplicationDbContext dbContext)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.dbContext = dbContext;
            _configuration = configuration;
        }
        private Task<ApplicationUser> GetCurrentUserAsync() => userManager.GetUserAsync(User);

        [HttpGet(Name = "GetToDos")]
        public async Task<IEnumerable<ToDoModel>> Get()
        {
            ApplicationUser user = await GetCurrentUserAsync();
            return this.dbContext.ToDoItems.Where(e => e.ApplicationUser.Id == user.Id).OrderByDescending(e => e.CreateDate).ToList().ConvertAll<ToDoModel>(item => new ToDoModel(item));
        }

        [HttpPost(Name = "AddToDo")]
        public async Task<ToDoModel> Post(AddToDoModel model)
        {
            ApplicationUser user = await GetCurrentUserAsync();
            ToDoItem item = new ToDoItem { ItemName = model.ItemName, ApplicationUser = user, CreateDate = model.DateCreate, IsComplete = false };
            dbContext.ToDoItems.Add(item);
            await dbContext.SaveChangesAsync();
            return new ToDoModel(item);

        }

        [HttpPut(Name = "EditToDo")]
        public async Task<ToDoModel> Put(EditToDoModel model)
        {
            ApplicationUser user = await GetCurrentUserAsync();
            ToDoItem item = dbContext.ToDoItems.FirstOrDefault(e => e.Id == model.Id);
            if (item == null)
            {
                var response = new HttpResponseMessage(HttpStatusCode.BadRequest);
                response.Content = new StringContent("No ToDo with given Id.");
                throw new HttpResponseException(response);
            }
            if (user != item.ApplicationUser)
            {
                var response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                response.Content = new StringContent("Not owner of ToDo.");
                throw new HttpResponseException(response);
            }
            if (item.IsComplete != model.IsComplete)
            {
                item.IsComplete = model.IsComplete;
            }
            if (item.ItemName != model.ItemName)
            {
                item.ItemName = model.ItemName;
            }
            await dbContext.SaveChangesAsync();
            return new ToDoModel(item);

        }

        [HttpDelete(Name = "DelteToDo")]
        public async Task<ToDoModel> Delete(int ToDoId)
        {
            ApplicationUser user = await GetCurrentUserAsync();
            ToDoItem item = dbContext.ToDoItems.FirstOrDefault(e => e.Id == ToDoId);
            if (item == null)
            {
                var response = new HttpResponseMessage(HttpStatusCode.BadRequest);
                response.Content = new StringContent("No ToDo with given Id.");
                throw new HttpResponseException(response);
            }
            if (user != item.ApplicationUser)
            {
                var response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                response.Content = new StringContent("Not owner of ToDo.");
                throw new HttpResponseException(response);
            }
            dbContext.ToDoItems.Remove(item);
            await dbContext.SaveChangesAsync();
            return new ToDoModel(item);

        }
    }
}
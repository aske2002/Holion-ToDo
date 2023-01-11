using Microsoft.AspNetCore.Identity;
using todo_backend.Authentication.DBModels;

namespace todo_backend.Authentication
{        
    public class ApplicationUser : IdentityUser
    {
        public ICollection<ToDoItem> ToDoItems { get; set; }  
    }

}

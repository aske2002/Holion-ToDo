using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todo_backend.Authentication.DBModels
{
    public class ToDoItem
    {
        [Key]
        public int Id { get; set; }

        public ApplicationUser ApplicationUser { get; set; }     
        
        public string ItemName { get; set; }

        public bool IsComplete { get; set; }
        public DateTime CreateDate { get; set; }

    }
}

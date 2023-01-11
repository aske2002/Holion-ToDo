using System.ComponentModel.DataAnnotations;

namespace todo_backend.Models
{
    public class AddToDoModel
    {
        public AddToDoModel()
        {
            this.DateCreate = DateTime.Now;
        }

        [Required]
        public string ItemName { get; set; }

        [Required]
        public bool IsComplete { get; set; }

        public DateTime DateCreate { get; set; }
    }
}

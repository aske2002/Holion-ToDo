using System.ComponentModel.DataAnnotations;

namespace todo_backend.Models
{
    public class EditToDoModel
    {
        public string? ItemName { get; set; }

        public bool? IsComplete { get; set; }

        [Required]
        public int Id { get; set; }
    }
}

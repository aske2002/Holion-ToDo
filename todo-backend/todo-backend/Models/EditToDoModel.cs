using System.ComponentModel.DataAnnotations;

namespace todo_backend.Models
{
    public class EditToDoModel
    {
        [Required]
        public string ItemName { get; set; }

        [Required]
        public bool IsComplete { get; set; }

        [Required]
        public int Id { get; set; }

        public DateTime DateCreate { get; set; }
    }
}

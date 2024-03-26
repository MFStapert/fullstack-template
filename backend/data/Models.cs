using System.ComponentModel.DataAnnotations;

namespace App.Models
{
    public class Test
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public required string Text { get; set; }

    }
}
using System.ComponentModel.DataAnnotations;

namespace FinalExam.API.Data
{
    public class Entertainer
    {
        [Key]
        public int EntertainerID { get; set; }
        
        [Required]
        public string EntStageName { get; set; }
        
        [Required]
        public string EntSSN { get; set; }
        [Required]
        public string EntStreetAddress { get; set; }
        
        [Required]
        public string EntCity { get; set; }
        
        [Required]
        public string EntState { get; set; }
        
        [Required]
        public string EntZipCode { get; set; }

        [Required]
        public string EntPhoneNumber { get; set; }
        [Required]
        public string EntWebPage { get; set; }
        [Required]
        public string EntEmailAddress { get; set; }
        [Required]
        public string DateEntered { get; set; }

    }
}

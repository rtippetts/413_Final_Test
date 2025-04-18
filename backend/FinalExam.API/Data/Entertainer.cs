using System.ComponentModel.DataAnnotations;

namespace FinalExam.API.Data
{
    // Represents an entertainer record from the database
    public class Entertainer
    {
        [Key]
        public int EntertainerID { get; set; }

        // Core identifying and contact fields
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

        // Optional fields — null allowed in database
        // These are nullable because some entertainers may not have a web page or email address on file
        public string? EntWebPage { get; set; }

        public string? EntEmailAddress { get; set; }

        [Required]
        public string DateEntered { get; set; }
    }
}

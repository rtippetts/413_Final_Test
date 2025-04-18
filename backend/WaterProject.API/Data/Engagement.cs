using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalExam.API.Data
{
    // Represents a single entertainer booking/engagement
    public class Engagement
    {
        [Key]
        public int EngagementNumber { get; set; }  // Primary key for this engagement

        // Engagement scheduling details
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string StartTime { get; set; }
        public string StopTime { get; set; }

        public decimal ContractPrice { get; set; }  // Agreed price for the engagement

        // Foreign key relationships
        public int CustomerID { get; set; }  // Who booked the entertainer
        public int AgentID { get; set; }     // Who arranged the booking

        [ForeignKey("Entertainer")]
        public int EntertainerID { get; set; }  // Links to the entertainer who was booked

        // Navigation property allows EF to automatically join with the Entertainer table
        public Entertainer Entertainer { get; set; }  // Optional but useful for querying full entertainer details
    }
}

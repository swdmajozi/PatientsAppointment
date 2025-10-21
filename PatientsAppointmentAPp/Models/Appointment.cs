using System.ComponentModel.DataAnnotations;

namespace PatientsAppointmentApp.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required, StringLength(100)]
        public string PatientName { get; set; }

        [Required, EmailAddress]
        public string PatientEmail { get; set; }

        [Phone]
        public string PatientPhone { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [StringLength(500)]
        public string Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

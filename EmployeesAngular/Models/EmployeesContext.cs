using Microsoft.EntityFrameworkCore;

namespace EmployeesSQLServer.Models
{
    public class EmployeesContext : DbContext
    {
        public EmployeesContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<Employee> Employees { get; set; }
    }
}

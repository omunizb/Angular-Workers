using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesSQLServer.Models
{
    public class Employee
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Job { get; set; }
        public float Salary { get; set; }
    }
}

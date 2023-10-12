using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistance
{
    public class MyContext : DbContext
    {
        public virtual DbSet<Activity> Activities { get; set; }

        public MyContext(DbContextOptions options) : base(options)
        {
        }
    }
}

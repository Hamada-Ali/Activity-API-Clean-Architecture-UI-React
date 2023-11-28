using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistance
{
    public class MyContext : IdentityDbContext<AppUser>
    {
        public virtual DbSet<Activity> Activities { get; set; }

        public MyContext(DbContextOptions options) : base(options)
        {
        }
    }
}

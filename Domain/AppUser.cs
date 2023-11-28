using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } // The Displayed User
        public string Bio { get; set; } // Description About the user
    }
}

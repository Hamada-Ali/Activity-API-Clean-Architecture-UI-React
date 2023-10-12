using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Activity_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class activitiesController : ControllerBase
    {
        private readonly MyContext _context;
        public activitiesController(MyContext context) {
        
            _context = context;
        }

        //public  IActionResult GetActivities()
        //{
        //    var result =  _context.Activities.ToList();
        //    return Ok(result);
        //}

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetAcitivties()
        {
            return await _context.Activities.ToListAsync();
        }


        //public IActionResult GetAcivity(Guid id )
        //{
        //    var result = _context.Activities.Find(id);
        //    return Ok(result);
        //}

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await _context.Activities.FindAsync(id);
        }


    }
}

using Application.Core;
using Domain;
using MediatR;
using Persistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly MyContext _context;

            public Handler(MyContext context) { 
            
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

               // if (activity == null) return null;

                _context.Activities.Remove(activity);

               var activitySave =  await _context.SaveChangesAsync() > 0;

                if (!activitySave) return Result<Unit>.Failer("Failed To Delete The Activity"); 

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}

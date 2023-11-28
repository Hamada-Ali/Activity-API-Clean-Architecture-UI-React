using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{

    // we move this object to able to use it inside in Application layer
    public class Result<T>
    {
        public bool isSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        public static Result<T> Success(T value) => new Result<T> { isSuccess = true, Value = value };
        public static Result<T> Failer(string err) => new Result<T> { isSuccess = false, Error = err };
    }
}

namespace Activity_App.Dto
{

    // this Dto used for send this data to the user with this properties ( when he successed to loging or register )
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string image { get ; set; }
        public string UserName { get; set; }
    }
}

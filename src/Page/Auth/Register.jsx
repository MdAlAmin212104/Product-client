import Google from '../../Components/google';
import useAuth from '../../hook/useAuth';

const Register = () => {
    const { createUser }= useAuth();
  const handleRegister = (e) => {
    e.preventDefault();
    const from = e.target
    const email = from.email.value;
    const password = from.password.value;
    //console.log(email, password);
    createUser(email, password)
        .then((res) => {
           console.log(res.user);
        }).catch(error => console.error(error));
    from.reset();
  };

  return (
    <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Register Now</h1>
        <p className="text-sm dark:text-gray-600">
          Register in to access your account
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-12">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
            />
          </div>
        </div>
        <div className="space-y-2">
            <button
              type="submit"
              className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
            >
              Register
            </button>
        </div>
      </form>
      <Google/>
    </div>
  );
};

export default Register;

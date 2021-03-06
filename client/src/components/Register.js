import React, { useState } from "react";

function Register(props) {
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState(initialState);
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUser(initialState);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange({ target }) {
    const { name, value } = target;
    setUser((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <main>
      <section className="absolute w-full h-full register">
        <div className="absolute top-0 w-full h-full bg-gray-800"></div>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full md:w-6/12 lg:w-4/12 xl:w-3/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                <div className="rounded-t mb-0 px-6 py-6"></div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-gray-500 text-center mb-3 font-bold">
                    <h2>Sign up</h2>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Email"
                        style={{ transition: "all .15s ease" }}
                        value={user.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Password"
                        style={{ transition: "all .15s ease" }}
                        value={user.password}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Password"
                        style={{ transition: "all .15s ease" }}
                        value={user.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full hover:bg-gray-700"
                        type="submit"
                        style={{ transition: "all .15s ease" }}
                      >
                        Sign Up
                      </button>
                      <small>
                        <a href="/login">Already Registered, go to Login</a>
                      </small>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;

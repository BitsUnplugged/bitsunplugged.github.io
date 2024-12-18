import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { CircularProgress, Switch } from "@mui/material";
import Banner from "../../components/Banner";
import Layout1 from "../../components/Layouts/Layout1";
import { setLoading } from "../../App";
import AuthService from "../../services/authService";
import GlobalContext from "../../store/GlobalContext";
import { PasswordField } from "../../components/InputFields";
const InputField = (props) => {
  return (
    <div>
      <label
        // for={props.name}
        className="block mb-2 text-sm font-medium bu-text-primary"
      >
        {props.label}
      </label>
      <input
        value={props.value}
        type={props.type}
        name={props.name}
        id={props.id}
        className="border sm:text-sm rounded-lg  block w-full p-2.5 bu-input-primary"
        placeholder={props.placeholder}
        required={props.required}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const globalCtx = useContext(GlobalContext);
  const [type, setType] = useState(searchParams.get("type"));

  const [checked, setChecked] = useState(type === "setter" ? true : false);
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate({
      pathname: "/signup",
      search: createSearchParams({
        type: type,
      }).toString(),
    });
  };

  useEffect(() => {
    console.log(type);
    if (type == undefined) {
      searchParams.set("type", "solver");
      setSearchParams(searchParams);
      localStorage.setItem("type", 0);
      setType("solver");
    } else {
      if (type !== searchParams.get("type")) {
        searchParams.set("type", type);
        // localStorage.setItem("type", type);
        setSearchParams(searchParams);
      }
    }
    setLoading(false);
  }, [type]);

  const handleSubmit = async () => {
    if (!loggingIn) {
      setLoading(true);
      const res = await AuthService.login({
        email: email,
        pass: password,
        type: type == "solver" ? 0 : 1,
      });
      console.log(res);
      if (res.success) {
        setLoggingIn(true);
        globalCtx.setType(type == "solver" ? 0 : 1);
        type == "solver" ? navigate("/home") : navigate("/problemSet");
      } else {
        setLoading(false);
      }
    }
  };
  return (
    <Layout1>
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto gap-5 min-h-screen">
          <>
            <div
              onClick={() => {
                setLoading(true);
                navigate("/landing");
              }}
              className="cursor-pointer"
            >
              <Banner width={200} height={50} />
            </div>
            <div className="w-full rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0 bu-card-secondary">
              <div className="p-6 space-y-6 md:space-y-6 sm:p-10">
                <div className="hbox flex-center">
                  <h6
                    className={
                      checked
                        ? "flex items-center bu-text-subtitle"
                        : "flex items-center text-xl font-semibold bu-text-primary"
                    }
                  >
                    User
                  </h6>
                  <Switch
                    checked={checked}
                    onChange={() => {
                      if (checked) {
                        setChecked(false);
                        localStorage.setItem("type", 0);
                        setType("solver");
                      } else {
                        setChecked(true);
                        localStorage.setItem("type", 1);
                        setType("setter");
                      }
                    }}
                  />
                  <h6
                    className={
                      checked
                        ? "flex items-center text-xl font-semibold bu-text-primary"
                        : "flex items-center bu-text-subtitle"
                    }
                    style={{ width: "2vw", fontWeight: "" }}
                  >
                    Setter
                  </h6>
                </div>
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl bu-text-primary">
                  Sign in to your account
                </h1>
                <div className="space-y-4 md:space-y-6">
                  <InputField
                    label="Username/Email Address"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="example@gmail.com"
                    required={true}
                    onChange={setEmail}
                    value={email}
                  />
                  <PasswordField
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required={true}
                    setValue={setPassword}
                    value={password}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="remember"
                          aria-describedby="remember"
                          type="checkbox"
                          className="w-4 h-4 border rounded "
                          required=""
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          // for="remember"
                          className="bu-text-subtitle"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium  hover:underline bu-text-title"
                    >
                      Forgot password?
                    </a>
                  </div>
                  {!loggingIn && (
                    <button
                      type="submit"
                      className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bu-button-primary bu-text-primary"
                      onClick={handleSubmit}
                    >
                      Sign in
                    </button>
                  )}

                  {/* <button
                  type="submit"
                  className="w-full text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-pink-600 hover:bg-pink-700 focus:ring-pink-800"
                  onClick={() => navigate("/landing")}
                >
                  View As Guest
                </button> */}
                  <p className="text-sm font-light bu-text-subtitle">
                    Don’t have an account yet?{" "}
                    <a
                      onClick={handleSignup}
                      className="font-medium  hover:underline bu-text-title"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </>
        </div>
      </section>
    </Layout1>
  );
};

export default Login;

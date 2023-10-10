import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import BounceLoader from "react-spinners/BounceLoader";

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/WebContext";
import { auth, onAuthStateChanged } from "../firebase/firebase";

function LoginCard() {
  const { signInWithGoogle,loginWithEmailAndPassword } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
         setLoading(false);
      } else {
        setLoading(false);
      }
    });
  },[navigate]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("invalid email Address").required("required"),
    password: Yup.string()
      .required("Required")
      .min("6", "6 character only")
      .matches(/^[a-zA-Z]+$/, "Password can only contain letters"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formik.values;
    if (formik.isValid === true) {
      loginWithEmailAndPassword(email, password);
      setLoading(true);
      alert("Good");
      setLoading(true);
    } else {
      setLoading(false);
      alert("Check your input Fields");
    }

    console.log("formik", formik);
  };
  const formik = useFormik({ initialValues, validationSchema, handleSubmit });

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <BounceLoader color="#36d7b7" size={75} speedMultiplier={1} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 h-screen justify-items-center items-center ">
            <Card className="w-96">
              <CardHeader
                variant="gradient"
                color="gray"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography
                  className="font-Open_Sans"
                  variant="h3"
                  color="white"
                >
                  SIGN IN
                </Typography>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardBody className="flex flex-col gap-4">
                  <div className="mb-2 ">
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      size="lg"
                      {...formik.getFieldProps("email")}
                    />
                  </div>

                  <div>
                    {formik.touched.email && formik.errors.email && (
                      <Typography varient="email" color="red">
                        {formik.errors.email}
                      </Typography>
                    )}
                  </div>
                  <div className="mt-4 mb-2">
                    <Input
                      name="password"
                      type="password"
                      label="Password"
                      size="lg"
                      {...formik.getFieldProps("password")}
                    />
                  </div>
                  <div>
                    {formik.touched.password && formik.errors.password && (
                      <Typography varient="email" color="red">
                        {formik.errors.password}
                      </Typography>
                    )}
                  </div>

                  <div className="-ml-2.5">
                    <Checkbox label="Remember Me" />
                  </div>
                  <Button
                    variant="gradient"
                    type="submit"
                    fullWidth
                    className="mb-4 font-Open_Sans"
                    onClick={signInWithGoogle}
                  >
                    Sign In
                  </Button>

                  <Button
                    variant="gradient"
                    type="submit"
                    fullWidth
                    className="mb-4 font-Open_Sans"
                    onClick={signInWithGoogle}
                  >
                    SIGN IN WITH GOOGLE
                  </Button>
                </CardBody>
              </form>

              <CardFooter className="pt-0">
                <Link to="/reset">
                  <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="cyan"
                    className="ml-1 font-bold text-center"
                  >
                    Reset your Password
                  </Typography>
                </Link>

                <Link to="/register">
                  <Typography
                    variant="small"
                    className="mt-6 flex justify-center"
                  >
                    Don&apos;t have an account?
                    <Typography
                      as="a"
                      href="#signup"
                      variant="small"
                      color="blue-gray"
                      className="ml-1 font-bold"
                    >
                      Sign up
                    </Typography>
                  </Typography>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
export default LoginCard;

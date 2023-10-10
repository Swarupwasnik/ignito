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
import ClipLoader from "react-spinners/ClipLoader";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {useContext, useState,useEffect} from "react";
import { AuthContext } from "../context/WebContext";
import {auth,onAuthStateChanged} from "../firebase/firebase";

function Register() {

    const[loading,setLoading] =useState(false)
    const{registerWithEmailAndPassword}=useContext(AuthContext);
    const  navigate=useNavigate();

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
    name: "",
  };
 

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Required")
      .min("4", "Character must be 4")
      .matches(/^[a-zA-Z]+$/, "name contain only letter"),
    email: Yup.string().email("invalid email Address").required("required"),
    password: Yup.string()
      .required("Required")
      .min("6", "6 character only")
      .matches(/^[a-zA-Z]+$/, "password can only contain letters"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = formik.values;
    if (formik.isValid === true) {
      registerWithEmailAndPassword(name,email,password);
      setLoading(true)
   
    } else {
      setLoading(true);
      alert("Check your input Fields");
    }

    console.log("formik", formik);
  };
  const formik = useFormik({ initialValues, validationSchema, handleSubmit });

  return (

    <>
    { loading  ? (<div className="grid grid-cols-1 justify-items-center items-center h-screen ">
    <ClipLoader
  color="rgba(214, 54, 106, 1)"
  size={150}
  speedMultiplier={0.8}
/></div>) : (

    <>

<div className="grid grid-cols-1 justify-items-center items-center h-screen">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography className="font-Open_Sans" variant="h3" color="white">
            REGISTER
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <Input
                name="name"
                text="text"
                label="Name"
                size="lg"
                {...formik.getFieldProps("name")}
              />
            </div>
            <div>
              {formik.touched.name && formik.errors.name && (
                <Typography varient="small" color="red">
                  {formik.errors.name}
                </Typography>
              )}
            </div>

            <div className="mb-2 mt-4">
              <Input
                type="email"
                name="email"
                label="email"
                size="lg"
                {...formik.getFieldProps("email")}
              />
            </div>

            <div>
              {formik.touched.email && formik.errors.email && (
                <Typography varient="small" color="red">
                  {formik.errors.email}
                </Typography>
              )}
            </div>
            <div className="mb-2 mt-4">
              <Input
                name="password"
                label="password"
                type="password"
                size="lg"
                {...formik.getFieldProps("password")}
              />
            </div>
            <div>
              {formik.touched.password && formik.errors.password && (
                <Typography varient="small" color="red">
                  {formik.errors.password}
                </Typography>
              )}
            </div>

            <Button
              variant="gradient"
              type="submit"
              className="mb-4 mt-4"
              fullWidth
            >
              Sign In
            </Button>
          </form>
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <div className="mt-6 flex text-base font-Open_Sans justify-center">
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/login">
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Login
                </Typography>
              </Link>
            </Typography>
          </div>
        </CardFooter>
      </Card>
    </div>

    </>
 ) } 

    </>
  );
}
export default Register;

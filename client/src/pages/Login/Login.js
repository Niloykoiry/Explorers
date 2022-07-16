import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Form, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Link, useLocation, useHistory } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import classes from "../Form.module.css";
import toastCreator from "../../components/toastifyCreator";

//Form validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("*Email is invalid!")
    .required("*Email is required!"),
  password: yup.string().required("*Password is required!"),
});

const Login = () => {
  const { loginUser, setUser } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Redirect path
  const { from } = location.state || { from: { pathname: "/" } };

  //Form submit handler
  const onSubmit = async (formData) => {
    try {
      const userCredential = await loginUser(formData.email, formData.password);
      const user = userCredential.user;
      setUser(user);
      history.replace(from.pathname);
    } catch (error) {
      //Error handling
      if (
        error.message.includes("wrong-password") ||
        error.message.includes("user-not-found")
      ) {
        toastCreator("Email or Password is invalid!", "error");
      } else if (error.message.includes("too-many-requests")) {
        toastCreator("Too many invalid requests, try again later!", "error");
      } else {
        toastCreator("Something went wrong!", "error");
      }
    }
  };
  return (
    <section
      className={`${classes.formContainer} d-flex justify-content-center align-items-center`}
    >
      <Container>
        <Row>
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <h2>Login</h2>

              <FloatingLabel label="Email" className={`${classes.label} mb-3`}>
                <Form.Control
                  placeholder="Email"
                  className={classes.input}
                  {...register("email")}
                />
                {errors.email?.message && (
                  <small className="error">{errors.email.message}</small>
                )}
              </FloatingLabel>

              <FloatingLabel
                label="Password"
                className={`${classes.label} mb-3`}
              >
                <Form.Control
                  placeholder="Password"
                  className={classes.input}
                  {...register("password")}
                />
                {errors.password?.message && (
                  <small className="error">{errors.password.message}</small>
                )}
              </FloatingLabel>

              <div className="my-4 d-sm-flex justify-content-between">
                <Form.Check
                  inline
                  label="Remember Me"
                  name="remember"
                  type="checkbox"
                  id="remember"
                  className={classes.remember}
                />
                <a href="/" className={`d-block  ${classes.forgotPassword}`}>
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className={`btn ${classes.formSubmitBtn}`}>
                Login
              </button>
              {/* Toggle register */}
              <p className={`text-center ${classes.haveAccount}`}>
                Don't have an account ?{"  "}
                <Link to="/register" className={`${classes.forgotPassword}`}>
                  Create an account
                </Link>
              </p>
            </Form>
            {/* Social login */}
            <SocialLogin redirectPath={from} />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  );
};

export default Login;

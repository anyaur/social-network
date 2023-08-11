import React from 'react';
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import classes from './Login.module.css';
import * as Yup from "yup";
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Navigate } from "react-router-dom";

const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некорректный e-mail')
    .required("Обязательное поле"),
  password: Yup.string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .required("Обязательное поле")
});

const LoginForm = (props: any) => {
  return (
    <Formik
      initialValues={{ email: "", password: "", rememberMe: false }}
      onSubmit={(values, submitProps) => {
        let formData = {
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
        }
        props.onSubmit(formData, submitProps.setStatus) /*это thunk прокинутая через пропсы*/
        submitProps.resetForm()
      }}
      validationSchema={loginFormSchema}
    >
      {({ errors, touched, status }) => (
        <Form>
          <div>
            <Field type={'text'} name={'email'} placeholder={'e-mail'} />
            {errors.email && touched.email ? (
              <div className={classes.error}>{errors.email}</div>
            ) : null}
          </div>
          <div>
            <Field type={'password'} name={'password'} placeholder={'password'} />
          </div>
          {errors.password && touched.password ? (
            <div className={classes.error}>{errors.password}</div>
          ) : null}
          <div>
            <Field type={'checkbox'} name={'rememberMe'} />
            <label htmlFor={'rememberMe'}> remember me </label>
          </div>
          <div>
            {status && status.error && (
              <div className={classes.error}>{status.error}</div>
            )}
          </div>
          <button type={'submit'}>Log in</button>
        </Form>
      )}
    </Formik>

  )
}


const Login = (props: any) => {
  const onSubmit = (values: any, setStatus: any) => {
    props.login(values, setStatus)
  }

  if (props.isAuth) {
    return <Navigate to={"/Profile"}></Navigate>
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} />
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps, { login })(Login);
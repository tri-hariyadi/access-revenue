import React from 'react';
import swal from 'sweetalert';
import jwt from 'jsonwebtoken';
import { useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, Row } from 'reactstrap';
import { Formik } from 'formik';

import { loginUser } from '../../store';
import { getUserPayload, LoginValidationSchema, validate } from '../../configs';
import { Button, Checkbox, TextField } from '../../components';

import BgLogin from '../../assets/bg-login.jpg';
import IlLogin from '../../assets/il-login.png';
import IcLogoApp from '../../assets/ic_logo_app.png';

const LoginPage = ({
  loginUser
}) => {
  const initialValues = React.useRef({
    email: '',
    password: '',
    accept: false
  });
  const history = useHistory();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const login = await loginUser({
      email: values.email,
      password: values.password
    });

    if (login) {
      if (login.result && login.status === 200) {
        if (values.accept) window.localStorage.setItem('accessToken', login.result.accessToken);
        else window.sessionStorage.setItem('accessToken', login.result.accessToken);
        history.replace('/dasboard');
      }
      else swal({
        title: 'Gagal Login',
        text: login.message,
        icon: 'error',
        dangerMode: true,
      });
      setSubmitting(false);
    }
  }

  if (!jwt.decode(getUserPayload())) return (
    <div className='login-wrapper'>
      <img src={BgLogin} className='login-img-background' alt='bg-login' />
      <div className='card login-card'>
        <div className='login-img-wrapper'>
          <img src={IlLogin} alt='il-login' />
        </div>
        <div className='login-form-wrapper'>
          <div className='login-desc-wrapper'>
            <img src={IcLogoApp} className='login-ic-logo-app mb-4' alt='ic_logo_app' />
            <h2>WELCOME TO</h2>
            <h6>Web Admin Absensi Mobile</h6>
          </div>
          <Formik
            initialValues={initialValues.current}
            validate={validate(LoginValidationSchema)}
            onSubmit={onSubmit}
            render={
              (props) => (
                <Row className='login-row-form'>
                  <Col lg='12'>
                    <Form onSubmit={props.handleSubmit} noValidate name='simpleForm'>
                      <TextField
                        {...props}
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Email'
                        autoComplete='email'
                        label='Email'
                        textTransform='none'
                      />
                      <TextField
                        {...props}
                        secureTextEntry
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Password'
                        autoComplete='new-password'
                        label='Password'
                        textTransform='none'
                      />
                      <Checkbox
                        {...props}
                        id='accept'
                        label='Keep Me Logged In'
                      />
                      <FormGroup>
                        <Button
                          type='submit'
                          isPrimary
                          isBlock
                          isLarge
                          isLoading={props.isSubmitting}
                          hasShadow
                          className='mt-4'
                          style={{ borderRadius: 10, minHeight: '2.75rem' }}>
                          Login
                        </Button>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              )}
          />
        </div>
      </div>
    </div>
  )

  return <Redirect to='/dashboard' />
}

export default connect(null, { loginUser })(LoginPage);

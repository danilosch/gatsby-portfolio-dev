import React from 'react';
import axios from 'axios';
import { Formik, Form, FastField, ErrorMessage } from 'formik';
import Recaptcha from 'react-google-recaptcha';
import * as Yup from 'yup';
import { Button, Input } from 'components/common';
import { Error, Center, InputField } from './styles';

export default () => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      message: '',
      recaptcha: '',
      success: false,
    }}
    validationSchema={Yup.object().shape({
      name: Yup.string().required('Preenchimento obrigatório'),
      email: Yup.string()
        .email('E-mail inválido')
        .required('Preenchimento obrigatório'),
      message: Yup.string().required('Preenchimento obrigatório'),
      recaptcha: Yup.string().required('Robôs não são bem-vindos!'),
    })}
    onSubmit={async ({ name, email, message }, { setSubmitting, resetForm, setFieldValue }) => {
      try {
        await axios({
          method: 'POST',
          url: `${process.env.GATSBY_PORTFOLIO_FORMIK_ENDPOINT}`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            name,
            email,
            message,
          }),
        });
        setSubmitting(false);
        setFieldValue('success', true);
        setTimeout(() => resetForm(), 6000);
      } catch (err) {
        setSubmitting(false);
        setFieldValue('success', false);
				alert('Ocorreu algo inesperado, por favor tente novamente!') // eslint-disable-line
      }
    }}
  >
    {({ values, touched, errors, setFieldValue, isSubmitting }) => (
      <Form>
        <InputField>
          <Input
            as={FastField}
            type="text"
            name="name"
            component="input"
            aria-label="name"
            placeholder="Nome completo*"
            error={touched.name && errors.name}
          />
          <ErrorMessage component={Error} name="name" />
        </InputField>
        <InputField>
          <Input
            id="email"
            aria-label="email"
            component="input"
            as={FastField}
            type="email"
            name="email"
            placeholder="E-mail*"
            error={touched.email && errors.email}
          />
          <ErrorMessage component={Error} name="email" />
        </InputField>
        <InputField>
          <Input
            as={FastField}
            component="textarea"
            aria-label="message"
            id="message"
            rows="8"
            type="text"
            name="message"
            placeholder="Sua mensagem*"
            error={touched.message && errors.message}
          />
          <ErrorMessage component={Error} name="message" />
        </InputField>
        {values.name && values.email && values.message && (
          <InputField>
            <FastField
              component={Recaptcha}
              sitekey={process.env.GATSBY_PORTFOLIO_RECAPTCHA_KEY}
              name="recaptcha"
              onChange={value => setFieldValue('recaptcha', value)}
            />
            <ErrorMessage component={Error} name="recaptcha" />
          </InputField>
        )}
        {values.success && (
          <InputField>
            <Center>
              <h4>Sua mensagem foi enviada com sucesso, darei um retorno o mais breve possível!</h4>
            </Center>
          </InputField>
        )}
        <Center>
          <Button secondary type="submit" disabled={isSubmitting}>
            Enviar
          </Button>
        </Center>
      </Form>
    )}
  </Formik>
);

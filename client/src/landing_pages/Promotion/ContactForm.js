import React from 'react';
import moment from 'moment';
import {useFormik} from 'formik';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {BASE_URL_LANDING} from 'helpers/constants';

import AbstractCheckboxGroup from 'shared/AbstractCheckboxGroup';

const initialAges = [
  {label: '3 to 5', id: 'age3', checked: false},
  {label: '5 to 7', id: 'age5', checked: false},
  {label: '8 to 12', id: 'age8', checked: false},
  {label: '12 to 16', id: 'age12', checked: false},
  {label: 'No Kids', id: 'noKids', checked: false},
  {label: 'Adult', id: 'adult', checked: false},
];

const initialAdultClassTimes = [
  {label: 'Mornings 8am – 10am', id: 'morningClass', checked: false},
  {label: 'Evenings 6pm - 8pm', id: 'eveningClass', checked: false},
];

const initialContactTimes = [
  {label: 'Anytime', id: 'contactAnytime', checked: false},
  {label: '8am – 12pm', id: 'contactMorning', checked: false},
  {label: '1pm - 5pm', id: 'contactAfternoon', checked: false},
];

const initialContactDays = [
  {label: 'Mon', id: 'contactMon', checked: false},
  {label: 'Tue', id: 'contactTue', checked: false},
  {label: 'Wed', id: 'contactWed', checked: false},
  {label: 'Thu', id: 'contactThu', checked: false},
  {label: 'Fri', id: 'contactFri', checked: false},
];

const validate = (values) => {
  const errors = {};

  if (!values.zipcode) {
    errors.zipcode = 'Required';
  } else if (!/^[0-9]{5}(?:-[0-9]{4})?$/i.test(values.zipcode)) {
    errors.zipcode = 'Enter 5 digit zipcode (e.g. 84105)';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  } else if (
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(values.phone)
  ) {
    errors.phone = 'Enter valid phone number (e.g. 801-555-1212)';
  }

  return errors;
};

export const ContactForm = () => {
  const [ages, setAges] = React.useState(initialAges);
  const [adultClassTimes, setAdultClassTimes] = React.useState(
    initialAdultClassTimes
  );
  const [contactTimes, setContactTimes] = React.useState(initialContactTimes);
  const [contactDays, setContactDays] = React.useState(initialContactDays);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      zipcode: '',
      phone: '',
    },
    onSubmit: async (values, {resetForm}) => {
      sendData(values);
      resetForm();
    },
    validate,
  });

  const validateForm = () => {
    const validZipcode =
      // formik.getFieldProps('zipcode').value.length >= 0 &&
      !formik.errors.zipcode;

    const validPhone =
      formik.getFieldProps('phone').value.length > 6 && !formik.errors.phone;

    return !(validZipcode && validPhone);
  };

  const convertCheckboxData = (data) => {
    return data.map((item) => (item.checked ? 'Y' : 'N'));
  };

  const sendData = async (validatedData) => {
    const now = await moment().format('MMM DD, YYYY HH:MM');
    const {firstName, lastName, zipcode, phone} = validatedData;
    const agesData = convertCheckboxData(ages);
    const adultClassTimesData = convertCheckboxData(adultClassTimes);
    const contactDaysData = convertCheckboxData(contactDays);
    const contactTimesData = convertCheckboxData(contactTimes);
    const values = [
      [
        firstName,
        lastName,
        zipcode,
        phone,
        ...agesData,
        ...adultClassTimesData,
        ...contactDaysData,
        ...contactTimesData,
        now,
      ],
    ];

    try {
      await fetch(`${BASE_URL_LANDING}/contact`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      setAges(initialAges);
      setAdultClassTimes(initialAdultClassTimes);
      setContactDays(initialContactDays);
      setContactTimes(initialContactTimes);
      // TODO: Redirect to Success Page
    } catch (error) {
      // TODO: Redirect to Error Page
    }
  };

  return (
    <Container maxWidth='md'>
      <form
        className='input-form'
        id='contact'
        name='contact'
        required
        onSubmit={formik.handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='First Name'
              name='firstName'
              id='firstName'
              variant='outlined'
              margin='normal'
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Last Name'
              name='lastName'
              id='lastName'
              variant='outlined'
              margin='normal'
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Zipcode'
              name='zipcode'
              id='zipcode'
              variant='outlined'
              margin='normal'
              required
              fullWidth
              value={formik.values.zipcode}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.zipcode && formik.errors.zipcode ? (
              <div style={{color: 'red'}}>{formik.errors.zipcode}</div>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Phone Number'
              name='phone'
              id='phone'
              variant='outlined'
              margin='normal'
              required
              fullWidth
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div style={{color: 'red'}}>{formik.errors.phone}</div>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <AbstractCheckboxGroup
              groupLabel='What ages are registering for your FREE lesson(s)? (select all that apply)'
              values={ages}
              setValues={setAges}
            />
          </Grid>
          <Grid item xs={12}>
            <AbstractCheckboxGroup
              groupLabel='If you attended our adult classes, are you interested in (select all that apply)'
              values={adultClassTimes}
              setValues={setAdultClassTimes}
            />
          </Grid>
          <Grid item xs={12}>
            <AbstractCheckboxGroup
              groupLabel='We will be calling you soon to schedule your Free Martial arts lesson!  When would you like us to reach out? Please select all that apply'
              values={contactTimes}
              setValues={setContactTimes}
            />
            <AbstractCheckboxGroup
              groupLabel=''
              values={contactDays}
              setValues={setContactDays}
            />
          </Grid>
          <Grid item xs={12} align='center'>
            <Button
              type='submit'
              disabled={validateForm()}
              variant='contained'
              color='secondary'
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ContactForm;
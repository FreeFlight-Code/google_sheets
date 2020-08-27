import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useStyles from './Content.styles';

import cnst from '../../helpers/constants';

export const Content = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container} align="center">
      <Typography className={classes.title}>
        Congratulations!
      </Typography>
      <img
        className={classes.gif}
        alt="wheel gif"
        src={cnst.THANKS_WHEEL_GIF}
      />
      <Typography className={classes.title}>
        You are now entered into our monthly giveaway. We will
        be contacting you soon to schedule or confirm your free appointment!
      </Typography>

      <Button
        id="cta-thankyou"
        href="http://pmautah.com"
        className={classes.cta}
      >
        {`- Click here -
Learn more about Premier Martial Arts Utah`}
      </Button>
    </Container>
  );
};

export default Content;

import React, { useState } from 'react';
import './EmailVerified.css';
import { BiMailSend  } from 'react-icons/bi';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { buildPath } from "../../path";
import PreLoginNavBar from '../../PreLogin/PreLoginNavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useStyles from '../../PreLogin/PreLoginStyles';

const theme = createTheme();

function OrganizationEmailVerified() {
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const classes = useStyles();


  async function submitVerifyCode() {
    const url = buildPath("api/validateEmailTokenInput_organization");
    // get ORGANIZATION email

    const json = {
        organizationEmail: email,
        tokenEnteredByOrg: verificationCode
    };

    console.log(json);

    try {
        const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {"Content-Type": "application/json"},
      });

      let res = JSON.parse(await response.text());
      console.log(res);
      console.log(response);
      if(res.success) {
        setMessage("Correct code, please login");
      } else if(!res.success) {
        setMessage("*Incorrect verification code, please enter again");
      } else {
        setMessage("*Error occured");
      }

    } catch(e) {
      console.log("oopsies");
      setMessage("*Error occured, email not found");
    }

  }

return (
        <div id='emailVerified'>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <PreLoginNavBar />
            <div className="CardContainer">
              <Card variant="outlined" className="Card" style={{backgroundColor: "rgba(169, 169, 169, 0.05)"}}>
                <Box sx={{ margin: '20px' }}>
                  <div className="emailContent">Thanks for signing up! Please enter the confirmation code from your email to verify your account.</div>
                  <BiMailSend  className='verifyIcon'></BiMailSend >
                </Box>
                <TextField id="outlined-basic" label="Organization Email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} style={{ marginBottom: '10px'}} />
                <TextField id="outlined-basic" label="Verification Code" variant="outlined" value={verificationCode} onChange={(event) => setVerificationCode(event.target.value)} />
                <Button className="submitBtn" variant="contained" color="primary" style={{ backgroundColor: '#5B4E77'}} onClick={submitVerifyCode}>
                  Submit
                </Button>
                <div style={{ color: message === "Correct code" ? "green" : "red", fontSize: '20px' }}>{message}</div>
              </Card>
            </div>
          </ThemeProvider>
        </div>
      );
    }

export default OrganizationEmailVerified;

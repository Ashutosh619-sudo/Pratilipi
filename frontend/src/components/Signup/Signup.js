import { useState } from "react";
import "./signup.css";
import "../UI/ui.css";
import {
  Button,
  CardContent,
  Card,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { FormHelperText } from "@mui/material";

import {useNavigate} from "react-router-dom"; 

const Signup = () => {

  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });

  const [email,setEmail] = useState("")

  const [isValidEmail,setIsValidEmail] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [isValidPassword,setIsValidPassword] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const navigate = useNavigate()


  const handleChange = (prop) => (event) => {
    if(isStrongPassword(event.target.value)){
      setIsValidPassword(true)
    }
    else{
      setIsValidPassword(false)
    }
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function signUp(){
    const data = {
      email:email,
      password:password.password
    }
    const response = await fetch(`http://localhost:8000/users/`,{
      method: 'POST',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(data)
    })
    if(response.status === 201){
      const res = await response.json()
      localStorage.setItem("user_id",res.id)
      navigate("/",{replace:true})
    }

  }



  const handleEmail = event => {
    const val = event.target.value;

    if(isEmail(val)){
      setEmail(val)
      setIsValidEmail(true)
    }else{
      setIsValidEmail(false)
    }
    
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }} textAlign="center">
        <Grid
          container
          spacing={0}
          justifyContent="center"
          style={{ minHeight: "100vh" }}
          direction="column"
          alignItems="center"
        >
          <Grid item xs={6} sm={6}>
            <Card>
              <h1 className="signp-form-heading">SignUp Now</h1>
              <CardContent>
                <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                  <TextField helperText= {(!isValidEmail && email.length>1)? "Please enter a valid email":""} onBlur={()=>setDirty(true)} onChange={handleEmail} error={dirty && !isValidEmail} required id="outlined-required" label="Email" />
                </FormControl>
              </CardContent>
              <CardContent>
                <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                  <InputLabel required htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={password.showPassword ? "text" : "password"}
                    value={password.password}
                    onChange={handleChange("password")}
                    onBlur={()=>setPasswordDirty(true)}
                    error={passwordDirty && !isValidPassword}
                    
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {password.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {!isValidPassword && (
                          <FormHelperText error id="accountId-error">
                            { password.password.length <1? "" : "Please enter valid password"}
                          </FormHelperText>
                        )}
                </FormControl>

                <CardContent>

                  {(isValidEmail === true && isValidPassword===true)?<Button
                    id="button-customize"
                    size="large"
                    variant="contained"
                    onClick={()=>{
                      console.log("Clicked!")
                      signUp()
                    
                    }}
                  >
                    Submit
                  </Button>:<Button
                    id="button-customize"
                    size="large"
                    variant="contained"
                    onClick={async()=>{
                      console.log("Clicked!")
                      
                    }}
                    disabled
                  >
                    Submit
                  </Button>}

                  
                </CardContent>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Signup;

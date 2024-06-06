import React, { useState, useContext, useCallback } from 'react';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import HostContext from '../Context/HostContext';
import { useDropzone } from 'react-dropzone';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
  Radio,
  RadioGroup,
  FormLabel,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import DropzoneAreaComponent from '../components/dropzone';

// MUI의 CSS 우선순위가 높기 때문에 important를 설정 - 실무에서 종종 발생하는 우선순위 문제 해결
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`;

const Register = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const [isStudent, setIsStudent] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [studentIdError, setStudentIdError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const [Images, setImages] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    setImages(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const inputBox = {
    width: '30vw',
    height: '40vh',
    // backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // 그림자
  };


  const { host } = useContext(HostContext);
  const localhost = host + "user/signup";

  const handleStudentChange = (event) => {
    setIsStudent(event.target.value === 'yes');
  };

  const onhandlePost = (data) => {
    var role = '';
    // const localhost = host + "user/signup";
    if(isStudent){
      role = 'User'
    }
    else {
      role = 'Admin'
    }
    const { email, name, password, studentId } = data;
    console.log(data)
    const postData = {
      email,
      name,
      student_id: studentId,
      password,
      user_role: role,
    };
    console.log("p ", postData);

    const formData = new FormData();
    formData.append("signUpDto", new Blob([JSON.stringify(postData)], {type: "application/json"}))
    console.log(Images)
    formData.append("faceImage", Images[0])
    


    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    

    fetch(localhost, requestOptions)
      .then(response => {
        if(!response.ok){
          throw new Error(response.json())
        }
        alert('회원가입이 완료되었습니다.');
          navigate('/Login');
      }).catch((e)=>{
        alert(e.message)
      })
  };

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      studentId: data.get('studentId'),

    };
    
    
    const { email, name, password, studentId } = joinData;
    
    const rePassword = data.get('rePassword');

    // 이메일 유효성 체크
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    else setPasswordState('');

    // 비밀번호 같은지 체크
    if (password !== rePassword) setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    const studentIdRegex = /^\d{9}$/;
    if (!studentIdRegex.test(studentId) || studentId.length < 1) setStudentIdError('9자리 숫자를 입력해주세요.');
    else setStudentIdError('');


    // joinData.append("file", files[0])
    // formData.append("server", new Blob([JSON.stringify(testDto)], {type: "application/json"}))

    // data append를 post 할 때 보내기
    // data.append("signUpDto", new Blob([JSON.stringify(joinData)], {type: "application/json"}))
    // // setImages([...Images, response.data.filePath])
    // console.log(Images)
    // data.append("faceImage", Images[0])
    // data.append("faceImage", acceptedFiles)

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&
      studentIdRegex.test(studentId)
    ) {
      // console.log("d", data);
      onhandlePost(joinData);
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5"
            sx={{
              color: "#0a0a0a", 
              fontFamily: 'Inter',
              fontWeight: 'bold',
              fontSize: '35px', 
              marginBottom: '30px',
              marginTop: '30px',
              }}>
            Sign up
          </Typography>
          <Boxs component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>

              <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    id="name"
                    name="name"
                    label="Your Name"

                    error={nameError}

                  />
                </Grid>
                <FormHelperTexts>{nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="Your Email"
                    error={emailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="Your Password"
                    error={passwordState !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="Your Password Again"
                    error={passwordError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Are you Student?</FormLabel>
                    <RadioGroup
                      row
                      aria-label="student"
                      name="student"
                      value={isStudent ? 'yes' : 'no'}
                      onChange={handleStudentChange}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                
                  {isStudent && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="studentId"
                        name="studentId"
                        label="학번"
                        error={studentIdError !== '' || false}
                      />
                      <FormHelperTexts>{studentIdError}</FormHelperTexts>
                      <Typography variant="h6" sx={{marginRight:16, marginTop: 2, marginBottom: 2}}>
                        Upload Your Selfie Image
                      </Typography>
                      <div style={inputBox} {...getRootProps()}>
                      <input {...getInputProps()} />
                      {
                        isDragActive ?
                          <p>Drop the files here ...</p> :
                          <p style={{ textAlign: 'center' }}>
                            <div >
                              <Button variant="contained"
                                sx={{ width: 150, borderRadius: 3.5, backgroundColor: '#000000', fontFamily: 'Inter', color: '#F4F4F4', fontWeight: 'bold', boxShadow: 'none', marginTop: '18%' }}>
                                Upload Image
                              </Button>
                              <Typography variant="subtitle2" sx={{ fontFamily: 'Inter', color: '#000000', fontWeight: 'bold', marginTop: '13%' }}>
                                or drop a file.
                              </Typography>
                              <Typography variant="subtitle2" sx={{ fontFamily: 'Inter', color: '#b0b0b0' }}>
                                paste image or URL
                              </Typography>
                            </div>
                          </p>

                      }
                    </div>
                    {/* Dropzone아래 이미지 보여지는 곳 */}
                    <div style={{ display: 'flex', width: '350px', height: '240px', overflowX:'scroll'}}>
                     
                      { console.log("dd")}

                      {Images.map((image, index) => (
                          <div>
                            <img style={{ minWidth: '300px', width:'300px', height: ' 240px'}}
                            
                            src={`${localhost}${image}`}
                            />
                          </div>
                      ))} 

                    </div>
                    </Grid>
                    
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2,  
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  fontSize: '16px', 
                  textTransform: 'none',
                  backgroundColor: '#3d3d3d'
                  }}
                size="large"
              >
                Sign up
              </Button>
              <Grid item xs>
                <Link href="/" variant="body2"
                  sx={{
                    color: "#0a0a0a", 
                    fontFamily: 'Inter',
                    }}>
                  Back to Home
                </Link>
              </Grid>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;

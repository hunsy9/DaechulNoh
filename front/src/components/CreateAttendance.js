import React, {useState, useContext, useCallback} from 'react';
import { Box, Typography, Button } from '@mui/material';
// import DropzoneAreaComponent from '../components/dropzone';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDropzone } from 'react-dropzone';
import HostContext from '../Context/HostContext';
import dayjs, { Dayjs } from 'dayjs';

const CreateAttendance = (props) => {
  // const [classObj, setClassObj] = useState({name: '', id: -1});
  // setClassObj={setClassObj};
  // classObj={classObj};
  // console.log("class object id ", props.classObj.id);
  
  console.log(props.classObj.id);

  const CreateAttendanceAPI = "http://localhost:5555/api/attendance";
  const [Images, setImages] = useState([]);
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    setImages(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const [value, setValue] = useState();
  const dateFormat = dayjs(value).format("YYYY-MM-DD");

  // console.log(value);
  console.log(dateFormat);


  const inputBox = {
    width: '30vw',
    height: '40vh',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // 그림자
  };

  const { host } = useContext(HostContext);

  const onhandlePost = (data) => {


    const localhost = host + "api/attendance";
    const { lectureId } = data;
    console.log(data)
    const postData = {
      lectureId,
      // attendanceDate,
    };
    console.log("p ", postData);

    const formData = new FormData();
    formData.append("createAttendanceDto", new Blob([JSON.stringify(postData)], {type: "application/json"}))
    console.log(Images)
    formData.append("lectureImage", Images[0])
    


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
        alert('출석부가 생성되었습니다.');

      }).catch((e)=>{
        alert(e.message)
      })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      lectureId: data.get('lectureId'),
      

    };
    
    
    const { lectureId} = joinData;
    // console.log(lectureId);

    const datePickerFormat = "YYYY-MM-DD";

    const datePickerUtils = {
        format: datePickerFormat,
        parse: (value) => dayjs(value, datePickerFormat, true).toDate(),
        

    };
    

    onhandlePost(joinData);
  };


  return(
    <Box sx={{marginTop: '10vh'}}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh'}}>
      <Box sx={{ alignItems: 'center', justifyContent: 'center'}}>
        
        {/* Image FileUpload */}
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
        {/* Image FileUpload */}
        <div style={{ textAlign: 'center' }}>
          <Typography variant="subtitle1" sx ={{fontFamily:'Inter', color:'#000000', fontWeight:'bold', marginTop: '30px'}}>
            Choose your Class Date.
          </Typography>
          <Box sx = {{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          
          <LocalizationProvider dateAdapter={AdapterDayjs} >

            <DatePicker 
              label="Choose Class Date"  
              sx = {{ width : '200px', marginTop : '20px'}}
              value={value}
              onChange={(newValue) => setValue(newValue)}>
            </DatePicker>
          </LocalizationProvider>

          {/** Save 버튼 기능 추가 필요 */}
          <Button variant="contained" 
            sx={{ width:150, borderRadius: 3.5, backgroundColor: '#F4F4F4', fontFamily:'Inter', color:'#000000', fontWeight:'bold', boxShadow: 'none', marginTop : '30px' }}>
            Save
          </Button>
          </Box>
        </div> 
      </Box>
    </Box>
    </Box>
  )
}

export default CreateAttendance;
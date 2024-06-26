import React, { useEffect, useRef } from "react";
import { CssBaseline, Grid, Box, Typography, IconButton, Button, SvgIcon } from '@mui/material';
import DataTable from '../components/ClassAttendanceTable';
import PackageIcon from '../../src/assets/package-01.png';
import classImg from '../assets/class_example.png';
import CreateAttendanceLoading from "./CreateAttendanceLoading";
import CreateAttendanceComplete from "./CreateAttendanceComplete";

const ClassAttendance = ({ 
    handleShowAttendance, 
    isLoading,  
    setIsLoading,
    isComplete,
    setIsComplete,
    setShowAttendance,
    attendanceData,
    Images,
  }) => {

  let boundingBoxes;
  if(typeof attendanceData !== 'object'){
    boundingBoxes = JSON.parse(attendanceData).lectureImageBoundingBoxes;
  }
  else{
    boundingBoxes = attendanceData.lectureImageBoundingBoxes;
  }

  
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {

    const img = new Image();
    img.src = Images;

    if(!isLoading){
        img.onload = () => {

            const canvas = canvasRef.current
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            boundingBoxes.forEach(box => {
                const { width, height, left_pos, top_pos } = box;
                ctx.beginPath();
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 2;
                ctx.rect(
                    left_pos * img.width,
                    top_pos * img.height,
                    width * img.width,
                    height * img.height
                );
                ctx.stroke();
            });
        };
    }
  }, [Images, boundingBoxes]);

  return(
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        {!isLoading && <canvas ref={canvasRef} style={{
        minWidth: '200px',
        maxHeight: '350px',
        borderRadius: 10
    }}/>}

    {!isLoading && !isComplete &&
        <DataTable 
          attendanceData={attendanceData} 
        />
      }
      {isLoading && !isComplete &&
        <CreateAttendanceLoading />
      }
      {!isLoading && isComplete &&
        <CreateAttendanceComplete 
          setIsComplete={setIsComplete}
          setIsLoading={setIsLoading}
          setShowAttendance={setShowAttendance}
        />
      } 

    </Box>
    </>
  )
}

export default ClassAttendance;

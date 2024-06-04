import React from "react";
import {  Box, Typography, Button, SvgIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClassroomFormStudent from "./ClassroomFormStudent";
import ClassroomContent from "./ClassroomContent";
const MainStudent = (props) => {
  return(
  (props.showClassroom) ?
    <ClassroomContent classObj={props.classObj}/> : 
    
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        marginTop: -8 // Adjust this value based on your actual AppBar height
      }}
    >
      
      {(!props.showForm && !props.showClassroom) &&
        <>
          <Box
            sx={{
              fontSize: 64 // Adjust emoji size
            }}
          >
            {props.classrooms.length <= 0 ? "😢" : "🙂"}
          </Box>
          <Typography variant="h5">
          {props.classrooms.length <= 0 ? 
          "There is no classroom in your Account" : 
          "Select classroom"}
          </Typography>
            {props.classrooms.length <= 0 ? 
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
            Please make your classroom!
            </Typography> : 
            <></>}
          <Button variant="contained" onClick={props.handleClick} sx={{ width: 300, backgroundColor: '#F6F6F6', color: '#000000', marginTop: 5, padding: 2}}>
            Create Your Classroom
          <SvgIcon component={AddIcon} sx={{marginLeft: 2}}/>
          </Button>
        </>
      }
      {(props.showForm && !props.showClassroom) && 
      <ClassroomFormStudent 
        onCancel={props.handleClick}
        classrooms={props.classrooms}
        setClassrooms={props.setClassrooms}
      />}
    </Box>
  );
}

export default MainStudent;
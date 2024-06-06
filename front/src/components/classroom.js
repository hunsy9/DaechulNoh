import React, { useContext, useEffect, useState } from 'react'
import { Typography, ListItemButton, ListItemIcon, SvgIcon } from '@mui/material';
import TabIcon from '@mui/icons-material/Tab';
import HostContext from '../Context/HostContext';

const Classroom = ({ classrooms, setClassrooms, setClassObj, setShowClassroom, setShowForm, students, setStudents }) => {
  // props로 구조 분해 할당으로 받으면 변수처럼 사용할 수 있습니다.

  const {host} = useContext(HostContext);

  useEffect(() => {
    getLecture();
  }, []);

  const getLecture = () => {
    try{
      var requestOptions = {
        credentials: 'include',
        method: 'GET',
        redirect: 'follow'
      };

      const getAPI = host + "lecture/getlecture"
      
      fetch(getAPI, requestOptions)
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(result => {
          console.log(result);
          let newClassrooms = [...classrooms];
          newClassrooms = result;
          setClassrooms(newClassrooms);
        })
        .catch(error => console.log('error', error));
    } catch (e) {
      console.log(e);
    }
  }

  const getStudents = () => {
    try{
      var requestOptions = {
        credentials: 'include',
        method: 'GET',
        redirect: 'follow'
      };

      const getAPI = host + "lecture/getattendance" + `?lectureId=${classObj.id}`
      
      fetch(getAPI, requestOptions)
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(result => {
          console.log(result);
          let newStudents = [...students];
          newStudents = result;
          setStudents(newStudents);
        })
        .catch(error => console.log('error', error));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      {classrooms && classrooms.map((classroom, index) => (
        <div key={index}>
          <div key={classroom.id}>
          <ListItemButton 
            sx={{ pl: 4, margin: 1, padding: 2 }}
            onClick={() => {
              setClassObj({name: classroom.name, id: classroom.id, created_by: classroom.created_by});
              setShowClassroom(true);
              setShowForm(false);
              getStudents();
              console.log({name: classroom.name, id: classroom.id, created_by: classroom.created_by});
            }}
          >

            <ListItemIcon>
              <SvgIcon component={TabIcon} sx={{ marginRight: 2 }} />
            <Typography>
              {classroom.name}
            </Typography>
            </ListItemIcon>
          </ListItemButton>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Classroom;
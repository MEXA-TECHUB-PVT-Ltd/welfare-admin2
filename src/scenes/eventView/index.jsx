import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Grid from "@mui/material/Grid";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import url from "../url"
import TableRow from '@mui/material/TableRow';
import ClipLoader from "react-spinners/ClipLoader";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import React, { useState, useEffect } from "react";
const TextColor = {
  color: 'black',
  fontFamily: 'Roboto, sans-serif',
}
const override = {
  display: ' block',
  margin: '0 auto',
  //   borderColor: 'red',
}
const color = "black"
const imgStyle = {
  width: '50px',
}
function Item(props) {
  const { sx, ...other } = props;
  return (
      <Box
          sx={{
              p: 1,
              m: 1,
              // bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'white'),
              color: (theme) => (theme.palette.mode === 'dark' ? '#4daf6f' : '#4daf6f'),
              fontSize: '0.875rem',
              fontWeight: '700',
              ...sx,
          }}
          {...other}
      />
  );
}


const Team = () => {
  const { state } = useLocation();

  
  const headers = {
    'Content-Type': 'application/json'
  }
  
 
  //Get API Axios
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllData = async () => {
    const phoneNo = state.post_id;
    await axios.get(`${url}get-event`, {
        params: {
            _id: phoneNo
        }
    }).then(response => {
        console.log('response')
        console.log(response);
        setData(response.data);
        console.log(data);
        setLoading(false)
    })
        .catch(err => {
            console.log(err)
        })
}
  useEffect(() => {
    getAllData();

  }, []);
  return (
    <>

      <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad' }}>
      <Grid container spacing={2} >
              <Grid item xs={12} md={12} >
              <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon />
          </Link>
          <Link underline="hover" color="inherit" href="/events">
            <Typography color="text.primary">Events</Typography>

          </Link>

          <Typography color="text.primary">View</Typography>
        </Breadcrumbs>
                </Grid>
              <Grid item xs={12} md={12} >
              <div>
          <>
            {/* AppBAr  */}
            <ClipLoader color={color} loading={loading} css={override} size={30} />
            {console.log(state.post_id)}
            {console.log('state data id')}
            {console.log(state.data)}
            <Grid container spacing={2} >
              <Grid item xs={12} md={12} >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Box
                      sx={{ display: 'flex', p: 1, borderRadius: 1 }}
                    >
                      <Item sx={{ flexGrow: 1 }}>
                        <Typography variant='h3' style={{ fontFamily: 'Roboto, sans-serif', }}>Event Details</Typography>
                      </Item>
                    </Box>
                  </Grid>
                  {/* TABLE Grid  */}
                  <Grid item xs={12} md={12}>
                    {/* Table container  */}
                    <TableContainer >
                      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableBody>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Images

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              <img style={imgStyle} src={`${url}${data.image}`} />

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Event Id

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              {data.eventId}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Title

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              {data.title}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              department

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {data.department===undefined?<span>Null</span>:<span>
                                                                           {data.department.departmentName} </span>
}

                            </TableCell>

                          </TableRow>

                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Category

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              {data.category}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            location

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              {data.location}

                            </TableCell>

                          </TableRow>
                          {/* Second row  */}
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            date

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              {data.date}

                            </TableCell>

                          </TableRow>
                       
                          {/* Row  */}
                          {/* Second row  */}

                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        </div>

</Grid>
                </Grid>
      
     
      </Box>

    </>
  );
};

export default Team;

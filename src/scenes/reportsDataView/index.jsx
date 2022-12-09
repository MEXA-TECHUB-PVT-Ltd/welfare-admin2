import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios'
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
  const [images, setImages] = useState([]);

  const getAllData = async () => {
    const phoneNo = state.post_id;
        await axios.get(`${url}get-report`, {
            params: {
                _id: phoneNo
            }
        }).then(response => {
            console.log('response')
            console.log(response);
            setData(response.data);

            setImages(response.data.images)
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
          <Link underline="hover" color="inherit" href="/reportsData">
            <Typography color="text.primary">Reports</Typography>

          </Link>

          <Typography color="text.primary">View</Typography>
        </Breadcrumbs>
                </Grid>
              <Grid item xs={12} md={12} >
              <div>
              <>
                                    {/* AppBAr  */}
                                   {loading?<ClipLoader color={color} loading={loading} css={override} size={30} />:
                                   <> 
                                      <Grid container spacing={2} >
                                        <Grid item xs={12} md={12} >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <Box
                                                        sx={{ display: 'flex', p: 1, bgcolor: 'white', borderRadius: 1 }}
                                                    >
                                                        <Item sx={{ flexGrow: 1 }}>
                                                            <Typography variant='h6' style={{fontFamily:'Roboto, sans-serif',}}>Report Details</Typography>
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
                                                                       Date

                                                                    </TableCell>
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                       {data.date===undefined?<span>Null</span>:<span>{data.date}</span>}

                                                                    </TableCell>

                                                                </TableRow>
                                                                <TableRow
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                        Images

                                                                    </TableCell>
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                    {/* {images.map((dataimg, idx) => (
                                                                            <img style={imgStyle} src={`${url}${dataimg}`} />
                                                                        ))} */}

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
                                                                        Location

                                                                    </TableCell>
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                       {data.location}

                                                                    </TableCell>

                                                                </TableRow>
                                                                <TableRow
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                        Category

                                                                    </TableCell>
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                       {data.eventCategory}

                                                                    </TableCell>

                                                                </TableRow>

                                                                <TableRow
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                         Department

                                                                    </TableCell>
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                        {data.department===undefined?<span>Null</span>:<span>
                                                                           {data.department.departmentName} </span>}

                                                                    </TableCell>

                                                                </TableRow>
                                                                <TableRow
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                        User Type

                                                                    </TableCell>
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                        {data.userType}

                                                                    </TableCell>

                                                                </TableRow>
                                                                {/* Second row  */}
                                                                <TableRow
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                        Description

                                                                    </TableCell>
                                                                    <TableCell style={TextColor} component="th" scope="row">
                                                                        {data.description}

                                                                    </TableCell>

                                                                </TableRow>
                                                                {/* Row  */}
                                                                
                                    
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    </>} 
                                    {console.log(state.post_id)}
                                    {console.log('state data id')}
                                    {console.log(state.data)}
                                 
                                </>
        </div>

</Grid>
                </Grid>
      
     
      </Box>

    </>
  );
};

export default Team;

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
const Texthead={
  fontWeight:700,
  fontSize:'23px'
}
const Texthead1={
  fontWeight:700,
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
    await axios.get(`${url}get-Uc-User-Group`, {
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
          <Link underline="hover" color="inherit" href="/home">
            <HomeIcon />
          </Link>
          <Link underline="hover" color="inherit" href="/UcGroupRequests">
            <Typography color="text.primary">UC Group Requests</Typography>

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
                        <Typography variant='h3' style={{ fontFamily: 'Roboto, sans-serif', }}>Request Details</Typography>
                      </Item>
                    </Box>
                  </Grid>
                  {/* TABLE Grid  */}
                  <Grid item xs={12} md={12}>
                    {/* Table container  */}
                    <TableContainer >
                      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableBody>
                          {/* <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Image

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              <img style={imgStyle} src={`${url}${data.image}`} />

                            </TableCell>

                          </TableRow> */}
                            <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                                      
                            <TableCell style={Texthead} component="th" scope="row">
                            صد ر

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            

                            </TableCell>
                            </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              {(data.صدر===undefined)||(data.صدر===null)||(data.صدر==='')?<span>
                                NULL
                              </span>:<span>{data.صدر[0].name}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Father Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.صدر===undefined)||(data.صدر===null)||(data.صدر==='')?<span>
                                NULL
                              </span>:<span>{data.صدر[0].fatherName}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Email

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.صدر===undefined)||(data.صدر===null)||(data.صدر==='')?<span>
                                NULL
                              </span>:<span>{data.صدر[0].email}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Profession

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.صدر===undefined)||(data.صدر===null)||(data.صدر==='')?<span>
                                NULL
                              </span>:<span>{data.صدر[0].profession}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Mobile No (WhatsApp)


                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.صدر===undefined)||(data.صدر===null)||(data.صدر==='')?<span>
                                NULL
                              </span>:<span>{data.صدر[0].mobileWhatsapNo}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Educational Qualification

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.صدر===undefined)||(data.صدر===null)||(data.صدر==='')?<span>
                                NULL
                              </span>:<span>{data.صدر[0].educationalQualification}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                             Address

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.صدر===undefined)||(data.صدر===null)||(data.صدر==='')?<span>
                                NULL
                              </span>:<span>{data.صدر[0].address}</span>}

                            </TableCell>

                          </TableRow>
                         
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Rafaqat No

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.صدر===undefined)||(data.صدر===null)||(data.صدر==='')?<span>
                                NULL
                              </span>:<span>{data.صدر[0].RafaqatNo}</span>}

                            </TableCell>

                          </TableRow>
                         
                            <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                                      
                            <TableCell style={Texthead} component="th" scope="row">
                            ناظم

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            

                            </TableCell>
                            </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              {(data.ناظم===undefined)||(data.ناظم===null)||(data.ناظم==='')?<span>
                                NULL
                              </span>:<span>{data.ناظم[0].name}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Father Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظم===undefined)||(data.ناظم===null)||(data.ناظم==='')?<span>
                                NULL
                              </span>:<span>{data.ناظم[0].fatherName}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Email

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظم===undefined)||(data.ناظم===null)||(data.ناظم==='')?<span>
                                NULL
                              </span>:<span>{data.ناظم[0].email}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Profession

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظم===undefined)||(data.ناظم===null)||(data.ناظم==='')?<span>
                                NULL
                              </span>:<span>{data.ناظم[0].profession}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Mobile No (WhatsApp)


                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظم===undefined)||(data.ناظم===null)||(data.ناظم==='')?<span>
                                NULL
                              </span>:<span>{data.ناظم[0].mobileWhatsapNo}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Educational Qualification

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظم===undefined)||(data.ناظم===null)||(data.ناظم==='')?<span>
                                NULL
                              </span>:<span>{data.ناظم[0].educationalQualification}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                             Address

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظم===undefined)||(data.ناظم===null)||(data.ناظم==='')?<span>
                                NULL
                              </span>:<span>{data.ناظم[0].address}</span>}

                            </TableCell>

                          </TableRow>
                         
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Rafaqat No

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظم===undefined)||(data.ناظم===null)||(data.ناظم==='')?<span>
                                NULL
                              </span>:<span>{data.ناظم[0].RafaqatNo}</span>}

                            </TableCell>

                          </TableRow>

                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                                      
                            <TableCell style={Texthead} component="th" scope="row">
                            ناظم دعوت
                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            

                            </TableCell>
                            </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمدعوت===undefined)||(data.ناظمدعوت===null)||(data.ناظمدعوت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمدعوت[0].name}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Father Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمدعوت===undefined)||(data.ناظمدعوت===null)||(data.ناظمدعوت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمدعوت[0].fatherName}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Email

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمدعوت===undefined)||(data.ناظمدعوت===null)||(data.ناظمدعوت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمدعوت[0].email}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Profession

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمدعوت===undefined)||(data.ناظمدعوت===null)||(data.ناظمدعوت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمدعوت[0].profession}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Mobile No (WhatsApp)


                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمدعوت===undefined)||(data.ناظمدعوت===null)||(data.ناظمدعوت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمدعوت[0].mobileWhatsapNo}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Educational Qualification

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمدعوت===undefined)||(data.ناظمدعوت===null)||(data.ناظمدعوت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمدعوت[0].educationalQualification}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                             Address

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمدعوت===undefined)||(data.ناظمدعوت===null)||(data.ناظمدعوت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمدعوت[0].address}</span>}

                            </TableCell>

                          </TableRow>
                         
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Rafaqat No

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمدعوت===undefined)||(data.ناظمدعوت===null)||(data.ناظمدعوت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمدعوت[0].RafaqatNo}</span>}

                            </TableCell>

                          </TableRow>

                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                                    
                            <TableCell style={Texthead} component="th" scope="row">
                            ناظم تربیت
                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            

                            </TableCell>
                            </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمتربیت===undefined)||(data.ناظمتربیت===null)||(data.ناظمتربیت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمتربیت[0].name}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Father Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمتربیت===undefined)||(data.ناظمتربیت===null)||(data.ناظمتربیت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمتربیت[0].fatherName}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Email

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمتربیت===undefined)||(data.ناظمتربیت===null)||(data.ناظمتربیت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمتربیت[0].email}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Profession

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمتربیت===undefined)||(data.ناظمتربیت===null)||(data.ناظمتربیت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمتربیت[0].profession}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Mobile No (WhatsApp)


                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمتربیت===undefined)||(data.ناظمتربیت===null)||(data.ناظمتربیت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمتربیت[0].mobileWhatsapNo}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Educational Qualification

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمتربیت===undefined)||(data.ناظمتربیت===null)||(data.ناظمتربیت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمتربیت[0].educationalQualification}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                             Address

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمتربیت===undefined)||(data.ناظمتربیت===null)||(data.ناظمتربیت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمتربیت[0].address}</span>}

                            </TableCell>

                          </TableRow>
                         
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Rafaqat No

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمتربیت===undefined)||(data.ناظمتربیت===null)||(data.ناظمتربیت==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمتربیت[0].RafaqatNo}</span>}

                            </TableCell>

                          </TableRow>

                          
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                                      
                            <TableCell style={Texthead} component="th" scope="row">
                            ناظم ممبرشپ

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            

                            </TableCell>
                            </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمممبرشپ===undefined)||(data.ناظمممبرشپ===null)||(data.ناظمممبرشپ==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمممبرشپ[0].name}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Father Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمممبرشپ===undefined)||(data.ناظمممبرشپ===null)||(data.ناظمممبرشپ==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمممبرشپ[0].fatherName}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Email

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمممبرشپ===undefined)||(data.ناظمممبرشپ===null)||(data.ناظمممبرشپ==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمممبرشپ[0].email}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Profession

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمممبرشپ===undefined)||(data.ناظمممبرشپ===null)||(data.ناظمممبرشپ==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمممبرشپ[0].profession}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Mobile No (WhatsApp)


                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمممبرشپ===undefined)||(data.ناظمممبرشپ===null)||(data.ناظمممبرشپ==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمممبرشپ[0].mobileWhatsapNo}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Educational Qualification

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمممبرشپ===undefined)||(data.ناظمممبرشپ===null)||(data.ناظمممبرشپ==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمممبرشپ[0].educationalQualification}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                             Address

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمممبرشپ===undefined)||(data.ناظمممبرشپ===null)||(data.ناظمممبرشپ==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمممبرشپ[0].address}</span>}

                            </TableCell>

                          </TableRow>
                         
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Rafaqat No

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمممبرشپ===undefined)||(data.ناظمممبرشپ===null)||(data.ناظمممبرشپ==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمممبرشپ[0].RafaqatNo}</span>}

                            </TableCell>

                          </TableRow>

                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                                     
                            <TableCell style={Texthead} component="th" scope="row">
                            ناظم مالیات:

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            

                            </TableCell>
                            </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظممالیات===undefined)||(data.ناظممالیات===null)||(data.ناظممالیات==='')?<span>
                                NULL
                              </span>:<span>{data.ناظممالیات[0].name}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Father Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظممالیات===undefined)||(data.ناظممالیات===null)||(data.ناظممالیات==='')?<span>
                                NULL
                              </span>:<span>{data.ناظممالیات[0].fatherName}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Email

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظممالیات===undefined)||(data.ناظممالیات===null)||(data.ناظممالیات==='')?<span>
                                NULL
                              </span>:<span>{data.ناظممالیات[0].email}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Profession

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظممالیات===undefined)||(data.ناظممالیات===null)||(data.ناظممالیات==='')?<span>
                                NULL
                              </span>:<span>{data.ناظممالیات[0].profession}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Mobile No (WhatsApp)


                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظممالیات===undefined)||(data.ناظممالیات===null)||(data.ناظممالیات==='')?<span>
                                NULL
                              </span>:<span>{data.ناظممالیات[0].mobileWhatsapNo}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Educational Qualification

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظممالیات===undefined)||(data.ناظممالیات===null)||(data.ناظممالیات==='')?<span>
                                NULL
                              </span>:<span>{data.ناظممالیات[0].educationalQualification}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                             Address

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظممالیات===undefined)||(data.ناظممالیات===null)||(data.ناظممالیات==='')?<span>
                                NULL
                              </span>:<span>{data.ناظممالیات[0].address}</span>}

                            </TableCell>

                          </TableRow>
                         
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Rafaqat No

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظممالیات===undefined)||(data.ناظممالیات===null)||(data.ناظممالیات==='')?<span>
                                NULL
                              </span>:<span>{data.ناظممالیات[0].RafaqatNo}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                                      
                            <TableCell style={Texthead} component="th" scope="row">
                            ناظم سوشل میڈیا:

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            

                            </TableCell>
                            </TableRow>
                          
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمسوشلمیڈیا===undefined)||(data.ناظمسوشلمیڈیا===null)||(data.ناظمسوشلمیڈیا==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمسوشلمیڈیا[0].name}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Father Name

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمسوشلمیڈیا===undefined)||(data.ناظمسوشلمیڈیا===null)||(data.ناظمسوشلمیڈیا==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمسوشلمیڈیا[0].fatherName}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Email

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمسوشلمیڈیا===undefined)||(data.ناظمسوشلمیڈیا===null)||(data.ناظمسوشلمیڈیا==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمسوشلمیڈیا[0].email}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                              Profession

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمسوشلمیڈیا===undefined)||(data.ناظمسوشلمیڈیا===null)||(data.ناظمسوشلمیڈیا==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمسوشلمیڈیا[0].profession}</span>}

                            </TableCell>

                          </TableRow>
                           <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Mobile No (WhatsApp)


                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمسوشلمیڈیا===undefined)||(data.ناظمسوشلمیڈیا===null)||(data.ناظمسوشلمیڈیا==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمسوشلمیڈیا[0].mobileWhatsapNo}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Educational Qualification

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمسوشلمیڈیا===undefined)||(data.ناظمسوشلمیڈیا===null)||(data.ناظمسوشلمیڈیا==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمسوشلمیڈیا[0].educationalQualification}</span>}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                             Address

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمسوشلمیڈیا===undefined)||(data.ناظمسوشلمیڈیا===null)||(data.ناظمسوشلمیڈیا==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمسوشلمیڈیا[0].address}</span>}

                            </TableCell>

                          </TableRow>
                         
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={TextColor} component="th" scope="row">
                            Rafaqat No

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.ناظمسوشلمیڈیا===undefined)||(data.ناظمسوشلمیڈیا===null)||(data.ناظمسوشلمیڈیا==='')?<span>
                                NULL
                              </span>:<span>{data.ناظمسوشلمیڈیا[0].RafaqatNo}</span>}

                            </TableCell>

                          </TableRow>



                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={Texthead1} component="th" scope="row">
                            User Type

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              {data.userType}

                            </TableCell>

                          </TableRow>
                        
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={Texthead1} component="th" scope="row">
                            District Area

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                              {(data.DistrictArea===undefined)||(data.DistrictArea===null)||(data.DistrictArea==='')?<span>Null</span>:data.DistrictArea.name}

                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={Texthead1} component="th" scope="row">
                            PPArea

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.PPArea===undefined)||(data.PPArea===null)||(data.PPArea==='')?<span>Null</span>:data.PPArea.name}


                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={Texthead1} component="th" scope="row">
                            UC Area

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {(data.UCArea===undefined)||(data.UCArea===null)||(data.UCArea==='')?<span>Null</span>:data.UCArea.name}


                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={Texthead1} component="th" scope="row">
                            Unit Area

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {data.UnitArea===undefined?<span>Null</span>:data.UnitArea.name}


                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell style={Texthead1} component="th" scope="row">
                            Date of Form

                            </TableCell>
                            <TableCell style={TextColor} component="th" scope="row">
                            {data.DateOfForm===undefined?<span>Null</span>:data.DateOfForm}


                            </TableCell>

                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell  style={{fontWeight:'bold',fontSize:'17px'}} component="th" scope="row">
                           Signature

                            </TableCell>
                            <TableCell style={{fontWeight:'bold',fontSize:'17px',fontStyle:'italic'}} component="th" scope="row">
                            {data.nameAndSignature===undefined?<span>Null</span>:data.nameAndSignature}


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

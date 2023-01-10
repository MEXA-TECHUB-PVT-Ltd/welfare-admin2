import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Select from '@mui/material/Select';
import Header from "../../components/Header";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import DoneIcon from '@mui/icons-material/Done';
import Tooltip from '@mui/material/Tooltip';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import url from "../url"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import React, { useState, useEffect } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  overflowY: 'scroll',
  bgcolor: 'beige',
  borderRadius: '10px',
  padding: "0px 40px 40px 40px",
  boxShadow: 24,
  // p: 4,
};
const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'beige',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
// Tabs 
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const TabsStyle = {
  color: '#9a9cab',
  fontWeight: '700'

}
const Team = () => {
  // Tabs value
  const navigate = useNavigate();

  const headers = {
    'Content-Type': 'application/json'
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Update 
  const [email, setemail] = useState('')
  const [name, setName] = useState('')
  const [profession, setprofession] = useState('')
  const [userType, setuserType] = useState('')
  const [DistrictArea, setDistrictArea] = useState('')
  const [forum, setforum] = useState('')
  const [role, setrole] = useState('')
  const [department, setdepartment] = useState('')
  const [PPArea, setPPArea] = useState('')
  const [UCArea, setUCArea] = useState('')
  const [UnitArea, setUnitArea] = useState('')
  const [groupRolesG, setgroupRolesG] = useState('');
  const [whatsapNo, setwhatsapNo] = useState('');

  const [IdData, setIdData] = useState('')
  const [dataDept, setDataDept] = useState([]);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = (row) => {
    axios.get(`${url}get-Uc-User-Group`, {
      params: {
        _id: row
      }
    }, { headers }).then(response => {
      console.log('response')
      console.log(response.data);
      // setDataGet(response.data)
      setIdData(response.data._id);
      setName(response.data.name);
      setemail(response.data.email);
      setgroupRolesG(response.data.GroupRoles)
      setwhatsapNo(response.data.mobileWhatsapNo)

      setOpenUpdate(true);
    })
      .catch(err => {
        console.log(err)
      })
    console.log(row)
  }
  const handleCloseUpdate = () => setOpenUpdate(false);
  // Delete 
  const [visibleDelete, setVisibleDelete] = useState(false)
  // Delete 
  // Alert 
  const deleteData = (id) => {
    console.log('deleting User')
    console.log(id);
    axios.delete(`${url}delete-Uc-User-Group`, {
      data: {
        _id: id
      }
    }, { headers })
      .then(res => {
        console.log(res);
        console.log(res.data);
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: {
            backgroundColor: '#4CAF50', /* Green */
            border: 'none',
            color: 'white',
            padding: '15px 32px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px'
          }
        })

        swalWithBootstrapButtons.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              'Deleted!',
            )
            //    refresh componenet 
            getAllData()

            // window.location.reload(false);
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Member is safe :)',
              'error'
            )
          }
        })
        // setOpen1(true);
      }).catch(err => {
        console.log(err)
      })
  }
  // View 
  const handleClickOpen = (idData) => {
    console.log(idData);
    // setShow(false);
    navigate('/manageMembersUcView',
      {
        state: {
          post_id: idData,
          // data: props.data
        }
      });
  };
  // update 
  const submitHandler = async () => {
// console.log(UCArea)

    axios.put(`${url}update-Uc-User-Group`, {
      _id: IdData,
      GroupRoles: groupRolesG,
      email: email,
      mobileWhatsapNo: whatsapNo,

    }, { headers }).then(response => {
      console.log(response)
      setOpenUpdate(false);
      getAllData()

      let timerInterval
      Swal.fire({
        title: 'Updated Member Successfully',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
          

        }
      })
    })
      .catch(err => {
        console.log(err)
      })


  }
  const columns = [
    // { field: "_id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      // type: "number",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "RafaqatNo",
      headerName: "Rafaqat No",
      flex: 1,
    },
    {
      field: "mobileWhatsapNo",
      headerName: "Mobile No( WhatsApp )",
      flex: 1,
    },
    {
      field: "DistrictArea",
      headerName: "DistrictArea",
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            <span>{row.row.DistrictArea === undefined ? <span>NUll</span> : <span>{row.row.DistrictArea.name}</span>}</span>
          </>
        )
      }
    },
    {
      field: "PPArea",
      headerName: "PPArea",
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            <span>{row.row.PPArea === undefined ? <span>NUll</span> : <span>{row.row.PPArea.name}</span>}</span>
          </>
        )
      }
    },
    {
      field: "UCArea",
      headerName: "UCArea",
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            <span>{row.row.UCArea === undefined ? <span>NUll</span> : <span>{row.row.UCArea.name}</span>}</span>
          </>
        )
      }
    },
    {
      field: "GroupRoles",
      headerName: "Group Roles",
      flex: 1,
    },
   
    {
      field: "_id",
      headerName: "Action",
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            
            <IconButton onClick={() => handleOpenUpdate(row.row._id)}>
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => handleClickOpen(row.row._id)}>
              <Tooltip title="View">
                <VisibilityIcon />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => deleteData(row.row._id)}>
              <Tooltip title="Delete">

                <DeleteIcon style={{ color: 'red' }} />
              </Tooltip>
            </IconButton>
          </>

        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer style={{ marginBottom: '5px' }}>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        {/* <Button startIcon={<AddIcon />} onClick={() => handleOpenAdd()}>
          Add
        </Button> */}

      </GridToolbarContainer>
    );
  }
  //Get API Axios
  const [data, setData] = useState([]);
  const [districtAll, setDistrictAll] = useState([]);
  const [PPAll, setPPAll] = useState([]);
  const [UCAll, setUCAll] = useState([]);
  const [UnitAll, setUnitAll] = useState([]);

  const [loading, setLoading] = useState(true);
  const getAllData = () => {
    axios.get(`${url}get-all-Uc-User-Group`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setData(response.data);
        // setimagesdata(response.data.images);

        setLoading(false)
      })
      .catch(error => console.error(`Error:${error}`));

  }
  const getAllDataDept = () => {
    axios.get(`${url}get-all`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setDataDept(response.data);
        // setimagesdata(response.data.images);

      })
      .catch(error => console.error(`Error:${error}`));

  }
  const getAllDataDistrict = () => {
    axios.get(`${url}get-all-district`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setDistrictAll(response.data);

      })
      .catch(error => console.error(`Error:${error}`));

  }
  const getAllDataPP = () => {
    axios.get(`${url}get-all-pp`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setPPAll(response.data);

      })
      .catch(error => console.error(`Error:${error}`));

  }
  const getAllDataUC = () => {
    axios.get(`${url}get-all-uc`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setUCAll(response.data);

      })
      .catch(error => console.error(`Error:${error}`));

  }
  const getAllDataUnit = () => {
    axios.get(`${url}get-all-unit`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setUnitAll(response.data);

      })
      .catch(error => console.error(`Error:${error}`));

  }
  useEffect(() => {
    getAllData();
    getAllDataDept();
    getAllDataDistrict();
    getAllDataPP();
    getAllDataUC();
    getAllDataUnit();
    // getAllDataApprove();

  }, []);
  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/home">
            <HomeIcon />
          </Link>

          <Typography color="text.primary">Manage UC Group Members</Typography>
        </Breadcrumbs>

      </Box>
      <Box m="20px">
        <Grid container spacing={2} >
          <Grid item xs={12} md={12} mt>
            <Header title="Members" subtitle="Managing the UC Members" />


          </Grid>
        
        </Grid>

        <Box sx={{ width: '100%' }}>
          <Box
            m="5px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#52ad4a",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#52ad4a",
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid
              // {...data}

              rows={data}
              columns={columns}
              getRowId={(row) => row._id}
              loading={loading}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </Box>
          {/* </TabPanel> */}

        </Box>

      
        {/* Update  */}
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openUpdate}
            onClose={handleCloseUpdate}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openUpdate}>
              <Box sx={style}>

                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={10} md={10}>
                    <Typography id="transition-modal-title" variant="h5" component="h2">
                      Update Member
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    {/* <MDButton  variant="gradient" color="error"  > */}
                    <CloseIcon onClick={handleCloseUpdate} style={{ cursor: 'pointer' }} />

                    {/* </MDButton> */}
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Email :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      WhatsApp Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      value={whatsapNo}
                      onChange={(e) => setwhatsapNo(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
              
                
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                    Group Roles :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Group Roles</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={groupRolesG}
                        label="Group Roles"
                        onChange={(e) => setgroupRolesG(e.target.value)}
                      >
                         <MenuItem value='صد ر'>صد ر</MenuItem>
                        <MenuItem value='ناظم'>ناظم</MenuItem>
                        <MenuItem value='ناظم دعوت'>ناظم دعوت</MenuItem>
                        <MenuItem value='ناظم تربیت'>ناظم تربیت</MenuItem>
                        <MenuItem value='ناظم ممبرشپ'>ناظم ممبرشپ</MenuItem>
                        <MenuItem value='ناظم مالیات'>ناظم مالیات</MenuItem>
                        <MenuItem value='ناظم سوشل میڈیا'>ناظم سوشل میڈیا</MenuItem>

                      </Select>
                    </FormControl>


                  </Grid>
                  
               
                 


                  <Grid item xs={12} md={12} align="center">
                    <Button variant="contained" onClick={() => submitHandler()}>
                      Update
                    </Button>
                    {/* <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler1() }}>
                                                            Submit
                                                        </MDButton> */}
                  </Grid>
                  <Grid item xs={12} md={4}>

                  </Grid>
                </Grid>
              </Box>
            </Fade>
          </Modal>
        </div>
        {/* Delete  */}
        <div>
          <Modal
            open={visibleDelete}
            onClose={() => setVisibleDelete(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style1}>
              <Grid container spacing={2} align="center">
                <Grid item xs={12} md={12}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to delete<br /> this Staff Member?
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button startIcon={<DoneIcon />} variant="outlined" onClick={() => setVisibleDelete(false)}>
                    Yes
                  </Button>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Button startIcon={<CloseIcon />} variant="contained" onClick={() => setVisibleDelete(false)}>
                    No
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </div>
        {/* </Box> */}
      </Box>
    </>
  );
};

export default Team;

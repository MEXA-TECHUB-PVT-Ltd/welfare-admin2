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
  // const [DataGet, setDataGet] = useState([]);
  const [gender, setgender] = useState('')
  const [email, setemail] = useState('')
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [profession, setprofession] = useState('')
  const [city, setCity] = useState('')
  const [userType, setuserType] = useState('')
  const [DistrictArea, setDistrictArea] = useState('')
  const [forum, setforum] = useState('')
  const [role, setrole] = useState('')
  const [department, setdepartment] = useState('')
  const [PPArea, setPPArea] = useState('')
  const [UCArea, setUCArea] = useState('')
  const [UnitArea, setUnitArea] = useState('')
  const [IdData, setIdData] = useState('')
  const [dataDept, setDataDept] = useState([]);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = (row) => {
    axios.get(`${url}get-user`, {
      params: {
        _id: row
      }
    }, { headers }).then(response => {
      console.log('response')
      console.log(response.data);
      // setDataGet(response.data)
      setIdData(response.data._id);
      setName(response.data.name);
      setDob(response.data.dob);
      setemail(response.data.email);
      setforum(response.data.forum);
      setuserType(response.data.userType);
      setgender(response.data.gender);
      setprofession(response.data.profession);
      setrole(response.data.role);
      setdepartment(response.data.department)
      setDistrictArea(response.data.DistrictArea._id)
      setPPArea(response.data.PPArea._id)
      setUCArea(response.data.UCArea._id)
      setUnitArea(response.data.UnitArea._id)

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
    axios.delete(`${url}delete-user`, {
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
    navigate('/manageMembersView',
      {
        state: {
          post_id: idData,
          // data: props.data
        }
      });
  };
  // update 
  const submitHandler = async () => {

    axios.put(`${url}update-user`, {
      // id:1,
      profession: profession,
      role: role,
      _id: IdData,
      userType: userType,
      DistrictArea: DistrictArea,
      PPArea: PPArea,
      UCArea: UCArea,
      UnitArea: UnitArea,
      forum: forum,
      department: department


    }, { headers }).then(response => {
      console.log(response)
      setOpenUpdate(false);

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
          setprofession('');
          setrole('');
          setuserType('');
          setDistrictArea('');
          setPPArea('');
          setUCArea('');
          setUnitArea('');
          setforum('');
          setdepartment('')

        }
      })
    })
      .catch(err => {
        console.log(err)
      })
    // })


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
      flex: 2,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "profession",
      headerName: "Profession",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      renderCell: (row) => {
        return (
          <>
          <span>{row.row.department===undefined?<span>NUll</span>:<span>{row.row.department.departmentName}</span>}</span>
          </>
          )}
    },
    {
      field: "forum",
      headerName: "Forum",
      flex: 1,
    },
    {
      field: "userType",
      headerName: "User Type",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    // {
    //   field: "approvalStatus",
    //   headerName: "Action",
    //   flex: 1,
    //   renderCell: (row) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           row.row.approvalStatus === "true"
    //             ? colors.greenAccent[600]
    //             : row.row.approvalStatus === "false"
    //               ? colors.greenAccent[700]
    //               : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >

    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {row.row.approvalStatus ? <DoneAllIcon onClick={() => checkbox1(row.row._id)} /> : <CloseIcon onClick={() => checkbox(row.row._id)} />}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "_id",
      headerName: "Action",
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            {/* {row.row.approvalStatus ?
              <IconButton onClick={() => checkbox1(row.row._id)}>
                <Tooltip title="Unapprove">
               UnApprove
                </Tooltip>
              </IconButton>
              :
              <IconButton onClick={() => checkbox(row.row._id)}>
                <Tooltip title="Approve">
                 Approve
                </Tooltip>
              </IconButton>
            } */}
            {/* className */}
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
  const [filterByDept, setfilterByDept] = useState('')
  const [filterByForum, setfilterByForum] = useState('')
  const [filterByRole, setfilterByRole] = useState('')
  const [filterByUserType, setfilterByUserType] = useState('')

  const FilterDataDEPT= (DEPT) => {
    setLoading(true)
    axios.get(`${url}get-users-by-department`, {
      params: {
        department: DEPT,
      }
    }).then(response => {
      const allData = response.data;
      console.log('allData');
      console.log(allData);
      setData(response.data);
      // setimagesdata(response.data.images);
  
      setLoading(false)
      setfilterByDept('')
   
    })
      .catch(error => console.error(`Error:${error}`));
  
  }
  const FilterDataROLE= (Role) => {
    setLoading(true)
    axios.get(`${url}get-users-by-role`, {
      params: {
        role: Role,
      }
    }).then(response => {
      const allData = response.data;
      console.log('allData');
      console.log(allData);
      setData(response.data);
      // setimagesdata(response.data.images);
  
      setLoading(false)
      setfilterByRole('')
   
    })
      .catch(error => console.error(`Error:${error}`));
  
  }
  const FilterDataForum= (Forum) => {
    setLoading(true)
    axios.get(`${url}get-users-by-forum`, {
      params: {
        forum: Forum,
      }
    }).then(response => {
      const allData = response.data;
      console.log('allData');
      console.log(allData);
      setData(response.data);
      // setimagesdata(response.data.images);
  
      setLoading(false)
      setfilterByForum('')
   
    })
      .catch(error => console.error(`Error:${error}`));
  
  }
  const FilterDataUserType= (userType) => {
    setLoading(true)
    axios.get(`${url}get-users-by-user-type`, {
      params: {
        userType: userType,
      }
    }).then(response => {
      const allData = response.data;
      console.log('allData');
      console.log(allData);
      setData(response.data);
      // setimagesdata(response.data.images);
  
      setLoading(false)
      setfilterByUserType('')
   
    })
      .catch(error => console.error(`Error:${error}`));
  
  }

  
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
    axios.get(`${url}get-all-users`)
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

          <Typography color="text.primary">Manage Members</Typography>
        </Breadcrumbs>

      </Box>
      <Box m="20px">
        <Grid container spacing={2} >
          <Grid item xs={12} md={12} mt>
            <Header title="Members" subtitle="Managing the Members" />


          </Grid>
          <Grid item xs={12} md={3} mt>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter by Department</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterByDept}
                  label="Filter by Department"
                onChange={(e) => FilterDataDEPT(e.target.value)}
                >
                  {dataDept.map((row) => (
                    <MenuItem value={row._id}>{row.departmentName}</MenuItem>
                  ))}




                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} mt>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter by Forum</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterByForum}
                  label="Filter by Forum"
                onChange={(e) => FilterDataForum(e.target.value)}
                >
                    <MenuItem value='TMQ'>TMQ</MenuItem>
                    <MenuItem value='PAT'>PAT</MenuItem>
                    <MenuItem value='MWL'>MWL</MenuItem>
                    <MenuItem value='MUC'>MUC</MenuItem>
                    <MenuItem value='MYL'>MYL</MenuItem>
                    <MenuItem value='MSM'>MSM</MenuItem>




                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} mt>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter by Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterByRole}
                  label="Filter by Role"
                onChange={(e) => FilterDataROLE(e.target.value)}
                >
                    <MenuItem value='Executive Member'>Executive Member</MenuItem>
                    <MenuItem value='General Secretary'>General Secretary</MenuItem>
                    <MenuItem value='President'>President</MenuItem>




                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} mt>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Filter by User Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterByUserType}
                  label="Filter by Forum"
                onChange={(e) => FilterDataUserType(e.target.value)}
                >
                    <MenuItem value='District'>District</MenuItem>
                    <MenuItem value='Province'>Province</MenuItem>
                    <MenuItem value='UC'>UC</MenuItem>
                    <MenuItem value='Unit'>Unit</MenuItem>






                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ width: '100%' }}>
          {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab style={TabsStyle} label="All Requests" {...a11yProps(0)} />
              <Tab style={TabsStyle} label="Approved Requests" {...a11yProps(1)} />
              <Tab style={TabsStyle} label="Unapproved Requests" {...a11yProps(2)} />
            </Tabs>

          </Box> */}
          {/* <TabPanel value={value} index={0}> */}
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

        {/* Add  */}
        {/* <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openAdd}
            onClose={handleCloseAdd}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openAdd}>
              <Box sx={style}>

             
                <Grid container spacing={2} >
                  <Grid item xs={12} md={12} mt>
                    <Typography variant="h2" style={{ color: '#52ad4a', fontWeight: 700 }} gutterBottom>
                      Add Membership Request
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>

                    <Typography mt={2} variant="h5" style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Image
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={6}>
                    <input type="file" name="image" placeholder="image"
                      onChange={(e) => setimage(e.target.files[0])} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                 
                    <TextField value={email}
                      onChange={(e) => setemail(e.target.value)
                      } id="filled-basic" label="Enter Email" variant="filled" />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Name
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField value={name1}
                      onChange={(e) => setname1(e.target.value)
                      } id="filled-basic" label="Enter Name" variant="filled" />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Profession
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField value={profession}
                      onChange={(e) => setprofession(e.target.value)
                      } id="filled-basic" label="Enter Profession" variant="filled" />
                  </Grid>

                 

                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Select Gender
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        onChange={(e) => setgender(e.target.value)}
                      >
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>

                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={12} align="center">
                    <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => handleCloseUpdate()}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          </Modal>
        </div> */}
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
                      Update Members
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
                      disabled
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Dob :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      value={dob}
                      disabled
                      // type="number"
                      onChange={(e) => setDob(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Forum :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Forum</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={forum}
                        label="forum"
                        onChange={(e) => setforum(e.target.value)}
                      >
                        <MenuItem value='TMQ'>TMQ</MenuItem>
                        <MenuItem value='PAT'>PAT</MenuItem>
                        <MenuItem value='MWL'>MWL</MenuItem>
                        <MenuItem value='MUC'>MUC</MenuItem>
                        <MenuItem value='MYL'>MYL</MenuItem>
                        <MenuItem value='MSM'>MSM</MenuItem>

                      </Select>
                    </FormControl>


                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Roles :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>

                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={(e) => setrole(e.target.value)}
                      >
                        <MenuItem value='Executive Member'>Executive Member</MenuItem>
                        <MenuItem value='General Secretary'>General Secretary</MenuItem>
                        <MenuItem value='President'>President</MenuItem>

                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Department :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Department</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={department}
                        label="Department"
                        onChange={(e) => setdepartment(e.target.value)}
                      >
                        {dataDept.map((row) => (
                          <MenuItem value={row._id}>{row.departmentName}</MenuItem>
                        ))}

                      </Select>
                    </FormControl>


                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      User Type :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userType}
                        label="User Type"
                        onChange={(e) => setuserType(e.target.value)}
                      >
                        <MenuItem value='District'>District</MenuItem>
                        <MenuItem value='Province'>Province</MenuItem>
                        <MenuItem value='UC'>UC</MenuItem>
                        <MenuItem value='Unit'>Unit</MenuItem>

                      </Select>
                    </FormControl>


                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      District Area :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">District Area</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={DistrictArea}
                        label="District Area"
                        onChange={(e) => setDistrictArea(e.target.value)}
                      >
                        {districtAll.map((row) => (
                          <MenuItem value={row._id}>{row.name}</MenuItem>
                        ))}

                      </Select>
                    </FormControl>
                    {/* <TextField

                      value={DistrictArea}
                      onChange={(e) => setDistrictArea(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" /> */}

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      PP Area :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">PP Area</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={PPArea}
                        label="PP Area"
                        onChange={(e) => setPPArea(e.target.value)}
                      >
                        {PPAll.map((row) => (
                          <MenuItem value={row._id}>{row.name}</MenuItem>
                        ))}

                      </Select>
                    </FormControl>


                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      UC Area :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">UC Area</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={UCArea}
                        label="UC Area"
                        onChange={(e) => setUCArea(e.target.value)}
                      >
                        {UCAll.map((row) => (
                          <MenuItem value={row._id}>{row.name}</MenuItem>
                        ))}

                      </Select>
                    </FormControl>
                    {/* <TextField

                      value={UCArea}
                      onChange={(e) => setUCArea(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" /> */}

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Unit Area :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Unit Area</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={UnitArea}
                        label="Unit Area"
                        onChange={(e) => setUnitArea(e.target.value)}
                      >
                        {UnitAll.map((row) => (
                          <MenuItem value={row._id}>{row.name}</MenuItem>
                        ))}

                      </Select>
                    </FormControl>
                    {/* <TextField

                      value={UnitArea}
                      onChange={(e) => setUnitArea(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" /> */}

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

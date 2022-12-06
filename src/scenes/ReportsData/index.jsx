import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Select from '@mui/material/Select';
import Header from "../../components/Header";
import Button from '@mui/material/Button';
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
import TextareaAutosize from '@mui/material/TextareaAutosize';
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
  const [title, setTitle] = useState('');
  const [reportBy, setReportBy] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  // Approve 
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => {
    setOpenAdd(true);
  }
  const handleCloseAdd = () => setOpenAdd(false);
  // Update 
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleCloseUpdate = () => setOpenUpdate(false);
  // Delete 
  const [visibleDelete, setVisibleDelete] = useState(false)
  // Delete 
  // Alert 
  const deleteData = (id) => {
    console.log('deleting User')
    console.log(id);
    axios.delete(`${url}delete-report`, {
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
            TextColor: 'black',

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
            // refresh

          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Reports is safe :)',
              'error'
            )
          }
          getAllData()
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
    navigate('/reportsView',
      {
        state: {
          post_id: idData,
          // data: props.data
        }
      });
  };
  // Submit 
  const submitHandler = async () => {
        axios.post(`${url}create-report`, {
          title: title,
          reportBy: reportBy,
          eventCategory: eventCategory,
          description: description,
          location: location,
          date: eventDate,
          time:eventDate,
          images:selectedFile1

        }, { headers }).then(response => {
          console.log(response)
          setOpenAdd(false);
          setData([...data, response.data]);
          setTitle('');
          setReportBy('');
          setEventCategory('');
          setDescription('');
          setLocation('');
          setEventDate('');
          setSelectedFile1([])

          let timerInterval
          Swal.fire({
            title: 'Created Report Successfully',
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
      // })


  }
  const columns = [
    {
      field: "reportId",
      headerName: "reportId",
      flex: 1,
    },
    {
      field: "eventCategory",
      headerName: "eventCategory",
      // type: "number",
      flex: 2,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "department",
      headerName: "department",
      flex: 1,
    },
    {
      field: "date",
      headerName: "date",
      flex: 1,
    },
    {
      field: "userType",
      headerName: "userType",
      flex: 1,
    },
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
            {/* <IconButton onClick={() => handleOpenUpdate()}>
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            </IconButton> */}
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
  const [selectedFile1, setSelectedFile1] = useState('')
  const onFileChange = (e) => {
    console.log(e)
    const ProductImg = e;
    console.log('ProductImg')

    console.log(ProductImg)
    const formData = new FormData();

    for (let i = 0; i < ProductImg.length; i++) {
      formData.append('images', ProductImg[i]);
      console.log(ProductImg[i]);
    }


    axios.post(`${url}upload-multiple-images`, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(response => {
        console.log(response.data.images)
        setSelectedFile1(response.data.images)

      })

  }
  //Get API Axios
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const getAllData = () => {
    axios.get(`${url}get-all-report`).then((response) => {
      const allData = response.data;
      console.log(allData);
      setData(response.data);
      setLoading(false)
    })
      .catch(error => console.error(`Error:${error}`));

  }
  const getAllDataUsers = () => {
    axios.get(`${url}get-all-users`).then((response) => {
      const allData = response.data;
      console.log(allData);
      setUsers(response.data);
      // setLoading(false)
    })
      .catch(error => console.error(`Error:${error}`));

  }
  
  useEffect(() => {
    getAllData();
    getAllDataUsers()
    // getAllDataUnapprove();
    // getAllDataApprove();

  }, []);
  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/home">
            <HomeIcon />
          </Link>

          <Typography color="text.primary">Reports</Typography>
        </Breadcrumbs>

      </Box>
      <Box m="20px">
      <Grid container spacing={2} >
          <Grid item xs={12} md={10} mt>
        <Header title="Reports" subtitle="Managing the Reports" />
        </Grid>
        <Grid item xs={12} md={2} mt>
            <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => handleOpenAdd()}>
              Add
            </Button>

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
        <div>
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

                {/* <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  Add Membership Request
                </Typography> */}
                <Grid container spacing={2} >
                  <Grid item xs={12} md={12} mt>
                    <Typography variant="h2" style={{ color: '#52ad4a', fontWeight: 700 }} gutterBottom>
                      Add Report
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2}>

                    <Typography mt={2} variant="h5" style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Images
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={4}>
                    <input type="file" style={{marginTop:'20px'}} name="image" placeholder="image" multiple
                      onChange={(e) => onFileChange(e.target.files)} />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Title
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    {/* <input type="text" name="name" placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)
                      }
                    /> */}
                    <TextField value={title}
                      onChange={(e) => setTitle(e.target.value)
                      } id="filled-basic" label="Enter Title" variant="filled" />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Report By
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={3}>
                    
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select User</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={reportBy}
                        label="Report By"
                        onChange={(e) => setReportBy(e.target.value)}
                      >
                         { users.map((row) => (
                                                                    <MenuItem value={row._id}>{row.name}</MenuItem>
                                                                ))}


                      </Select>
                    </FormControl>

                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Event Category
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={eventCategory}
                        label="Event Category"
                        onChange={(e) => setEventCategory(e.target.value)}
                      >
                        <MenuItem value='Public'>Public</MenuItem>
                        <MenuItem value='Private'>Private</MenuItem>

                      </Select>
                    </FormControl>
                  </Grid>

                  {/* <Grid item xs={12} md={6}>
                            <div >
                              Select Date of Birth
                            </div>

                          </Grid>
                          <Grid item xs={12} md={6}>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="DOB"
                                value={dob}
                                onChange={(newValue) => {
                                  setdob(newValue);
                                }}
                              />
                            </LocalizationProvider>
                          </Grid> */}

                  <Grid item xs={12} md={3}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Description
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextareaAutosize
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxRows={4}
                      aria-label="maximum height"
                      placeholder="Description"
                      style={{ width: '100%',height:'70px' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Location
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextareaAutosize
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      maxRows={4}
                      aria-label="maximum height"
                      placeholder="Location Address"
                      style={{ width: '100%',height:'70px' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Select Date of Event
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={3}>
                  <input type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                       id="birthday" name="birthday" style={{ width: '87%', height: '50px', border: 'none', borderBottom: '1px solid #a4a493', backgroundColor: '#e7e7cf' }} />
                  </Grid>

                  <Grid item xs={12} md={12} align="center">
                    {/* <button type='submit'>Submit</button> */}
                    <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => submitHandler()}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          </Modal>
        </div>
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
                      Update Staff Members
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    {/* <MDButton  variant="gradient" color="error"  > */}
                    <CloseIcon onClick={handleCloseUpdate} style={{ cursor: 'pointer' }} />

                    {/* </MDButton> */}
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      // value={SubscriptionNameAdd}
                      // onChange={(e) => setSubscriptionNameAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Email :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField

                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Phone No :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      // value={SubscriptionShopsAdd}
                      type="number"
                      // onChange={(e) => setSubscriptionShopsAdd(e.target.value)} 
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Age :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField

                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Roles :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField

                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>


                  <Grid item xs={12} md={12} align="center">
                    <Button variant="contained" onClick={() => handleCloseUpdate()}>
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

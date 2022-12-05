import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import Select from '@mui/material/Select';

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
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
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Swal from 'sweetalert2'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import url from "../url"
// import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

// import MDButton from "../../components/MDButton";


// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
const imgStyle = {
  width: '50px',
}
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const headers = {
    'Content-Type': 'application/json'
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [EditFieldData, setEditFieldData] = useState([]);
  const [image, setimage] = useState([]);
  const [title, setTitle] = useState('');
  const [reportBy, setReportBy] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');

  const [email, setemail] = useState([]);
  const [gender, setgender] = useState([]);
  const [dob, setdob] = useState([]);
  const [name1, setname1] = useState([]);
  const [profession, setprofession] = useState([]);
  // Approve 
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => {
    setOpenAdd(true);
  }
  const handleCloseAdd = () => setOpenAdd(false);
  // Update 
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = (row) => {
    // setOpenUpdate(true);
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
    axios.delete(`${url}delete-event`, {
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
              'Event is safe :)',
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
    navigate('/eventView',
      {
        state: {
          post_id: idData,
          // data: props.data
        }
      });
  };
  // Submit 
  const submitHandler = async () => {
    // // Axios image
    // const formData = new FormData()
    // formData.append('image', image)
    // axios.post(`${url}upload-image`,
    //   formData).then(response => {
    //     console.log(response.data)


        axios.post(`${url}create-event`, {
          // id:1,
          // images: image,
          title: title,
          description: description,
          location: location,
          date: eventDate,
          category: eventCategory,
          department:reportBy

        }, { headers }).then(response => {
          console.log(response)
          setOpenAdd(false);
          // setData([...data, response.data]);
          getAllData()

          let timerInterval
          Swal.fire({
            title: 'Created Event Successfully',
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
    // { field: "_id", headerName: "ID" },
    {
      field: "departmentImg",
      headerName: "Image",
      flex: 1,
      renderCell: (row) => {
        return (
          <>
          {row.row.images.map((data, idx) => (
            <img style={imgStyle} src={`${url}${data}`} />
          ))}
          </>
        
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date",
      // type: "number",
      flex: 2,
      headerAlign: "left",
      align: "left",
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
        <Button startIcon={<AddIcon />} onClick={() => handleOpenAdd()}>
          Add
        </Button>

      </GridToolbarContainer>
    );
  }
  //Get API Axios
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataDept, setDataDept] = useState([]);

  const [imagesdata, setimagesdata] = useState("");

  const getAllData = () => {
    axios.get(`${url}get-events-by-date`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setData(response.data);
        setimagesdata(response.data.images);
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

            setLoading(false)
        })
        .catch(error => console.error(`Error:${error}`));

}
  useEffect(() => {
    getAllData();
    getAllDataDept();

    // getAllDataUnapprove();
    // getAllDataApprove();

  }, []);
  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon />
          </Link>

          <Typography color="text.primary">Events</Typography>
        </Breadcrumbs>

      </Box>
      <Box m="20px">
        <Header title="Events" subtitle="Managing the Events" />

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
                      Add Event
                    </Typography>
</Grid>
<Grid item xs={12} md={2}>

                    <Typography mt={2} variant="h5" style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Images
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={4}>
                    <input type="file" style={{marginTop:'20px'}} name="image" placeholder="image" multiple
                      onChange={(e) => setimage(e.target.files[0])} />
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


                  <Grid item xs={12} md={3}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Department
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={3}>
                    
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select Department</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={reportBy}
                        label="Select Department"
                        onChange={(e) => setReportBy(e.target.value)}
                      >
                         { dataDept.map((row) => (
                                                                    <MenuItem value={row._id}>{row.departmentName}</MenuItem>
                                                                ))}


                      </Select>
                    </FormControl>

                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                       Category
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

                
                 
                  <Grid item xs={12} md={12} align="center">
                    {/* <button type='submit'>Submit</button> */}
                    <Button variant="contained" style={{backgroundColor:'#52ad4a'}} onClick={() => submitHandler()}>
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

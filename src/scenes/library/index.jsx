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
import CardMedia from '@mui/material/CardMedia';
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

import url from "../url"
// import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import MDButton from "../../components/MDButton";
import Menu from '@mui/material/Menu';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import pdfIconImage from "../../components/Images/pdfIcon.png"


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
  width: 400,
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
const TextColorDrop = {
  color: 'black',
  fontSize: '12px',
  fontFamily: 'Roboto, sans-serif',
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
const Team = (props) => {
  // Tabs value
  // Menu 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
    console.log(id);

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
            console.log('deleting phone no')
            axios.put(`${url}remove-file-from-library`, {
                _id: id
            }, { headers })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    getAllData();
                    // setOpen1(true);
                }).catch(err => {
                    console.log(err)
                })
           
            // window.location.reload(false);
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',

            )
        }
    })

}
  // Submit 
    // submit add 
    const [loading1,setLoading1]=useState(true)
    const submitHandler = async (e) => {

      if (selectedFile1 == "") {
          window.alert("Please Select File");
      } else if (name == "") {
        window.alert("Please Fill All Fields");

      } else {
          // Loader 
          setLoading1(true)
          setTimeout(() => {
              setLoading1(false)

          }, 3000)
          // POst Request Add File
          axios.post(`${url}add-file-in-library`, {
              path: selectedFile1,
              name: name,
          }, { headers }).then(response => {
              console.log(response)
              setOpenAdd(false);
              setData([...data, response.data]);
              // Clear Dta 

              let timerInterval
              Swal.fire({
                  title: 'Created Library Successfully',
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
                      getAllData();
                      setSelectedFile1([]);
                      setname("")

                  }
              })
          })
              .catch(err => {
                  console.log(err)
              })
      }
  }
  const viewPdf = (Path) => {
    console.log(Path)
    let timerInterval
    Swal.fire({
      title: 'Opening File',
      html: 'Please wait !',
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
    navigate('/pdfView'
      ,
      {
        state: {
          link: Path,
          data: props.data
        }
      }
    );
  }
  // File 
  // Upload File 
  const [selectedFile1, setSelectedFile1] = useState('')
  const onFileChange = (e) => {
    console.log(e)
    const formData = new FormData();
    formData.append(
      "file",
      e,
    );

    // Details of the uploaded file 

    // Request made to the backend api 
    // Send formData object 
    axios.post(`${url}upload-file`, formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(response => {
        console.log(response)
        setSelectedFile1(response.data.file)

      })

  }
  //Get API Axios
  const [name, setname] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllData = () => {
    axios.post(`${url}get-library-items`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setData(response.data);

        setLoading(false)
      })
      .catch(error => console.error(`Error:${error}`));

  }
  useEffect(() => {
    getAllData();
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

          <Typography color="text.primary">Library</Typography>
        </Breadcrumbs>

      </Box>
      <Box m="20px">
        <Grid container spacing={2} >
          <Grid item xs={12} md={10} mt>
            <Header title="Library" subtitle="Managing the Library" />

          </Grid>
          <Grid item xs={12} md={2} mt>
            <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => {
              setOpenAdd(true)
            }}>
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
            {/* <DataGrid
                // {...data}

                rows={data}
                columns={columns}
                getRowId={(row) => row._id}
                loading={loading}
                components={{
                  Toolbar: CustomToolbar,
                }}
              /> */}
            <Grid container spacing={2} >
              {data.map((row) => (
                <Grid item xs={12} md={12} mt>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="pdf image"
                      height="140"
                      image={pdfIconImage}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                       File Name : {row.name}
                      </Typography>

                    </CardContent>
                    <CardActions>
                      <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => { viewPdf(row.path) }}>
                        View
                      </Button>
                      <Button variant="outlined" style={{ border: '1px solid #52ad4a', color: '#52ad4a' }} onClick={() => {
                        console.log(row._id)
                        deleteData(row._id)
                      }}>
                        Delete
                      </Button>

                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
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
                      Add Library Files
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h5" mt={2} style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      File Name
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    {/* <input type="text" name="name" placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)
                      }
                    /> */}
                    <TextField value={name}
                      onChange={(e) => setname(e.target.value)
                      } id="filled-basic" label="Enter File Name" variant="filled" />
                  </Grid>
                  <Grid item xs={12} md={6}>

                    <Typography mt={2} variant="h5" style={{ color: '#7e7e7e', fontWeight: 700 }} gutterBottom>
                      Select File
                    </Typography>

                  </Grid>
                  <Grid item xs={12} md={6}>
                    <input type="file" onChange={(e) => onFileChange(e.target.files[0])} />

                  </Grid>

                  <Grid item xs={12} md={12} align="center">
                    {/* <button type='submit'>Submit</button> */}
                    <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() =>submitHandler()}>
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

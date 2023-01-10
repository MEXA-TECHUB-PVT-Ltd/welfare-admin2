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
  overflowY: 'scroll',
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
  overflowY: 'scroll',
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const headers = {
    'Content-Type': 'application/json'
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [districtAll, setDistrictAll] = useState([]);
  const [PPAll, setPPAll] = useState([]);
  const [UCAll, setUCAll] = useState([]);
  const [UnitAll, setUnitAll] = useState([]);
  const [EditFieldData, setEditFieldData] = useState([]);
  const [image, setimage] = useState([]);
  const [email, setemail] = useState([]);
  const [gender, setgender] = useState([]);
  const [dob, setDob] = useState([]);
  const [name, setName] = useState([]);
  const [profession, setprofession] = useState([]);
  const [userType, setuserType] = useState('')
  const [DistrictArea, setDistrictArea] = useState('')
  const [forum, setforum] = useState('')
  const [role, setrole] = useState('')
  const [department, setdepartment] = useState('')
  const [PPArea, setPPArea] = useState('')
  const [UCArea, setUCArea] = useState('')
  const [UnitArea, setUnitArea] = useState('')
  const [IdData, setIdData] = useState('')
  // Approve 
  const [password, setPassword] = useState('');

  const checkbox = (Did) => {
    console.log(Did);
    setIdData(Did)
    axios.get(`${url}get-request`, {
      params: {
        _id: Did
      }
    }).then(response => {
      console.log('response')
      console.log(response);
      setemail(response.data.email)
      setgender(response.data.gender)
      setName(response.data.name)
      setDob(response.data.dob)
      setprofession(response.data.profession)
      // setData(response.data);
      // console.log(re);
      // setLoading(false)
      setOpenAdd(true)

    })
      .catch(err => {
        console.log(err)
      })

    // axios.put(`${url}update-approval-status`, {
    //   _id: Did,
    //   approvalStatus: 'true'
    // }, { headers }).then(response => {
    //   console.log(response);
    //   console.log('working fine')
    //   let timerInterval
    //   Swal.fire({
    //     title: 'Please wait!',
    //     timer: 2000,
    //     timerProgressBar: true,
    //     didOpen: () => {
    //       Swal.showLoading()
    //       const b = Swal.getHtmlContainer().querySelector('b')
    //       timerInterval = setInterval(() => {
    //         b.textContent = Swal.getTimerLeft()
    //       }, 100)
    //     },
    //     willClose: () => {
    //       clearInterval(timerInterval)
    //     }
    //   }).then((result) => {
    //     /* Read more about handling dismissals below */
    //     if (result.dismiss === Swal.DismissReason.timer) {
    //       console.log('I was closed by the timer')
    //       setOpenAdd(true)
    //     }
    //   })
    //   //    refresh componenet 
    //   getAllData();
    //   getAllDataUnapprove();
    //   getAllDataApprove();
    // })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  const checkbox1 = (Did) => {
    console.log(Did);
    axios.put(`${url}update-approval-status`, {
      _id: Did,
      approvalStatus: 'false'
    }, { headers }).then(response => {
      console.log(response);
      console.log('working fine')
      let timerInterval
      Swal.fire({
        title: 'Please wait!',
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
          console.log('I was closed by the timer111')
          // add member


        }
      })
      //    refresh componenet 
      getAllData();
      getAllDataUnapprove();
      getAllDataApprove();
    })
      .catch(err => {
        console.log(err)
      })


  }
  // Add 
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => {
    setOpenAdd(true);
  }
  const handleCloseAdd = () => setOpenAdd(false);
  const submitHandler1 = () => {
    axios.post(`${url}create-user`, {
      // id:1,
      name: name,
      email: email,
      dob: dob,
      password: password,
      profession: profession,
      role: role,
      userType: userType,
      DistrictArea: DistrictArea,
      PPArea: PPArea,
      UCArea: UCArea,
      UnitArea: UnitArea,
      forum: forum,
      department: department,
      approvalStatus: true
    }, { headers }).then(response => {
      console.log(response)
      if (response.data.message === 'Already Exist President or General Secretary for this department,forum,userRole') {
        setOpenAdd(false)
        console.log('rhrh')
        let timerInterval
        Swal.fire({
          title: 'Already Exist President or General Secretary for this department,forum,userRole',
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
            // getAllData();
            // getAllDataApprove();
            // getAllDataUnapprove();
          }
        })
      } else {
        setOpenAdd(false);
        // Membership Req approved 
        axios.put(`${url}update-approval-status`, {
          _id: IdData,
          approvalStatus: 'true'
        }, { headers }).then(response => {
          console.log(response);
          console.log('working fine')

          //    refresh componenet 
          getAllData();
          getAllDataUnapprove();
          getAllDataApprove();
        })
          .catch(err => {
            console.log(err)
          })

        let timerInterval
        Swal.fire({
          title: 'Created and Approved Request Successfully',
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
            getAllDataApprove();
            getAllDataUnapprove();
          }
        })
      }

    })
      .catch(err => {
        console.log(err)
      })
    // if(SubscriptionNameAdd===''||SubscriptionShopsAdd===''||SubscriptionPriceAdd===''){
    //     setSuccessSBVV(true)
    // }else{
    //     // axios.post(`${url}api/subscriptionPlan/create`, {
    //     //     name: SubscriptionNameAdd,
    //     //     no_of_shops: SubscriptionShopsAdd,
    //     //     price_per_month: SubscriptionPriceAdd,
    //     //     is_free_trail:'false'
    //     // }, { headers }).then(response => {
    //     //     console.log(response);
    //     //     setSuccessSBV(true)
    //     //     setOpenAdd(false)
    //     //     setSubscriptionNameAdd('')
    //     //     setSubscriptionShopsAdd('')
    //     //     setSubscriptionPriceAdd('')

    //     //     getAllData();

    //     // })
    //     //     .catch(err => {
    //     //         console.log(err)
    //     //     })
    // }

  }
  // Update 
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = (row) => {
    // setOpenUpdate(true);
    console.log(row)
  }
  const handleCloseUpdate = () => setOpenUpdate(false);
  // Delete 
  const [visibleDelete, setVisibleDelete] = useState(false)
  const deleteData = (id) => {
    // setAnchorEl(null);
    console.log('deleting Id')
    console.log(id);
    axios.delete(`${url}delete-request`, {
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
            getAllData();
            getAllDataUnapprove();
            getAllDataApprove();
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
        // setOpen1(true);
      }).catch(err => {
        console.log(err)
      })
  }
  // View 
  const handleClickOpen = (idData) => {
    console.log(idData);
    // setShow(false);
    navigate('/membershipRequestsView',
      {
        state: {
          post_id: idData,
          // data: props.data
        }
      });
  };
  // Submit 
  // const submitHandler = async (e) => {
  //   e.preventDefault()
  //   // Axios image
  //   const formData = new FormData()
  //   formData.append('image', image)
  //   axios.post(`${url}upload-image`,
  //     formData).then(response => {
  //       console.log(response.data)


  //       axios.post(`${url}create-request`, {
  //         // id:1,
  //         image: response.data,
  //         email: email,
  //         name: name,
  //         gender: gender,
  //         dob: dob,
  //         profession: profession,

  //       }, { headers }).then(response => {
  //         console.log(response)
  //         setOpenAdd(false);
  //         setData([...data, response.data]);

  //         let timerInterval
  //         Swal.fire({
  //           title: 'Created Member Successfully',
  //           timer: 2000,
  //           timerProgressBar: true,
  //           didOpen: () => {
  //             Swal.showLoading()
  //             const b = Swal.getHtmlContainer().querySelector('b')
  //             timerInterval = setInterval(() => {
  //               b.textContent = Swal.getTimerLeft()
  //             }, 100)
  //           },
  //           willClose: () => {
  //             clearInterval(timerInterval)
  //           }
  //         }).then((result) => {
  //           /* Read more about handling dismissals below */
  //           if (result.dismiss === Swal.DismissReason.timer) {
  //             console.log('I was closed by the timer')
  //           }
  //         })
  //       })
  //         .catch(err => {
  //           console.log(err)
  //         })
  //     })


  // }
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
      field: "approvalStatus",
      headerName: "Approval Status",
      flex: 1,
      renderCell: (row) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              row.row.approvalStatus === "true"
                ? colors.greenAccent[600]
                : row.row.approvalStatus === "false"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >

            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.row.approvalStatus ? <DoneAllIcon onClick={() => checkbox1(row.row._id)} /> : <CloseIcon onClick={() => checkbox(row.row._id)} />}
            </Typography>
          </Box>
        );
      },
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
  //Get API Axios
  const [data, setData] = useState([]);
  const [dataDept, setDataDept] = useState([]);

  const [loading, setLoading] = useState(true);
  const getAllData = () => {
    axios.get(`${url}get-all-requests`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setData(response.data);
        setLoading(false)
      })
      .catch(error => console.error(`Error:${error}`));

  }
  //Get API Axios
  const [dataApprove, setDataApprove] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const getAllDataApprove = () => {
    axios.get(`${url}get-approved-requests`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setDataApprove(response.data);
        setLoading1(false)
      })
      .catch(error => console.error(`Error:${error}`));

  }
  //Get API Axios
  const [dataunapprove, setDataUnapprove] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const getAllDataUnapprove = () => {
    axios.get(`${url}get-unapproved-requests`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setDataUnapprove(response.data);
        setLoading2(false)
      })
      .catch(error => console.error(`Error:${error}`));

  }
  //  const { data, loading } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 4,
  //   maxColumns: 6,
  // });
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
    getAllDataUnapprove();
    getAllDataApprove();
    getAllDataDept();
    getAllDataDistrict();
    getAllDataPP();
    getAllDataUC();
    getAllDataUnit();

  }, []);
  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon />
          </Link>

          <Typography color="text.primary">Membership Requests</Typography>
        </Breadcrumbs>

      </Box>
      <Box m="20px">
        <Grid container spacing={2} >
          <Grid item xs={12} md={10} mt>
            <Header title="Membership Requests" subtitle="Managing the Membership Requests" />

          </Grid>
          <Grid item xs={12} md={2} mt>
            <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => window.open('http://teamsuit.co/welfare/membership.php')}>
              Add
            </Button></Grid>
        </Grid>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab style={TabsStyle} label="All Requests" {...a11yProps(0)} />
              <Tab style={TabsStyle} label="Approved Requests" {...a11yProps(1)} />
              <Tab style={TabsStyle} label="Unapproved Requests" {...a11yProps(2)} />
            </Tabs>

          </Box>
          <TabPanel value={value} index={0}>
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
          </TabPanel>
          <TabPanel value={value} index={1}>
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

                rows={dataApprove}
                columns={columns}
                getRowId={(row) => row._id}
                loading={loading1}
                components={{
                  Toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
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

                rows={dataunapprove}
                columns={columns}
                getRowId={(row) => row._id}
                loading={loading2}
                components={{
                  Toolbar: CustomToolbar,
                }}
              />
            </Box>
          </TabPanel>
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


                <Grid container spacing={2} >
                  <Grid item xs={12} md={12} mt>
                    <Typography variant="h2" style={{ color: '#52ad4a', fontWeight: 700 }} gutterBottom>
                      Add Member
                    </Typography>
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
                      Password :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                    <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => submitHandler1()}>
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

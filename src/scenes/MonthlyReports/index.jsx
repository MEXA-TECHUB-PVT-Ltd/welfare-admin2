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
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from '@mui/material/TableContainer';
import url from "../url"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ClipLoader from "react-spinners/ClipLoader";
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
  width: '90%',
  height:'100%',
  overflowY:'scroll',
  bgcolor: 'beige',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};
const addbtn = {
  fontSize: '30px',
  color: '#52ad4a',
  marginTop: '15px',
  cursor: 'pointer'

}
const override = {
  display: ' block',
  margin: '0 auto',
  //   borderColor: 'red',
}
const color = "black"
const TextColor1 = {
  color: 'black',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: '700'
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
    setOpenUpdate(true);
    console.log(row)
  }
  const handleCloseUpdate = () => setOpenUpdate(false);
  // Delete 
  const [visibleDelete, setVisibleDelete] = useState(false)
  // Delete 
  // Alert 
  const deleteData = (id) => {
    console.log('deleting Report')
    console.log(id);
    axios.delete(`${url}monthlyReportDelete`, {
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
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Report is safe :)',
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
    navigate('/membershipRequestsView',
      {
        state: {
          post_id: idData,
          // data: props.data
        }
      });
  };
  const [userID, setuserID] = useState([]);
  const [LifeTimeMembersTarget, setLifeTimeMembersTarget] = useState([]);
  const [LifeTimeMembersAchieved, setLifeTimeMembersAchieved] = useState([]);
  const [RegularMembersTarget, setRegularMembersTarget] = useState([]);
  const [RegularMembersAchieved, setRegularMembersAchieved] = useState([]);
  const [RestorationOfDefaultersTarget, setRestorationOfDefaultersTarget] = useState([]);
  const [RestorationOfDefaultersAchieved, setRestorationOfDefaultersAchieved] = useState([]);
  const [MembershipAmountTarget, setMembershipAmountTarget] = useState([]);
  const [MembershipAmountAchieved, setMembershipAmountAchieved] = useState([]);
  const [NewUcsTarget, setNewUcsTarget] = useState([]);
  const [NewUcsAchieved, setNewUcsAchieved] = useState([]);
  const [MonthlyQuranCircleTarget, setMonthlyQuranCircleTarget] = useState([]);
  const [MonthlyQuranCircleAchieved, setMonthlyQuranCircleAchieved] = useState([]);
  const [MonthlyDaroodCircleTarget, setMonthlyDaroodCircleTarget] = useState([]);
  const [MonthlyDaroodCircleAchieved, setMonthlyDaroodCircleAchieved] = useState([]);
  const [MonthlyMeeting, setMonthlyMeeting] = useState([]);
  const [TrainingSession, setTrainingSession] = useState([]);
  const [created_date, setcreated_date] = useState(new Date());
  const [sortByDate, setSortByDate] = useState(new Date());
  // Submit 
  const submitHandler = async () => {
    // Loader 
    setLoading1(true)
    setTimeout(() => {
        setLoading1(false)

    }, 3000)
    axios.post(`${url}monthlyReport`, {
        userId: userID,
        LifeTimeMembersTarget: LifeTimeMembersTarget,
        LifeTimeMembersAchieved: LifeTimeMembersAchieved,
        RegularMembersTarget: RegularMembersTarget,
        RegularMembersAchieved: RegularMembersAchieved,
        RestorationOfDefaultersTarget: RestorationOfDefaultersTarget,
        RestorationOfDefaultersAchieved: RestorationOfDefaultersAchieved,
        MembershipAmountTarget: MembershipAmountTarget,
        MembershipAmountAchieved: MembershipAmountAchieved,
        NewUcsTarget: NewUcsTarget,
        NewUcsAchieved: NewUcsAchieved,
        MonthlyQuranCircleTarget: MonthlyQuranCircleTarget,
        MonthlyQuranCircleAchieved: MonthlyQuranCircleAchieved,
        MonthlyDaroodCircleTarget: MonthlyDaroodCircleTarget,
        MonthlyDaroodCircleAchieved: MonthlyDaroodCircleAchieved,
        MonthlyMeeting: MonthlyMeeting,
        TrainingSession: TrainingSession,
        created_date: created_date
    }, { headers }).then(response => {
        console.log(response)
        setOpenAdd(false);
        setData([...data, response.data]);
        // Empty state 
        setLifeTimeMembersTarget([]);
        setLifeTimeMembersAchieved([]);
        setRegularMembersTarget([]);
        setRegularMembersAchieved([]);
        setRestorationOfDefaultersTarget([]);
        setRestorationOfDefaultersAchieved([])
        setMembershipAmountTarget([])
        setMembershipAmountAchieved([]);
        setNewUcsTarget([]);
        setNewUcsAchieved([]);
        setMonthlyQuranCircleTarget([])
        setMonthlyQuranCircleAchieved([])
        setMonthlyDaroodCircleTarget([])
        setMonthlyDaroodCircleAchieved([])
        setMonthlyMeeting([])
        setTrainingSession([])
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

}
  // Edit Data 
  const [userIDEdit, setuserIDEdit] = useState([]);
  const [LifeTimeMembersTargetEdit, setLifeTimeMembersTargetEdit] = useState([]);
  const [LifeTimeMembersAchievedEdit, setLifeTimeMembersAchievedEdit] = useState([]);
  const [RegularMembersTargetEdit, setRegularMembersTargetEdit] = useState([]);
  const [RegularMembersAchievedEdit, setRegularMembersAchievedEdit] = useState([]);
  const [RestorationOfDefaultersTargetEdit, setRestorationOfDefaultersTargetEdit] = useState([]);
  const [RestorationOfDefaultersAchievedEdit, setRestorationOfDefaultersAchievedEdit] = useState([]);
  const [MembershipAmountTargetEdit, setMembershipAmountTargetEdit] = useState([]);
  const [MembershipAmountAchievedEdit, setMembershipAmountAchievedEdit] = useState([]);
  const [NewUcsTargetEdit, setNewUcsTargetEdit] = useState([]);
  const [NewUcsAchievedEdit, setNewUcsAchievedEdit] = useState([]);
  const [MonthlyQuranCircleTargetEdit, setMonthlyQuranCircleTargetEdit] = useState([]);
  const [MonthlyQuranCircleAchievedEdit, setMonthlyQuranCircleAchievedEdit] = useState([]);
  const [MonthlyDaroodCircleTargetEdit, setMonthlyDaroodCircleTargetEdit] = useState([]);
  const [MonthlyDaroodCircleAchievedEdit, setMonthlyDaroodCircleAchievedEdit] = useState([]);
  const [MonthlyMeetingEdit, setMonthlyMeetingEdit] = useState([]);
  const [TrainingSessionEdit, setTrainingSessionEdit] = useState([]);
  const [IdData, setIdData] = useState([]);

  const onToggleEditMode = async (id) => {
    console.log(id);
    await axios.get(`${url}monthlyReportGet`, {
      params: {
        _id: id
      }
    }, { headers }).then(response => {
      console.log('response')
      console.log(response.data);
      setIdData(response.data._id);
      setuserIDEdit(response.data.userId);
      setLifeTimeMembersTargetEdit(response.data.LifeTimeMembersTarget);
      setLifeTimeMembersAchievedEdit(response.data.LifeTimeMembersAchieved);
      setRegularMembersTargetEdit(response.data.RegularMembersTarget);
      setRegularMembersAchievedEdit(response.data.RegularMembersAchieved);
      setRestorationOfDefaultersTargetEdit(response.data.RestorationOfDefaultersTarget);
      setRestorationOfDefaultersAchievedEdit(response.data.RestorationOfDefaultersAchieved);
      setMembershipAmountTargetEdit(response.data.MembershipAmountTarget);
      setMembershipAmountAchievedEdit(response.data.MembershipAmountAchieved)
      setNewUcsTargetEdit(response.data.NewUcsTarget)
      setNewUcsAchievedEdit(response.data.NewUcsAchieved)
      setMonthlyQuranCircleTargetEdit(response.data.MonthlyQuranCircleTarget)
      setMonthlyQuranCircleAchievedEdit(response.data.MonthlyQuranCircleAchieved)
      setMonthlyDaroodCircleTargetEdit(response.data.MonthlyDaroodCircleTarget)
      setMonthlyDaroodCircleAchievedEdit(response.data.MonthlyDaroodCircleAchieved)
      setMonthlyMeetingEdit(response.data.MonthlyMeeting)
      setTrainingSessionEdit(response.data.TrainingSession)
      setOpenUpdate(true);

    })
      .catch(err => {
        console.log(err)
      })
  }
  //Get API Axios
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);

  const getAllData = () => {
    axios.get(`${url}monthlyReportGetAll`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setData(response.data);
        // setimagesdata(response.data.images);

        setLoading(false)
      })
      .catch(error => console.error(`Error:${error}`));

  }
  const getAllDataUsers = () => {
    axios.get(`${url}get-all-users`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setDataUser(response.data);
        // setimagesdata(response.data.images);

        setLoading(true)
      })
      .catch(error => console.error(`Error:${error}`));

  }
  useEffect(() => {
    getAllData();
    getAllDataUsers();

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

          <Typography color="text.primary">Monthly Reports</Typography>
        </Breadcrumbs>

      </Box>
      <Box m="20px">
        <Grid container spacing={2} >
          <Grid item xs={12} md={10} mt>
            <Header title="Monthly Reports" subtitle="Managing the Monthly Reports" />

          </Grid>
          <Grid item xs={12} md={2} mt>
            <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => setOpenAdd(true)}>
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
                backgroundColor: "#7e7e7e",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#7e7e7e",
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
            <TableContainer >
              <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                <TableHead>

                  <TableRow>
                    <TableCell style={TextColor1} colSpan={1}>Name</TableCell>
                    <TableCell style={TextColor1} colSpan={1}>Area</TableCell>
                    <TableCell style={TextColor1} colSpan={2}>LifeTime Members</TableCell>
                    <TableCell style={TextColor1} colSpan={2}>Regular Members</TableCell>
                    <TableCell style={TextColor1} colSpan={2}>Restoration Of Defaulters</TableCell>
                    <TableCell style={TextColor1} colSpan={2}>Membership Amount</TableCell>
                    <TableCell style={TextColor1} colSpan={2}>New Ucs</TableCell>
                    <TableCell style={TextColor1} colSpan={2}>Monthly Quran Circle</TableCell>
                    <TableCell style={TextColor1} colSpan={2}>Monthly Darood Circle</TableCell>
                    <TableCell style={TextColor1} colSpan={1}>Monthly Meeting</TableCell>
                    <TableCell style={TextColor1} colSpan={1}>Training Session</TableCell>
                    <TableCell style={TextColor1} colSpan={2}>Action</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                    <TableCell style={TextColor1}>Target</TableCell>
                    <TableCell style={TextColor1}>Achieved</TableCell>
                    <TableCell style={TextColor1}>Target</TableCell>
                    <TableCell style={TextColor1}>Achieved</TableCell>
                    <TableCell style={TextColor1}>Target</TableCell>
                    <TableCell style={TextColor1}>Achieved</TableCell>
                    <TableCell style={TextColor1}>Target</TableCell>
                    <TableCell style={TextColor1}>Achieved</TableCell>
                    <TableCell style={TextColor1}>Target</TableCell>
                    <TableCell style={TextColor1}>Achieved</TableCell>
                    <TableCell style={TextColor1}>Target</TableCell>
                    <TableCell style={TextColor1}>Achieved</TableCell>
                    <TableCell style={TextColor1}>Target</TableCell>
                    <TableCell style={TextColor1}>Achieved</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>




                  </TableRow>

                </TableHead>
                <TableBody>

                  {data.map((row) => (

                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell >{row.userName}</TableCell>
                      <TableCell >
                        {row.userType == 'Unit' ? <>{row.UnitArea}</> : null}
                        {row.userType == 'District' ? <>{row.DistrictArea}</> : null}
                        {row.userType == 'Province' ? <>{row.PPArea}</> : null}
                        {row.userType == 'UC' ? <>{row.UCArea}</> : null}
                      </TableCell>
                      <TableCell>{row.LifeTimeMembersTarget}</TableCell>
                      <TableCell>{row.LifeTimeMembersAchieved}</TableCell>
                      <TableCell>{row.RegularMembersTarget}</TableCell>
                      <TableCell>{row.RegularMembersAchieved}</TableCell>
                      <TableCell>{row.RestorationOfDefaultersTarget}</TableCell>
                      <TableCell>{row.RestorationOfDefaultersAchieved}</TableCell>
                      <TableCell>{row.MembershipAmountTarget}</TableCell>
                      <TableCell>{row.MembershipAmountAchieved}</TableCell>
                      <TableCell>{row.NewUcsTarget}</TableCell>
                      <TableCell>{row.NewUcsAchieved}</TableCell>
                      <TableCell>{row.MonthlyQuranCircleTarget}</TableCell>
                      <TableCell>{row.MonthlyQuranCircleAchieved}</TableCell>
                      <TableCell>{row.MonthlyDaroodCircleTarget}</TableCell>
                      <TableCell>{row.MonthlyDaroodCircleAchieved}</TableCell>
                      <TableCell>{row.MonthlyMeeting}</TableCell>
                      <TableCell>{row.TrainingSession}</TableCell>
                      <TableCell>

                        {/* <button className={classes.btn}
                                                        onClick={() => onToggleEditMode(row._id)}
                                                    >
                                                        < EditIcon />
                                                    </button> */}
                          < EditIcon style={{ color: '#7e7e7e' }} onClick={() => onToggleEditMode(row._id)}/>
                      </TableCell>
                      <TableCell>
                        {/* <button className={classes.btn1}
                                                        onClick={() => {
                                                            console.log(row._id)
                                                            deleteData(row._id)
                                                        }}
                                                    > <DeleteIcon /></button> */}
                          < DeleteIcon  style={{ color: 'red' }} onClick={() => deleteData(row._id)}/>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
              <Box sx={style1}>

                <Grid container spacing={2} >
                <Grid item xs={10} md={10}>
                    <Typography style={{ color: '#52ad4a', fontWeight: 700 }} id="transition-modal-title" variant="h5" component="h2">
                      Add Monthly Report
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    {/* <MDButton  variant="gradient" color="error"  > */}
                    <CloseIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />

                    {/* </MDButton> */}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth style={{ marginTop: '30px' }}>
                      <InputLabel id="demo-simple-select-label">Select User</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userID}
                        label="Select User"
                        onChange={(e) => setuserID(e.target.value)}
                      >
                        {loading && dataUser.map((row) => (
                          <MenuItem value={row._id}>{row.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6">Lifetime Members</Typography>
                    <TextField id="outlined-basic" type="number"
                      value={LifeTimeMembersTarget} style={{ marginTop: '10px' }}
                      onChange={(e) => setLifeTimeMembersTarget(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" type="number"
                      value={LifeTimeMembersAchieved} style={{ marginTop: '10px' }}
                      onChange={(e) => setLifeTimeMembersAchieved(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* Row 
                                                     */}
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6">Regular Members</Typography>
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={RegularMembersTarget} type="number"
                      onChange={(e) => setRegularMembersTarget(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={RegularMembersAchieved} type="number"
                      onChange={(e) => setRegularMembersAchieved(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6">Restoration Of Defaulterss</Typography>
                    <TextField id="outlined-basic"
                      value={RestorationOfDefaultersTarget} type="number" style={{ marginTop: '10px' }}
                      onChange={(e) => setRestorationOfDefaultersTarget(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic"
                      value={RestorationOfDefaultersAchieved} type="number" style={{ marginTop: '10px' }}
                      onChange={(e) => setRestorationOfDefaultersAchieved(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* Row  */}
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6">Membership Amount</Typography>
                    <TextField id="outlined-basic"
                      value={MembershipAmountTarget} type="number" style={{ marginTop: '10px' }}
                      onChange={(e) => setMembershipAmountTarget(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic"
                      value={MembershipAmountAchieved} type="number" style={{ marginTop: '10px' }}
                      onChange={(e) => setMembershipAmountAchieved(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* Row  */}
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6">NewUcs</Typography>

                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={NewUcsTarget} type="number"
                      onChange={(e) => setNewUcsTarget(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={NewUcsAchieved} type="number"
                      onChange={(e) => setNewUcsAchieved(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* row  */}
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6">Monthly Quran Circle</Typography>
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={MonthlyQuranCircleTarget} type="number"
                      onChange={(e) => setMonthlyQuranCircleTarget(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={MonthlyQuranCircleAchieved} type="number"
                      onChange={(e) => setMonthlyQuranCircleAchieved(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* row  */}
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6">Monthly Darood Circle</Typography>
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={MonthlyDaroodCircleTarget} type="number"
                      onChange={(e) => setMonthlyDaroodCircleTarget(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={MonthlyDaroodCircleAchieved} type="number"
                      onChange={(e) => setMonthlyDaroodCircleAchieved(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* row  */}
                  <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={MonthlyMeeting}
                      onChange={(e) => setMonthlyMeeting(e.target.value)}
                      label="Monthly Meetings" variant="outlined" required />
                    <TextField id="outlined-basic"
                      value={TrainingSession} style={{ marginTop: '10px' }}
                      onChange={(e) => setTrainingSession(e.target.value)}
                      label="Training Sessions" variant="outlined" required />
                  </Grid>

                  {/* <Grid item xs={12} md={6}>
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                           
                                                            <DatePicker
                                                                label="Created At"
                                                                value={created_date}
                                                                onChange={(newValue) => {
                                                                    setcreated_date(newValue)
                                                                }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                            />
                                                        </LocalizationProvider>
                                                       
                                                    </Grid> */}

                  <Grid item xs={12} md={12} align="center">
                  <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => submitHandler()}>
                      Submit
                    </Button>
                    {/* <button className={classes.btnSubmit} type='submit'>
                                                            {loading1 ? <ClipLoader color={color} loading={loading1} css={override} size={10} /> : <h3>Submit</h3>}
                                                        </button> */}

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
              <Box sx={style1}>

                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={10} md={10}>
                    <Typography style={{ color: '#52ad4a', fontWeight: 700 }} id="transition-modal-title" variant="h5" component="h2">
                      Update Monthly Report
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    {/* <MDButton  variant="gradient" color="error"  > */}
                    <CloseIcon onClick={handleCloseUpdate} style={{ cursor: 'pointer' }} />

                    {/* </MDButton> */}
                  </Grid>

                  <Grid item xs={12} md={6}>

                    <Typography variant="h6" style={{ color: '#7e7e7e', fontWeight: 700 }}>Lifetime Members</Typography>
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={LifeTimeMembersTargetEdit} type="number"
                      onChange={(e) => setLifeTimeMembersTargetEdit(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" type="number" style={{ marginTop: '10px' }}
                      value={LifeTimeMembersAchievedEdit}
                      onChange={(e) => setLifeTimeMembersAchievedEdit(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  <Grid item xs={12} md={6}>

                    <Typography variant="h6" style={{ color: '#7e7e7e', fontWeight: 700 }}>Regular Members</Typography>
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={RegularMembersTargetEdit} type="number"
                      onChange={(e) => setRegularMembersTargetEdit(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={RegularMembersAchievedEdit} type="number"
                      onChange={(e) => setRegularMembersAchievedEdit(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* row  */}
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6" style={{ color: '#7e7e7e', fontWeight: 700 }}>Restoration Of Defaulterss</Typography>
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={RestorationOfDefaultersTargetEdit} type="number"
                      onChange={(e) => setRestorationOfDefaultersTargetEdit(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={RestorationOfDefaultersAchievedEdit} type="number"
                      onChange={(e) => setRestorationOfDefaultersAchievedEdit(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* Row  */}
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6" style={{ color: '#7e7e7e', fontWeight: 700 }}>Membership Amount</Typography>
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={MembershipAmountTargetEdit} type="number"
                      onChange={(e) => setMembershipAmountTargetEdit(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={MembershipAmountAchievedEdit} type="number"
                      onChange={(e) => setMembershipAmountAchievedEdit(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  <Grid item xs={12} md={6}>

                    <Typography variant="h6" style={{ color: '#7e7e7e', fontWeight: 700 }}>NewUcs</Typography>
                    <TextField id="outlined-basic"
                      value={NewUcsTargetEdit} type="number" style={{ marginTop: '10px' }}
                      onChange={(e) => setNewUcsTargetEdit(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={NewUcsAchievedEdit} type="number"
                      onChange={(e) => setNewUcsAchievedEdit(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* row  */}
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6" style={{ color: '#7e7e7e', fontWeight: 700 }}>Monthly Quran Circle</Typography>
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={MonthlyQuranCircleTargetEdit} type="number"
                      onChange={(e) => setMonthlyQuranCircleTargetEdit(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic" style={{ marginTop: '10px' }}
                      value={MonthlyQuranCircleAchievedEdit} type="number"
                      onChange={(e) => setMonthlyQuranCircleAchievedEdit(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* row  */}
                  <Grid item xs={12} md={6}>

                    <Typography variant="h6" style={{ color: '#7e7e7e', fontWeight: 700 }}>Monthly Darood Circle</Typography>
                    <TextField id="outlined-basic"
                      value={MonthlyDaroodCircleTargetEdit} type="number" style={{ marginTop: '10px' }}
                      onChange={(e) => setMonthlyDaroodCircleTargetEdit(e.target.value)}
                      label="Target" variant="outlined" required />
                    <TextField id="outlined-basic"
                      value={MonthlyDaroodCircleAchievedEdit} type="number" style={{ marginTop: '10px' }}
                      onChange={(e) => setMonthlyDaroodCircleAchievedEdit(e.target.value)}
                      label="Achieved" variant="outlined" required />
                  </Grid>

                  {/* row  */}
                  <Grid item xs={12} md={6}>
                    <TextField id="outlined-basic"
                      value={MonthlyMeetingEdit} style={{ marginTop: '32px' }}
                      onChange={(e) => setMonthlyMeetingEdit(e.target.value)}
                      label="Monthly Meetings" variant="outlined" required />
                    <TextField id="outlined-basic"
                      value={TrainingSessionEdit} style={{ marginTop: '32px' }}
                      onChange={(e) => setTrainingSessionEdit(e.target.value)}
                      label="Training Sessions" variant="outlined" required />
                  </Grid>




                  <Grid item xs={12} md={12} align="center">
                    <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => handleCloseUpdate()}>
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

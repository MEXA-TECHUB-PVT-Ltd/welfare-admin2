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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';

import url from "../url"
import React, { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

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
  // height: '100%',
  overflowY: 'scroll',
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
  const headers = {
    'Content-Type': 'application/json'
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleCloseAdd = () => setOpenAdd(false);
  // Update 
  const [openUpdate, setOpenUpdate] = React.useState(false);
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
  const [departmentsData, setDepartmentsData] = useState([]);


  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);

  const getAllData = () => {
    axios.get(`${url}monthlyReportGetAll`)
      .then((response) => {
        const allData = response.data;
        console.log('allData');
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

        setLoading(false)
      })
      .catch(error => console.error(`Error:${error}`));

  }
  const getAllDataDepartments = () => {
    axios.get(`${url}get-all`)
      .then((response) => {
        const allData = response.data;
        console.log('departsgd');
        console.log(allData);

        setDepartmentsData(response.data);
        // setimagesdata(response.data.images);

        setLoading(false)
      })
      .catch(error => console.error(`Error:${error}`));

  }
  useEffect(() => {
    getAllData();
    getAllDataUsers();
    getAllDataDepartments();

    // getAllDataUnapprove();
    // getAllDataApprove();

  }, []);
  const [filterForum, setFilterForum] = React.useState('');
  const [filterdepartment, setFilterDepartment] = React.useState('');
  const [filterUserType, setFilterUserType] = React.useState('');
  const [startDateFilter, setstartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');



  const handleChangeFilterDate = () => {
    setLoading(true)
    console.log(startDateFilter)
    console.log(endDateFilter)
    axios.post(`${url}get-report-between-two-dates`, {
      sdate: startDateFilter,
      edate: endDateFilter

    }, { headers }).then(response => {
      console.log(response)
      setData(response.data);
      setLoading(false)
      setstartDateFilter('')
      setEndDateFilter('')
    })
      .catch(err => {
        console.log(err)
      })


  }
  const handleChange = () => {
    console.log('filtere');
    console.log(filterForum.length)
    console.log(filterdepartment.length)
    console.log(filterUserType)
    setLoading(true)


    if (filterForum.length === 0 && filterdepartment.length === 0 && filterUserType.length === 0) {
      getAllData();
      console.log('get oref ')
    } else if (filterForum.length !== 0 && filterdepartment.length === 0 && filterUserType.length === 0) {
      console.log('not empty forum')
      axios.get(`${url}get-report-by-forum`, {
        params: {
          forum: filterForum
        }
      }).then(response => {
        const allData = response.data;
        console.log('allData');
        console.log(allData);

        setData(response.data);
        // setimagesdata(response.data.images);

        setLoading(false)
        setFilterDepartment('')
        setFilterForum('')
        setFilterUserType('')


      })
        .catch(error => console.error(`Error:${error}`));

    } else if (filterForum.length === 0 && filterdepartment.length !== 0 && filterUserType.length === 0) {
      console.log('not empty dept')
      axios.get(`${url}get-report-by-department`, {
        params: {
          department: filterdepartment
        }
      }).then(response => {
        const allData = response.data;
        console.log('allData');
        console.log(allData);

        setData(response.data);
        // setimagesdata(response.data.images);

        setLoading(false)
        setFilterDepartment('')
        setFilterForum('')
        setFilterUserType('')
      })
        .catch(error => console.error(`Error:${error}`));

    } else if (filterForum.length === 0 && filterdepartment.length === 0 && filterUserType.length !== 0) {
      console.log('not empty usertype')
      axios.get(`${url}get-report-by-userType`, {
        params: {
          userType: filterUserType
        }
      }).then(response => {
        const allData = response.data;
        console.log('allData');
        console.log(allData);

        setData(response.data);
        // setimagesdata(response.data.images);

        setLoading(false)
        setFilterDepartment('')
        setFilterForum('')
        setFilterUserType('')
      })
        .catch(error => console.error(`Error:${error}`));

    } else if (filterForum.length !== 0 && filterdepartment.length !== 0 && filterUserType.length === 0) {
      console.log('not empty forum and department')
      axios.get(`${url}get-report-by-forum-dept`, {
        params: {
          forum: filterForum,
          department: filterdepartment
        }
      }).then(response => {
        const allData = response.data;
        console.log('allData');
        console.log(allData);

        setData(response.data);
        // setimagesdata(response.data.images);

        setLoading(false)
        setFilterDepartment('')
        setFilterForum('')
        setFilterUserType('')
      })
        .catch(error => console.error(`Error:${error}`));
    } else if (filterForum.length !== 0 && filterdepartment.length === 0 && filterUserType.length !== 0) {
      console.log('not empty forum and type')
      axios.get(`${url}get-report-by-forum-usertype`, {
        params: {
          forum: filterForum,
          userType: filterUserType
        }
      }).then(response => {
        const allData = response.data;
        console.log('allData');
        console.log(allData);

        setData(response.data);
        // setimagesdata(response.data.images);

        setLoading(false)
        setFilterDepartment('')
        setFilterForum('')
        setFilterUserType('')
      })
        .catch(error => console.error(`Error:${error}`));
    } else if (filterForum.length === 0 && filterdepartment.length !== 0 && filterUserType.length !== 0) {
      console.log('not empty dept and type')
      axios.get(`${url}get-report-by-dept-usertype`, {
        params: {
          department: filterdepartment,
          userType: filterUserType
        }
      }).then(response => {
        const allData = response.data;
        console.log('allData');
        console.log(allData);

        setData(response.data);
        // setimagesdata(response.data.images);

        setLoading(false)
        setFilterDepartment('')
        setFilterForum('')
        setFilterUserType('')
      })
        .catch(error => console.error(`Error:${error}`));
    } else if (filterForum.length !== 0 && filterdepartment.length !== 0 && filterUserType.length !== 0) {
      console.log('not empty forum and department and user type')
      axios.get(`${url}get-report-by-forum-dept-usertype`, {
        params: {
          department: filterdepartment,
          userType: filterUserType,
          forum: filterForum
        }
      }).then(response => {
        const allData = response.data;
        console.log('allData');
        console.log(allData);

        setData(response.data);
        // setimagesdata(response.data.images);

        setLoading(false)
        setFilterDepartment('')
        setFilterForum('')
        setFilterUserType('')
      })
        .catch(error => console.error(`Error:${error}`));

    } else {
      console.log('dgdgd')
    }
  };
  const columns = [
    // { field: "_id", headerName: "ID" },
    {
      field: "userName",
      headerName: "Submitted By",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "userType",
      headerName: "User Type",
      // type: "number",
      headerAlign: "left",
      flex: 1,

      align: "left",
    },
    {
      field: "forum",
      headerName: "Forum",
      flex: 1,
    },

    {
      field: "department",
      headerName: "Department",
      flex: 1,
      renderCell: (row) => {
        return (


          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            {row.row.DistrictArea.name}
          </Typography>
        );
      },
    },
    {
      field: "AreaNumber",
      headerName: "AreaNumber",
      flex: 1,
    },
    {
      field: "created_date",
      headerName: "created_date",
      flex: 1,
    },

    // {
    //   field: "gender",
    //   headerName: "Gender",
    //   flex: 1,
    // },
    // {
    //   field: "profession",
    //   headerName: "Profession",
    //   flex: 1,
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
            {/* <IconButton onClick={() => handleOpenUpdate()}>
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            </IconButton> */}
            <IconButton onClick={() => onToggleEditMode(row.row._id)}>
              <Tooltip title="Edit">
                < EditIcon style={{ color: '#7e7e7e' }} />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => deleteData(row.row._id)}>
              <Tooltip title="Delete">

                < DeleteIcon style={{ color: 'red' }} />
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
        

      </GridToolbarContainer>
    )
  }
  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/home">
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
        </Button></Grid>

          <Grid item xs={12} md={3} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Forum</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterForum}
                  label="Forum"
                  onChange={(e) => setFilterForum(e.target.value)}
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
          <Grid item xs={12} md={3} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterdepartment}
                  label="Department"
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >

                  {departmentsData.map((row) => (
                    <MenuItem value={row._id}>{row.departmentName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

          </Grid>
          <Grid item xs={12} md={3} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterUserType}
                  label="User Type"
                  onChange={(e) => setFilterUserType(e.target.value)}
                >
                  <MenuItem value='District'>District</MenuItem>
                  <MenuItem value='Province'>Province</MenuItem>
                  <MenuItem value='UC'>UC</MenuItem>
                  <MenuItem value='Unit'>Unit</MenuItem>

                </Select>
              </FormControl>
            </Box>

          </Grid>
          <Grid item xs={12} md={3} mt align='center'>
            <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => handleChange()}>
              Filter
            </Button>
            {/* <Typography variant="h6" style={{ backgroundColor: '#52ad4a',padding:'10px' ,borderRadius:'5px',color:'white'}}>
            Select to Filter
            </Typography> */}


          </Grid>

          <Grid item xs={12} md={2} >
            <Typography color="text.primary" style={{ marginTop: '12px' }}> Select Start Date :</Typography>



          </Grid>
          <Grid item xs={12} md={2} >
            <input type="date"
              id="birthday"
              value={startDateFilter}
              onChange={(e) => setstartDateFilter(e.target.value)} name="birthday" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #c2c2c2' }} />


          </Grid>
          <Grid item xs={12} md={1} >
          </Grid>
          <Grid item xs={12} md={2} >
            <Typography color="text.primary" style={{ marginTop: '12px' }}>  Select End Date  :</Typography>

          </Grid>
          <Grid item xs={12} md={2} >
            <input
              value={endDateFilter}
              onChange={(e) => setEndDateFilter(e.target.value)}
              type="date" id="birthday" name="birthday" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #c2c2c2' }} />

          </Grid>
          <Grid item xs={12} md={3} mt align='center'>
            <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => handleChangeFilterDate()}>
              Filter by Date
            </Button>
            {/* <Typography variant="h6" style={{ backgroundColor: '#52ad4a',padding:'10px' ,borderRadius:'5px',color:'white'}}>
            Select to Filter
            </Typography> */}


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
              <Box sx={style1}>

                <Grid container spacing={2} >
                  <Grid item xs={10} md={10}>
                    <Typography style={{ color: '#52ad4a', fontWeight: 700 }} id="transition-modal-title" variant="h5" component="h2">
                      Add Monthly Report
                    </Typography>
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

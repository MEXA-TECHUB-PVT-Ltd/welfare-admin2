import React,{ useState,useEffect } from "react";

import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GroupIcon from '@mui/icons-material/Group';
import url from '../url'
import ContactPageIcon from '@mui/icons-material/ContactPage';
import EventIcon from '@mui/icons-material/Event';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Grid from "@mui/material/Grid";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const colors = tokens(theme.palette.mode);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    console.log(items)
    if (items==null) {
    
    navigate('/')


    }else{
      setItems(items);
      console.log("items")
      console.log(items)
      // navigate('/dashboard')
    }
  }, []);
    //Get API Axios
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const getAllData = () => {
      axios.get(`${url}get-all-users`)
      .then((response) => {
        const allData = response.data.length;
        console.log(allData);
        setData(response.data.length);
        // setimagesdata(response.data.images);
  
        setLoading(false)
      })
      .catch(error => console.error(`Error:${error}`));
  
    }
    const [data1, setData1] = useState('');
    const getAllData1 = () => {
      axios.get(`${url}get-all-requests`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setData1(response.data.length);
      })
      .catch(error => console.error(`Error:${error}`));
  
    }
    const [data2, setData2] = useState('');

    const getAllData2 = () => {
      axios.get(`${url}get-events-by-date`)
      .then((response) => {
        const allData = response.data;
        console.log(allData);
        setData2(response.data.length);
      })
      .catch(error => console.error(`Error:${error}`));
  
    }
    const [data3, setData3] = useState('');

    const getAllData3 = () => {
      axios.get(`${url}get-all-report`).then((response) => {
        const allData = response.data;
        console.log(allData);
        setData3(response.data.length);
      })
        .catch(error => console.error(`Error:${error}`));
  
    }
    const getAllDataReport = () => {
      axios.get(`${url}get-all-report`).then((response) => {
        const allData = response.data;
        console.log(allData);
        setDataReport(response.data);
        setLoading(false)
      })
        .catch(error => console.error(`Error:${error}`));
  
    }
    useEffect(() => {
      getAllData();
      getAllData1();
      getAllData2();
      getAllData3();
      getAllDataReport();


      // getAllDataUnapprove();
      // getAllDataApprove();
  
    }, []);
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
  const [dataReports, setDataReport] = useState([]);
  const columnsReports = [
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
      field: "date",
      headerName: "date",
      flex: 1,
    },
    {
      field: "userType",
      headerName: "userType",
      flex: 1,
    },
 
  ];
 

  return (
   <>
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data}
            subtitle="All Members"
            progress="0.75"
            increase="+14%"
            icon={
              <GroupIcon
                sx={{ color: '#74bc6d', fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data1}
            subtitle="Membership Requests"
            progress="0.50"
            increase="+21%"
            icon={
              <ContactPageIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data2}
            subtitle="Events"
            progress="0.30"
            increase="+5%"
            icon={
              <EventIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data3}
            subtitle="Reports"
            progress="0.80"
            increase="+43%"
            icon={
              <SummarizeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      
        
      </Box>
    </Box>
      <Box m="20px">
      {/* <Grid container spacing={2} >
          <Grid item xs={12} md={10} mt> */}
        <Header title="Reports" subtitle="Managing the Reports" />
        {/* </Grid>
        <Grid item xs={12} md={2} mt>
            <Button variant="contained" style={{ backgroundColor: '#52ad4a' }} onClick={() => handleOpenAdd()}>
              Add
            </Button>

          </Grid>
          </Grid> */}

        {/* <Box sx={{ width: '100%' }}> */}
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

              rows={dataReports}
              columns={columnsReports}
              getRowId={(row) => row._id}
              loading={loading}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </Box>

        {/* </Box> */}

       
      </Box>
      </>
  );
};

export default Dashboard;

import { Box, Typography, useTheme,IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataCustomer } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import DoneIcon from '@mui/icons-material/Done';
import Snackbar from '@mui/material/Snackbar';
import Grow from '@mui/material/Grow';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Tooltip from '@mui/material/Tooltip';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState, useEffect } from "react";
function GrowTransition(props) {
  return <Grow {...props} />;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
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
const Team = () => {
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });
  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [EditFieldData, setEditFieldData] = useState([]);
  const [selectChange, setSelectChange] = React.useState('');

  const handleChangeSelector = (event) => {
    setSelectChange(event.target.value);
  };
  // Add 
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => {
    setOpenAdd(true);
  }
  const handleCloseAdd = () => setOpenAdd(false);
  const submitHandler1 = () => {
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
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  }
  const handleCloseUpdate = () => setOpenUpdate(false);
    // tax Customer 
    const [openTax, setOpenTax] = React.useState(false);
    const handleOpenTax = () => {
      setOpenTax(true);
    }
    const handleCloseTax = () => setOpenTax(false);
  // Delete 
  const [visibleDelete, setVisibleDelete] = useState(false)
  const deleteData = () => {
    // setOpen(false)
    setVisibleDelete(true)
    // setSuccessDelete(true)
    // axios.delete(`${url}api/subscriptionPlan/delete/${SubscriptionPlanId}`
    //     , { headers })
    //     .then(res => {

    //         console.log(res.data);
    //         if (res.data.message === "Deleted Successfully") {
    //             setVisibleDelete(false)
    //             setSuccessDelete(true)
    //             getAllData();
    //             setLoadingLoader(false)
    //         } else {

    //         }

    //     }).catch(err => {
    //         console.log(err)
    //     })

  }
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,

      // type: "number",
      // headerAlign: "left",
      // align: "left",
      cellClassName: "name-column--cell",

    },
    {
      field: "contactPerson",
      headerName: "Contact Person",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone No",
      flex: 1,
    },
  
    // {
    //   field: "filerStatus",
    //   headerName: "filer Status",
    //   flex: 2,
    //   renderCell: ({ row: { filerStatus } }) => {
    //     return (
    //       <Box
    //         width="100%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           filerStatus === "filer"
    //             ? colors.greenAccent[600]
    //             : filerStatus === "non filer"
    //               ? colors.greenAccent[700]
    //               : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {filerStatus === "filer" && <AdminPanelSettingsOutlinedIcon />}
    //         {filerStatus === "non filer" && <SecurityOutlinedIcon />}


    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {filerStatus}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
    // {
    //   field: "access",
    //   headerName: "Type",
    //   flex: 2,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="100%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "Distributer"
    //             ? colors.greenAccent[600]
    //             : access === "Retailer"
    //               ? colors.greenAccent[700]
    //               : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "Distributer" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "Retailer" && <SecurityOutlinedIcon />}
    //         {access === "Institution" && <SecurityOutlinedIcon />}



    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      flex:3,
      renderCell: ({ row: { action } }) => {
        return (
          <>
            <IconButton onClick={() => handleOpenTax()}>
            {/* <Tooltip title="Tax">
          <CreditCardIcon style={{color:'orange'}}/>
          </Tooltip> */}
        </IconButton>
           <IconButton onClick={() => handleOpenUpdate()}>
           <Tooltip title="Edit">
          <EditIcon />
          </Tooltip>
        </IconButton>
        <IconButton onClick={() => deleteData()}>
        <Tooltip title="Delete">

          <DeleteIcon style={{color:'red'}}/>
          </Tooltip>
        </IconButton>
            

          </>
          // <Box
          //   width="100%"
          //   m="0 auto"
          //   p="5px"
          //   display="flex"
          //   justifyContent="center"
          //   backgroundColor={
          //     filerStatus === "filer"
          //       ? colors.greenAccent[600]
          //       : filerStatus === "non filer"
          //         ? colors.greenAccent[700]
          //         : colors.greenAccent[700]
          //   }
          //   borderRadius="4px"
          // >
          //   {filerStatus === "filer" && <AdminPanelSettingsOutlinedIcon />}
          //   {filerStatus === "non filer" && <SecurityOutlinedIcon />}


          //   <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          //     {filerStatus}
          //   </Typography>
          // </Box>
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

  return (
    <>
     <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon />
          </Link>

          <Typography color="text.primary">Customers</Typography>
        </Breadcrumbs>
      
      </Box>
    <Box m="20px">
      <Header title="Admin Users" subtitle="Managing the Admins" />
      <Box
        m="40px 0 0 0"
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
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataCustomer}
          columns={columns}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = mockDataCustomer.filter((row) =>
              selectedIDs.has(row.id)
            );
            setEditFieldData(selectedRowData);
          }}
          components={{ Toolbar: CustomToolbar }}
        />
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

                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={10} md={10}>
                    <Typography id="transition-modal-title" variant="h5" component="h2">
                      Add Customer
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    {/* <MDButton  variant="gradient" color="error"  > */}
                    <CloseIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />

                    {/* </MDButton> */}
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionNameAdd}
                      // onChange={(e) => setSubscriptionNameAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Address :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextareaAutosize
                      maxRows={6}
                      aria-label="maximum height"
                      style={{ width: 150, height: '80px' }}
                    />
                    {/* <TextField

                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" /> */}

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Phone No :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionShopsAdd}
                      type="number"
                      // onChange={(e) => setSubscriptionShopsAdd(e.target.value)} 
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Contact Person :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField

                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      cnic Of Propreitor :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Account Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      license Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Sales Tax Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      NTN Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Filer Status :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: '100%' }}
                      value={selectChange}

                      label="Company"
                      onChange={handleChangeSelector}
                    >
                      <MenuItem value={10}>Filer</MenuItem>
                      <MenuItem value={20}>Non Filer</MenuItem>
                    </Select>

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Type Of Customer :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: '100%' }}
                      value={selectChange}

                      label="Company"
                      onChange={handleChangeSelector}
                    >
                      <MenuItem value={10}>Distributor</MenuItem>
                      <MenuItem value={20}>Retailer</MenuItem>
                      <MenuItem value={30}>Institution</MenuItem>
                    </Select>


                  </Grid>
                  <Grid item xs={12} md={4}>

                  </Grid>
                  {/* <Grid item xs={12} md={4}>

</Grid> */}
                  <Grid item xs={12} md={12} align="center">
                    <Button variant="contained" onClick={() => handleCloseAdd()}>
                      Save
                    </Button>
                    {/* <MDButton style={{ width: '100%' }} variant="gradient" color="error" fullWidth onClick={() => { submitHandler1() }}>
                                                            Submit
                                                        </MDButton> */}
                  </Grid>

                </Grid>
              </Box>
            </Fade>
          </Modal>
        </div>
        {/* Tax Customer  */}
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openTax}
            onClose={handleCloseTax}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openTax}>
              <Box sx={style1}>

                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={10} md={10}>
                    <Typography id="transition-modal-title" variant="h5" component="h2">
                      Customer Tax
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    {/* <MDButton  variant="gradient" color="error"  > */}
                    <CloseIcon onClick={handleCloseUpdate} style={{ cursor: 'pointer' }} />

                    {/* </MDButton> */}
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                    Sales Tax :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                    type="number"
                      // value={SubscriptionNameAdd}
                      // onChange={(e) => setSubscriptionNameAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
               
                  <Grid item xs={6} md={6}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                    General Sales Tax :
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
                    Advance Tax :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      type="number"

                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                    Further Tax :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={12} md={12} align="center">
                    <Button variant="contained" onClick={() => handleCloseTax()}>
                      Save
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
                      Update Company
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
                      // value={SubscriptionNameAdd}
                      // onChange={(e) => setSubscriptionNameAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Address :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextareaAutosize
                      maxRows={6}
                      aria-label="maximum height"
                      style={{ width: 150, height: '80px' }}
                    />
                    {/* <TextField

                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" /> */}

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Phone No :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionShopsAdd}
                      type="number"
                      // onChange={(e) => setSubscriptionShopsAdd(e.target.value)} 
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Contact Person :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField

                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      cnic Of Propreitor :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Account Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      license Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Sales Tax Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      NTN Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Filer Status :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: '100%' }}
                      value={selectChange}

                      label="Company"
                      onChange={handleChangeSelector}
                    >
                      <MenuItem value={10}>Filer</MenuItem>
                      <MenuItem value={20}>Non Filer</MenuItem>
                    </Select>

                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      Type Of Customer :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      style={{ width: '100%' }}
                      value={selectChange}

                      label="Company"
                      onChange={handleChangeSelector}
                    >
                      <MenuItem value={10}>Distributor</MenuItem>
                      <MenuItem value={20}>Retailer</MenuItem>
                      <MenuItem value={30}>Institution</MenuItem>
                    </Select>


                  </Grid>
                  {/* <Grid item xs={12} md={4}>

                  </Grid>
                  <Grid item xs={12} md={4}>

                  </Grid> */}
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
                    Are you sure you want to delete<br /> this Customer?
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  {/* <Button autoFocus onClick={deleteDataProduct} style={{ background: 'linear-gradient(195deg, #5fb663, #3ccf42)', color: 'white', borderRadius: '10px' }}>
                                                                Yes
                                                            </Button> */}
                  {/* <MDButton variant="gradient" color="error" size="small" onClick={deleteDataProduct} style={{ background: '#CE69EB', color: 'white', borderRadius: '10px' }}>
                    Yes
                  </MDButton> */}
                  <Button startIcon={<DoneIcon />} variant="outlined"
                    onClick={() =>
                      // setVisibleDelete(false)
                      handleClick(GrowTransition)

                    }>
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
        {/* snackbar bar */}
        <div>
          <Snackbar
            open={state.open}
            onClose={handleClose}
            TransitionComponent={state.Transition}
            message="I love snacks"
            key={state.Transition.name}
          />
        </div>
      </Box>
    </Box>
    </>
  );
};

export default Team;

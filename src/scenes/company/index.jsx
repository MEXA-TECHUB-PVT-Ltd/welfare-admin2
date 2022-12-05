import { Box, Typography, useTheme,IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataCompany } from "../../data/mockData";
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
import React, { useState, useEffect } from "react";
function GrowTransition(props) {
  return <Grow {...props} />;
}
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
      field: "companyName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "companyAddress",
      headerName: "Address",
      flex: 2,

      // type: "number",
      // headerAlign: "left",
      // align: "left",
      cellClassName: "name-column--cell",

    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone No",
      flex: 1,
    },
    {
      field: "fax",
      headerName: "Fax",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex:2,
      renderCell: ({ row: { action } }) => {
        return (
          <>
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

          <Typography color="text.primary">Company</Typography>
        </Breadcrumbs>
      
      </Box>
    <Box m="20px">
      <Header title="Company" subtitle="Managing the Company" />
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
        <DataGrid checkboxSelection rows={mockDataCompany}
          columns={columns}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRowData = mockDataCompany.filter((row) =>
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
                      Add Company
                    </Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    {/* <MDButton  variant="gradient" color="error"  > */}
                    <CloseIcon onClick={handleCloseAdd} style={{ cursor: 'pointer' }} />

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
                      Address :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextareaAutosize
                      maxRows={6}
                      aria-label="maximum height"
                      style={{ width: 150 ,height:'80px'}}
                    />
                    {/* <TextField

                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" /> */}

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
                      Zip Code :
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
                      Fax :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextField
                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" />

                  </Grid>
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
                      Address :
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <TextareaAutosize
                      maxRows={6}
                      aria-label="maximum height"
                      style={{ width: 150 ,height:'80px'}}
                    />
                    {/* <TextField

                      // value={SubscriptionPriceAdd}
                      // onChange={(e) => setSubscriptionPriceAdd(e.target.value)}
                      style={{ width: '100%' }} variant="outlined" /> */}

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
                      Zip Code :
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
                      Fax :
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
                    Are you sure you want to delete<br /> this Company?
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

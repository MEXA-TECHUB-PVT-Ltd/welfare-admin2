import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataSupplyOrder } from "../../data/mockData";
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
import CategoryIcon from '@mui/icons-material/Category';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom'
import ImageLogo from '../../components/Images/download.png'
import PrintIcon from '@mui/icons-material/Print';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

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
  let navigate = useNavigate();

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
      field: "refNumber",
      headerName: "refNumber",
      flex: 1,

      // type: "number",
      // headerAlign: "left",
      // align: "left",
      cellClassName: "name-column--cell",

    },
    {
      field: "dateOfOrder",
      headerName: "date of order",
      flex: 1,
    },
    {
      field: "orderValidTill",
      headerName: "order Valid till",
      flex: 1,
    },
    {
      field: "specialInstructions",
      headerName: "Special Instructions",
      flex: 1,
    },

    {
      field: "typeOforder",
      headerName: "Type of order",
      flex: 2,
      renderCell: ({ row: { typeOforder } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              typeOforder === "Institutional"
                ? colors.greenAccent[600]
                : typeOforder === "Market"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {typeOforder === "Institutional" && <AdminPanelSettingsOutlinedIcon />}
            {typeOforder === "Market" && <SecurityOutlinedIcon />}


            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {typeOforder}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 2,
      renderCell: ({ row: { Status } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              Status === "Pending"
                ? colors.greenAccent[600]
                : Status === "Partial"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {Status === "Pending" && <AdminPanelSettingsOutlinedIcon />}
            {Status === "Partial" && <SecurityOutlinedIcon />}
            {Status === "Completed" && <SecurityOutlinedIcon />}



            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {Status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 3,
      renderCell: ({ row: { id } }) => {
        return (
          <>

            <IconButton
              onClick={() =>
                navigate('/supplyOrderDetail',
                  {
                    state: {
                      SupplyId: id,
                    }
                  })
              }
            >
              <Tooltip title="View">
                <VisibilityIcon style={{ color: 'orange' }} />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => handleOpenUpdate()}>
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            </IconButton>
            <IconButton onClick={() => deleteData()}>
              <Tooltip title="Delete">

                <DeleteIcon style={{ color: 'red' }} />
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
          Generate Invoice
        </Button>

      </GridToolbarContainer>
    );
  }
  // Master Card
  const numbers = [...`4562112245947852`];

  if (numbers.length < 16 || numbers.length > 16) {
    throw new Error(
      "Invalid value for the prop number, the value for the number prop shouldn't be greater than or less than 16 digits"
    );
  }

  const num1 = numbers.slice(0, 4).join("");
  const num2 = numbers.slice(4, 8).join("");
  const num3 = numbers.slice(8, 12).join("");
  const num4 = numbers.slice(12, 16).join("");
  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad', backgroundColor: 'rgb(240 242 245)' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon />
          </Link>
          

          <Typography color="text.primary">Payments</Typography>
        </Breadcrumbs>

      </Box>
      <Grid container spacing={2} style={{ padding: '20px' }}>
        {/* <Grid item xs={12} md={2}>
        </Grid> */}
        <Grid item xs={12} md={12}>
          <Box display="flex" justifyContent="space-between" p={2} style={{ backgroundColor: 'rgb(240 242 245)' }}>
            <Grid container spacing={2} style={{ padding: '20px', marginBottom: '20px' }}>
              <Grid item xs={12} md={12}>
                <Typography
                  color="rgb(52, 71, 103)"
                  fontWeight="bold"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '20px',
                    opacity: 1,
                  }}
                >
                  Payments
                </Typography>
              </Grid>
              {/* <Grid item xs={12} md={6}>
               <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Grid container spacing={2} style={{ padding: '20px', marginBottom: '20px' }}>
              <Grid item xs={12} md={12}>
              <Typography
                  color="rgb(52, 71, 103)"
                  fontWeight="bold"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '20px',
                    opacity: 1,
                  }}
                >
                  Card Payments
                </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
              <Typography
                  color="rgb(52, 71, 103)"
                  fontWeight="bold"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '20px',
                    opacity: 1,
                  }}
                >
                  12334444
                </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
</Grid>
<Grid item xs={12} md={2}>
<Typography
                  color="rgb(52, 71, 103)"
                  fontWeight="bold"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '20px',
                    opacity: 1,
                  }}
                >
                  Card Holder
                </Typography>
                <Typography
                  color="rgb(52, 71, 103)"
                  fontWeight="bold"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '20px',
                    opacity: 1,
                  }}
                >
                  Jack Peterson
                </Typography>
</Grid>
<Grid item xs={12} md={2}>
<Typography
                  color="rgb(52, 71, 103)"
                  fontWeight="bold"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '20px',
                    opacity: 1,
                  }}
                >
                  Expires
                </Typography>
                <Typography
                  color="rgb(52, 71, 103)"
                  fontWeight="bold"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '20px',
                    opacity: 1,
                  }}
                >
                  11/22
                </Typography>
</Grid>
<Grid item xs={12} md={2}>

</Grid>

                </Grid>
      </CardContent>
   
    </Card> 
</Grid> */}

              <Grid item xs={12} md={6}>
                {/* ROW 2 */}
                <Box
                  gridColumn="span 8"
                  gridRow="span 2"
                  backgroundColor={colors.primary[400]}
                >
                  <Box
                    mt="25px"
                    p="0 30px"
                    display="flex "
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="600"
                        color={colors.grey[100]}
                      >
                        Revenue Generated
                      </Typography>
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        color={colors.greenAccent[500]}
                      >
                        $59,342.32
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton>
                        <DownloadOutlinedIcon
                          sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box height="250px" m="-20px 0 0 0">
                    <LineChart isDashboard={true} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  gridColumn="span 4"
                  gridRow="span 2"
                  backgroundColor={colors.primary[400]}
                >
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{ padding: "30px 30px 0 30px" }}
                  >
                    Sales Quantity
                  </Typography>
                  <Box height="250px" mt="-20px">
                    <BarChart isDashboard={true} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography
                  color="rgb(52, 71, 103)"
                  fontWeight="bold"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '20px',
                    opacity: 1,
                  }}
                >
                  Details
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>

                <Typography
                  color="rgb(123, 128, 154)"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '17px'
                  }}
                >
                  Supply Order Details
                </Typography>
                <Grid container spacing={2} style={{ padding: '20px' }}>

<Grid item xs={4} md={4}>
  <Typography
    color="rgb(52, 71, 103)"
    fontWeight="bold"
    sx={{
      m: "0 0 5px 0",
      fontSize: '17px',
      opacity: 1,
    }}
  >
    Ref No :
  </Typography>
  <Typography
    color="rgb(52, 71, 103)"
    fontWeight="bold"
    sx={{
      m: "0 0 5px 0",
      fontSize: '17px',
      opacity: 1,
    }}
  >
    Details :
  </Typography>
</Grid>
<Grid item xs={8} md={8}>
  <Typography
    color="rgb(123, 128, 154)"
    sx={{
      m: "0 0 5px 0",
      fontSize: '17px'
    }}
  >
    76567
  </Typography>
  <Typography
    color="rgb(123, 128, 154)"
    sx={{
      m: "0 0 5px 0",
      fontSize: '17px'
    }}
  >
    Details
  </Typography>
</Grid>
</Grid>
              </Grid>
              <Grid item xs={12} md={4} >

                <Typography
                  color="rgb(123, 128, 154)"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '17px'
                  }}
                >
                  Sales Order Details
                </Typography>
                <Grid container spacing={2} style={{ padding: '20px' }}>

                  <Grid item xs={4} md={4}>
                    <Typography
                      color="rgb(52, 71, 103)"
                      fontWeight="bold"
                      sx={{
                        m: "0 0 5px 0",
                        fontSize: '17px',
                        opacity: 1,
                      }}
                    >
                      Ref No :
                    </Typography>
                    <Typography
                      color="rgb(52, 71, 103)"
                      fontWeight="bold"
                      sx={{
                        m: "0 0 5px 0",
                        fontSize: '17px',
                        opacity: 1,
                      }}
                    >
                      Details :
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <Typography
                      color="rgb(123, 128, 154)"
                      sx={{
                        m: "0 0 5px 0",
                        fontSize: '17px'
                      }}
                    >
                      76567
                    </Typography>
                    <Typography
                      color="rgb(123, 128, 154)"
                      sx={{
                        m: "0 0 5px 0",
                        fontSize: '17px'
                      }}
                    >
                      Details
                    </Typography>
                  </Grid>
                </Grid>


              </Grid>
              <Grid item xs={12} md={4}>
                <Typography
                  color="rgb(123, 128, 154)"
                  sx={{
                    m: "0 0 5px 0",
                    fontSize: '17px'
                  }}
                >
                  Purchase Order Details
                </Typography>
                <Grid container spacing={2} style={{ padding: '20px' }}>

<Grid item xs={4} md={4}>
  <Typography
    color="rgb(52, 71, 103)"
    fontWeight="bold"
    sx={{
      m: "0 0 5px 0",
      fontSize: '17px',
      opacity: 1,
    }}
  >
    Ref No :
  </Typography>
  <Typography
    color="rgb(52, 71, 103)"
    fontWeight="bold"
    sx={{
      m: "0 0 5px 0",
      fontSize: '17px',
      opacity: 1,
    }}
  >
    Details :
  </Typography>
</Grid>
<Grid item xs={8} md={8}>
  <Typography
    color="rgb(123, 128, 154)"
    sx={{
      m: "0 0 5px 0",
      fontSize: '17px'
    }}
  >
    76567
  </Typography>
  <Typography
    color="rgb(123, 128, 154)"
    sx={{
      m: "0 0 5px 0",
      fontSize: '17px'
    }}
  >
    Details
  </Typography>
</Grid>
</Grid>
              </Grid>
          
              <Grid item xs={12} md={2}>
                <Button startIcon={<PrintIcon />} variant="contained" onClick={() => handleOpenAdd()}>
                  Print
                </Button>
              </Grid>

            </Grid>


          </Box>
        </Grid>
        {/* <Grid item xs={12} md={2}>
        </Grid> */}
      </Grid>


    </>
  );
};

export default Team;

import { Box, Typography, useTheme, IconButton } from "@mui/material";
import Header from "../../components/Header";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import { Avatar } from "@mui/material";
import url from "../url"
import zoom from "../../components/Images/zoom.jpg"
import PropTypes from 'prop-types';
import React from "react";

const logoStyle = {
  width: '100%',
  height: '100%',
}
// Tabs 
function Item(props) {
  const { sx, ...other } = props;
  return (
      <Box
          sx={{
              p: 0,
              m: 1,
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'white'),
              color: (theme) => (theme.palette.mode === 'dark' ? 'black' : 'black'),
              fontSize: '0.875rem',
              backgroundColor: 'white',
              fontWeight: '700',
              ...sx,
          }}
          {...other}
      />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
      ),
      PropTypes.func,
      PropTypes.object,
  ]),
};
const Team = () => {
  // Tabs value
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon />
          </Link>

          <Typography color="text.primary">Meetings</Typography>
        </Breadcrumbs>

      </Box>
      <Box m="20px">
        <Header title="Meetings" subtitle="Managing the Meetings" />

        <Box sx={{ width: '100%' }}>
        <Grid container spacing={2} >
            <Grid item xs={12} md={2} > </Grid>
                <Grid item xs={12} md={8} >

                    {/* heading */}
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{ display: 'flex', p: 1, bgcolor: 'white', borderRadius: 1 }}
                            >
                                <Item sx={{ flexGrow: 2 }}>
                                <Grid container direction="row" alignItems="center">
                   
                    <Grid item>
                    <div  > Create a Meeting</div>
                    </Grid>
                  </Grid>
                                </Item>
                               
                            </Box>

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box
                                sx={{ display: 'flex', p: 1, bgcolor: 'white', borderRadius: 1 }}
                            >
                                <Item >
                                  <Grid container spacing={2}>
                                    <Grid item xs={6} md={6}>
                                    <Avatar alt="Remy Sharp" variant="square" style={logoStyle} src={zoom}/>

                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                    <Typography variant='h6' style={{ fontFamily:'Roboto, sans-serif',marginTop:'30px' }}>Launch Meeting with Zoom</Typography>
                                    <Button variant="contained" style={{ fontFamily:'Roboto, sans-serif',marginTop:'30px',marginLeft:'0px',backgroundColor:'#52ad4a' }}
                                    onClick={()=> openInNewTab('https://zoom.us/signin')}>Launch</Button>

                                    </Grid>
                                  </Grid>
                                </Item>
                               
                            </Box>

                        </Grid>
                      

                    </Grid>
                </Grid>
                <Grid item xs={12} md={2} >
                    </Grid>

               
            </Grid>
       
        </Box>
      </Box>
    </>
  );
};

export default Team;

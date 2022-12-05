import React ,{ useState, useEffect} from 'react'
import axios from 'axios';
import { Grid } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import image from '../../components/Images/logo.png'
// import 'animate.css';
import Avatar from '@mui/material/Avatar';
import url from '../url'
import ClipLoader from "react-spinners/ClipLoader";
import TextField from '@mui/material/TextField';
const ContainerStyle = {
      padding: '30px',
      height: "110vh",
      paddingTop: '180px',
      backgroundColor:'#e8eff9',
      color: 'white',
  
  }
  
  const btn = {
      width: '99%',
      marginTop: '20px',
      marginBottom: '20px',
      color: 'white',
      backgroundColor: '#78be20',
      borderColor: '#ada6f2',
      height:'50px',
      padding: '0px',
      fontFamily: 'Tiro Gurmukhi, serif'
  }
  
  const InputStyle = {
      width: '100%',
  }
  
  const headingStyle = {
      fontSize: '16px',
     color:'black'
  
  }
  const gridCont = {
      padding: '30px',
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '-70px',
      backgroundColor:'white',
      // height:'400px'
  }
  const override = {
      display: ' block',
      margin: '0 auto',
      //   borderColor: 'red',
  }
  const logoStyle = {
   width:'30%',
   height:'30%'
}
  const color = "black"
  
  const heading = "ADMIN LOGIN"
function Login() {
  const [loading, setLoading] = useState("");
     const [loading1, setLoading1] = useState(false);
  
     useEffect(() => {
         setLoading(true)
         setTimeout(() => {
             setLoading(false)
  
         }, 3000)
     }, [])
     //    Get 
     let navigate = useNavigate();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
    //  const [idData, setidData] = useState("");
  
     const headers = {
         'Content-Type': 'application/json'
     }
     const submitHandler = async(e) => {
         e.preventDefault()
         // Loader 
         setLoading1(true)
         setTimeout(() => {
             setLoading1(false)
         }, 3000)
        //  POst Request 
         await axios.put(`${url}login-user`, {
             email: email,
             password: password
         }, { headers }).then(response => {
             console.log(response)
             localStorage.setItem('items', JSON.stringify(response.data._id));
            //  setidData(response.data._id)
             // console.log(response.data.session);
            //  console.log(idData);
  
             navigate('/home')
            //  ,
            //      {
            //          state: {
            //              idData: response.data._id,
            //          }
            //      }
            //      );
  
         })
             .catch(err => {
                 console.log(err)
                 Swal.fire('Invalid Credentials')
             })
     }

   
  return (
    <div>  
        < Grid container spacing={2} style={ContainerStyle}>
         <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} style={gridCont}>
             <Grid align='center'>
            <Avatar src={image} variant="square" style={logoStyle} ></Avatar>
              {/* <h1 style={headingStyle1}>LOGO</h1> */}
               <h6 style={headingStyle}>{heading}</h6>
    
    
             <TextField style={InputStyle} id="outlined-basic"
                value={email}
                onChange={
                  (e) => setEmail(e.target.value)
                }
                label="Email" variant="outlined" required />
              <br /><br />
              <TextField style={InputStyle} id="outlined-basic"
                value={password}
                onChange={
                  (e) => setPassword(e.target.value)
                }
                label="Password" variant="outlined" required />
    
              <br />
              <Button variant="contained" onClick={
                submitHandler
    
              } style={btn} >
                {loading1 ? <ClipLoader color={color} loading={loading1} css={override} size={10} /> : <h3>Login</h3>}
              </Button>
    
              <br />
    
            </Grid>
    
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} ></Grid>
        </Grid></div>
  )
}

export default Login

import React from 'react'
import { useLocation } from 'react-router-dom';
import url from '../url'
import { useNavigate } from 'react-router-dom';


function PdfViewer() {
    const { state } = useLocation();
    const navigate = useNavigate();

   
    
  return (
    <div>
        {console.log('state.link')}
        {console.log(state.link)}
        {console.log(state.data)}
        {/* {console.log(value)} */}
        <button style={{cursor:'pointer',backgroundColor:'#59b052',color:'white',padding:'10px',borderRadius:'10px',border:'1px solid #59b052'}} onClick={() => navigate('/library',
      {
        state: {
          data: state.data
        }
        })} >Go Back</button>
    <iframe title="documents" src={`${url}${state.link}`} width="100%" height="800vh">
    </iframe>
</div>

  )
}

export default PdfViewer
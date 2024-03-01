import React, { useContext } from 'react'
import { authConText } from '../Context/AuthConText'
import { Hearts } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';
import profilePic from "../../assets/profilePic.jpg"
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';


function Profile() {
    const {decodId}=useContext(authConText)
    
    if(!decodId){
        return <>
        <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center ">
        <Hearts 
      height="80"
      width="80"
      color="#fff"
      ariaLabel="hearts-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      
      />
        </div> 
        </>
    }
  return (
    <>
     <Helmet>
        <title>your profile</title>
    </Helmet>
    <section className='profileSection'>
      <div className="container">
        <div className="row ">
          <div className="col-12">
            <div className="nameProfile d-flex justify-content-center align-items-center">
            <Card className='cardProfile' style={{ borderRadius:"30px"}}>
              <img style={{borderRadius:"30px 30px 0 0"}} alt="profile picture" src={profilePic}/>
  <CardBody>
    <CardTitle tag="h5">
    <h1 className='text-center animate__animated animate__jackInTheBox'>hello <span>{decodId.name}</span></h1>
    </CardTitle>
    <CardText >
      <p style={{marginBlock:"30px",color:"green"}}>thank you for visiting our page , have a nice day .</p>
    </CardText>
    
  </CardBody>
</Card>
            </div>

          </div>
        </div>
      </div>
    </section>
    
      
    </>
  )
}

export default Profile

import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack} from "react-bootstrap";
import { Authcontext } from "../context/AuthContext";
import im from "../assets/dark.jpg";
import Login from "./Login";


const Register = () => {
        const {registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(Authcontext);
        /*const handleImageChange = (e) => {
            const file = e.target.files[0];
            updateRegisterInfo({ ...registerInfo, profileImage: file });
        };*/

    return ( 
    <>
    
    <div style={{
        width:"auto",
        height:"700px",
        border:"4px solid red",
        backgroundColor:"black",
        borderRadius:"16px",
        fontFamily:"sans-serif",
        fontWeight:"600",
        backgroundImage: `url(${im})`,
        backgroundSize: "cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        boxShadow: '0 0 20px 8px rgba(128, 0, 0, 0.3), 0 0 20px 8px rgba(128, 0, 0, 0.3), 0 0 20px 8px rgba(128, 0, 0, 0.3), 0 0 20px 8px rgba(128, 0, 0, 0.3)',
       }}>
        <Form onSubmit={registerUser}>
            <Row style={{
                justifyContent:"center",
                paddingTop:"10%"
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h3 style={{color:"violet", fontWeight:"900"}}>
                            Register with our chatting Api
                        </h3>
                        {/*<Form.Control type="file" accept="image/*" onChange={handleImageChange} />*/}
                        <Form.Control type="text" placeholder="enter name"
                         onChange={(e) => updateRegisterInfo({...registerInfo, name: e.target.value})} />
                        <Form.Control type="email" placeholder="enter Email"
                        onChange={(e) => updateRegisterInfo({...registerInfo, email: e.target.value})}/>
                        <Form.Control type="password" placeholder="enter password"
                        onChange={(e) => updateRegisterInfo({...registerInfo, password: e.target.value})}/>
                        <Button variant="primary" type="submit">
                            {isRegisterLoading? "Creating Your Account" : "Register"}
                        </Button>
                        {
                            registerError?.error && (<Alert variant="damger">
                            <p>{registerError?.message}</p>
                        </Alert>
                        )}
                        <div>Already have an account?<a href="Login">Sign In</a></div>
                    </Stack>
                </Col>
            </Row>
        </Form>
        </div>
    </>
     );
}
 
export default Register;
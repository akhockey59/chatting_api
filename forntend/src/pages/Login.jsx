import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack} from "react-bootstrap";
import { Authcontext } from "../context/AuthContext";
import im from "../assets/claws.webp";
import imgs from "../assets/dark.jpg";
import Register from "./Register";
const Login = () => {

    const {loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading} = useContext(Authcontext);
    return ( 
    <>
    <div style={{
        width:"auto",
        height:"600px",
        border:"4px solid red",
        borderRadius:"18px",
        fontFamily:"sans-serif",
        fontWeight:"600",
        backgroundImage: `url(${im}), url(${imgs})`,
        backgroundSize: "cover",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        boxShadow: '0 0 20px 8px rgba(128, 0, 0, 0.3), 0 0 20px 8px rgba(128, 0, 0, 0.3), 0 0 20px 8px rgba(128, 0, 0, 0.3), 0 0 20px 8px rgba(128, 0, 0, 0.3)',
    }}>
        <Form onSubmit={loginUser}>
            <Row style={{
                height:"600px",
                justifyContent:"center",
                paddingTop:"10%",
            }}>
                <Col xs={6}>
                    <Stack gap={3}>
                        <h3 style={{color:"violet", fontWeight:"900"}}>
                            Login here....
                        </h3>
                        <Form.Control type="email" placeholder="enter Email" autoComplete="false" onChange={(e) => updateLoginInfo({...loginInfo, email: e.target.value})}/>
                        <Form.Control type="password" placeholder="enter password" onChange={(e) => updateLoginInfo({...loginInfo, password:e.target.value})}/>
                        <Button variant="primary" type="submit"> { isLoginLoading? "getting you in..." : "Login.."}
                        </Button>
                        {
                            loginError?.error &&  (<Alert variant="danger">
                            <p>{loginError?.message}</p>
                        </Alert>
                            )
                        }
                        <div>Don't have an account?<a href="Register">Sign Un</a></div>
                    </Stack>
                </Col>
            </Row>
        </Form>
        </div>
    </>
     );
}
 
export default Login;
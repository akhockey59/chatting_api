import { useContext } from "react";
import { Button, Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Authcontext } from "../context/AuthContext";
import Feedback from "react-bootstrap/esm/Feedback";
const NavBar = () => {

    const {user, logoutUser} = useContext(Authcontext);
    return ( 
    <>
    <Navbar bg="dark" className="mb-4" style={{ height:"3.50"}}>
    <Container>
        <h2>
        <Link to={"./"} style={{color:"aquamarine", textDecoration:"none"}}>Happy Chatting</Link> 
         </h2>
        {user && (<span className="text-warning">Logged in as {user?.name}</span>)} 
         <Nav>
            <Stack direction="horizontal" gap={4}>
                {
                    user && (<>
                    <Button onClick={()=>logoutUser()} to={"./Login"} style={{color:"Red", textDecoration:"none", backgroundColor:"black",border:"1px solid red"}}>Log Out</Button>
                    </>)
                }
                {
                    !user && (<>
                                <Link to={"./Login"} style={{color:"skyblue", textDecoration:"none"}}>Login</Link>
                                <Link to={"./Register"} style={{color:"cyan", textDecoration:"none"}}>Register</Link>
                    </>)
                }
                 <Link to={Feedback} style={{ color: "cyan", textDecoration: "none" }}>
                            <Button style={{ color: "white", backgroundColor: "blue", border: "1px solid blue" }}>Feedback</Button>
                        </Link>
            </Stack>
         </Nav>
    </Container>
    </Navbar>
    </>
     );
}
 
export default NavBar;
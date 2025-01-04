
import {useState} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom"; 
// Componente Quadrado
const Login = () => {
    const estiloRegistro = {
        width: '500px',
        height: '1000px',
        backgroundColor: '#313F54',
        margin: '10px',



    };
    const estiloTitulo = {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '50px',
        fontSize: '48px',
        paddingBottom: '50px',

    };
    const estiloCampos = {

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //paddingTop: '50px' ,


    };
    const estiloInput = {

        width: '80%',
        height: '40px',
        marginTop: '20px',
        fontSize: '18px',
        padding: '5px 10px',
        borderRadius: '5px',
        /* border: '1px solid #ccc', */
        paddingleft: '10px',


    };
    const estiloInputEmail = {


        height: '60px',



    };
    // const estiloInputTexto = {


    //     height: '160px',



    // };
    const estiloRegistrar = {


        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',




    };

    const {login, logout} = useAuth();
    const navigate = useNavigate();
    
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    
    const [message, setMessage] = useState("");
    
    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    const handleLogin = async () => {
        const response = await login(user, password);
        
        if(!response.success) setMessage(response.message);
        else navigate("/dashboard");
    }


    return <div style={estiloRegistro}>
        <div style={estiloTitulo}><h1>LOGIN</h1></div>
        <div style={estiloCampos}><input
            type="Email"
            placeholder="Email"
            value={user}
                           onChange={e => setUser(e.target.value)}
            style={{ ...estiloInput, ...estiloInputEmail }}


        /> </div>
        <div style={estiloCampos}><input
            type="Password"
            placeholder="Senha"
            value={password}
                           onChange={e => setPassword(e.target.value)}
            style={{ ...estiloInput, ...estiloInputEmail }}


        />
        </div>
        
        <div style={{ paddingLeft: '50px' }}><a href="#">Esqueceu a senha?</a></div>




        <div style={{ ...estiloRegistrar, paddingTop: '50px' }} ><button onClick={() => handleLogin()} type="submit" style={{ ...estiloInput, backgroundColor: '#2C9F4C', ...estiloInputEmail, }}>ENTRAR</button>
        </div>
        <p className="text-lg text-secondary">{message}</p>
        <div style={{ ...estiloRegistrar }} ><button  onClick={() => handleLogout()} type="submit" style={{ ...estiloInput, backgroundColor: '#445774', ...estiloInputEmail }}>REGISTRAR-SE</button>
        </div>

    </div>;
}

export default Login;


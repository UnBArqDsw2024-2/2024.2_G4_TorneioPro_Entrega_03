import {useState} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
// Componente Quadrado
const Login = () => {
    const estiloRegistro = {
        width: '500px',
        height: '1000px',
        backgroundColor: '#313F54',
        margin: '0px',


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

    const {login} = useAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleRegister = () => {
        navigate("/register");
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        
        const response = await login(user, password);

        if (!response.success) setMessage(response.message);
        else navigate("/dashboard");
    }


    return <div style={estiloRegistro}>
        <div style={estiloTitulo}><h1>LOGIN</h1></div>

        <form onSubmit={handleLogin}>
            <div style={estiloCampos}><input
                type="text"
                placeholder="Nome de Usuário"
                required={true}
                className="bg-form-modal-input"
                value={user}
                onChange={e => setUser(e.target.value)}
                style={{...estiloInput, ...estiloInputEmail}}


            /></div>
            <div style={estiloCampos}><input
                type="Password"
                placeholder="Senha"
                required={true}
                minLength={8}
                className="bg-form-modal-input mb-2"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{...estiloInput, ...estiloInputEmail}}


            />
            </div>

            <div style={{paddingLeft: '50px'}}><a href="#">Esqueceu a senha?</a></div>


            <div className="flex flex-col" style={{...estiloRegistrar, paddingTop: '50px'}}>
                <button type="submit"
                        style={{...estiloInput, backgroundColor: '#2C9F4C', ...estiloInputEmail,}}
                        className="hover:bg-secondary-btn-hover bg-secondary-btn-base">ENTRAR
                </button>
                <p className="text-lg text-secondary mt-1">{message}</p>
            </div>
            <div style={{...estiloRegistrar}}>
                <button onClick={() => handleRegister()}
                        style={{...estiloInput, backgroundColor: '#445774', ...estiloInputEmail}}
                        className="hover:bg-primary-btn-hover bg-primary-btn-base">REGISTRAR-SE
                </button>
            </div>
        </form>

    </div>;
}

export default Login
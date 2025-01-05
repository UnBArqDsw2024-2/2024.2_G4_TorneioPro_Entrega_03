import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_BASE_URL} from "../util/Constants.tsx";
import {User} from "lucide-react";

interface ErrorResponse {
    username?: string;
    email?: string;
    password?: string;
    user_type?: string;
    message?: string;
}

const Registro = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cargo, setCargo] = useState("");
    const [message, setMessage] = useState("");

    const handleRegistrar = async (e) => {
        e.preventDefault();
        
        const body = {
            username: username,
            email: email,
            password: senha,
            user_type: cargo
        }
        
        try {

            const response = await axios.post(`${API_BASE_URL}/auth/register/request/`, body)
            navigate("/login")
        } catch (error) {
            const data: ErrorResponse = error.response.data;
            
            const erro = data.username || data.email || data.message || data.password || data.user_type || 'Unknown error';
            
            setMessage(erro[0]);
        }
    }
    
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
    //
    // 
    //   height: '160px', 
    // 
    //  
    // 
    // };
    const estiloRegistrar = {


        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',


    };

    return <div style={estiloRegistro}>
        <div style={estiloTitulo}><h1>REGISTRAR-SE</h1></div>
        <form onSubmit={handleRegistrar}>
            <div style={estiloCampos}><input
                type="text"
                required={true}
                minLength={8}
                placeholder="Nome de Usuário"
                className="bg-form-modal-input"
                style={{...estiloInput, ...estiloInputEmail}}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            </div>

            <div style={estiloCampos}><input
                type="email"
                required={true}
                placeholder="Email"
                className="bg-form-modal-input"
                style={{...estiloInput, ...estiloInputEmail}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div style={estiloCampos}><input
                type="password"
                required={true}
                minLength={8}
                placeholder="Senha"
                className="bg-form-modal-input"
                style={{...estiloInput, ...estiloInputEmail}}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            </div>
            <div style={estiloCampos}>
                <select
                    value={cargo}
                    required={true}
                    className="bg-form-modal-input"
                    onChange={(e) => setCargo(e.target.value)}
                    style={estiloInput}
                >
                    <option value="" disabled selected>Cargos</option>
                    <option value="organizer">Organizador</option>
                    <option value="trainer">Treinador</option>
                    <option value="player">Jogador</option>
                </select>
            </div>

            <div className="flex flex-col" style={{...estiloRegistrar, paddingTop: '50px'}}>
                <button type="submit"
                        style={{...estiloInput, backgroundColor: '#2C9F4C', ...estiloInputEmail,}}>REGISTRAR
                </button>
                <p className="text-lg text-secondary mt-4 mb-2 mx-12 text-justify hyphens-auto" lang="pt-BR"  >{message}</p>
            </div>
            <div style={{...estiloRegistrar}}>
            <button type="button" onClick={handleLogin}
                        style={{...estiloInput, backgroundColor: '#445774', ...estiloInputEmail}}>JÁ TENHO UMA CONTA
                </button>
            </div>
        </form>

        {/*<div style={estiloCampos}>*/}
        {/*<input*/}
        {/*      */}
        {/*      type="text"*/}
        {/*      placeholder="Motivo de receber acesso à plataforma..."*/}
        {/*      value={motivo}*/}
        {/*        onChange={(e) => setMotivo(e.target.value)}*/}
        {/*      style={{...estiloInput, ...estiloInputTexto}}*/}
        {/*      */}

        {/*    />*/}
        {/*</div>*/}
    </div>;
}

export default Registro;

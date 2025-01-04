import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Registro = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
   
    navigate("/login");
 }
 const handleRegistrar = () => {
   
   
 }
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [motivo, setMotivo] = useState("");
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
    paddingTop: '50px' ,
    fontSize: '48px',
    paddingBottom: '50px' ,
   
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
    paddingleft: '10px' ,
    
   
  };
  const estiloInputEmail = {
  
   
    height: '60px', 
   
    
   
  };
  const estiloInputTexto = {
  
   
    height: '160px', 
   
    
   
  };
  const estiloRegistrar = {
  
   
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center', 
    
   

   
  };
  

  return <div style={estiloRegistro}>
    <div style={estiloTitulo}><h1>REGISTRAR-SE</h1></div>
    <div style={estiloCampos}><input
        type="email"
        placeholder="Email"
        style={{...estiloInput, ...estiloInputEmail}}
        value={email}
          onChange={(e) => setEmail(e.target.value)}
        

      />
  </div>
  <div style={estiloCampos}>
  <select
    value={cargo}
    onChange={(e) => setCargo(e.target.value)}
    style={estiloInput}
  >
    <option value="" disabled selected>Cargos</option>
    <option value="opcao1">Fotebol</option>
    <option value="opcao2">Vôlei</option>
    <option value="opcao3">Basquete</option>
  </select>
</div>

  <div style={estiloCampos}>
  <input
        
        type="text"
        placeholder="Motivo de receber acesso à plataforma..."
        value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        style={{...estiloInput, ...estiloInputTexto}}
        

      />
  </div>

  <div  style={{  ...estiloRegistrar, paddingTop: '50px'}} ><button  type="submit" onClick={handleRegistrar}
           style={{...estiloInput, backgroundColor: '#2C9F4C', ...estiloInputEmail, }}>REGISTRAR</button>
  </div>
  <div style={{  ...estiloRegistrar}} ><button type="button" onClick={handleLogin}  style={{...estiloInput, backgroundColor: '#445774', ...estiloInputEmail}}>JÁ TENHO UMA CONTA</button>
  </div>

  </div>;
}

export default Registro;

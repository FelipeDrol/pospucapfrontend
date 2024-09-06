import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import Documento from "../components/Documento"
import dados from '../dados/documentos.json'
import Header from '../components/Header'
import TextoBase from '../components/TextoBase'
import Botao from '../components/Botao'
import axios from 'axios';

export default function Dados() {
  const [estado, setEstado] = useState(dados)
  const {state} = useLocation();
  const { usuario } = state;
  const navigate = useNavigate();

  const validaDocumentos = () => {
    let todosPreenchidos = 0;

    estado.forEach(function(d) { 
      if(d.valor)
      {
        todosPreenchidos++;
      }
      else
      {
        document.querySelector('[name="' + d.nome + '"]').style.border = '1px solid red';
      }
    });

    let mail = usuario;

    if(todosPreenchidos >= estado.length)
    {
     
    }

    if(todosPreenchidos >= estado.length)
      {
        let sqlID = estado[0].sqlID;

        let formData = new FormData();

        formData.append("json", JSON.stringify(estado));
        formData.append("usuario", state.usuario);
        formData.append("pagina", "Dados");

        if(sqlID)
        {
          formData.append("id", sqlID);

          axios.post("http://localhost:5000/dado", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          })
          .then((response) => {
            navigate("/anexos", { state: { usuario: mail, documentos: estado } });
          })
          .catch((error) => {
            console.log(error);
          });
        }
        else
        {
          axios.put("http://localhost:5000/dado", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          })
          .then((response) => {
            navigate("/anexos", { state: { usuario: mail, documentos: estado } });
          })
          .catch((error) => {
            console.log(error);
          });
        }
      }
  }

  const limparDados = () => {
    let sqlID = estado[0].sqlID;

    if(sqlID){
      axios.delete("http://localhost:5000/dado", {params: {id: sqlID}}).then(response => {
          limparInterno();
      });
    }
    else{
      limparInterno();
    }
  }

  const limparInterno = () => {
    let novoEstado = estado.map(e => {
      e.valor = "";
      return e;
    });

    setEstado(novoEstado);
  }

  const mudaTexto = (obj) => {
    let novoEstado = estado.map(e => {
      if(e.nome === obj.target.name)
      {
        e.valor = obj.target.value;
        return e;
      }
      else
      {
        return e;
      }
    });

    setEstado(novoEstado);
}

const mudaCEP = (obj) => {
  let numberCEP = obj.target.value.replace(/\D/g,'');
  if(numberCEP.length === 8)
  {
    axios.get('https://viacep.com.br/ws/' + numberCEP + '/json/').then((response) => {
      let novoEstado = estado.map(e => {
        if(e.nome === obj.target.name)
        {
          e.valor = numberCEP;
          return e;
        }
        else if(e.nome === "Endereco:")
          {
            let htmlID = e.nome + "-" + e.id;
            if(response.data.estado)
            {
              let endereco = response.data.logradouro + ", " + response.data.localidade + " - " + response.data.estado;
              document.getElementById(htmlID).value = endereco;
              e.valor = endereco;
            }
            else{
              document.getElementById(htmlID).value = "";
              e.valor = "";
            }
            return e;
          }
          else
          {
            return e;
          }
      });
  
      setEstado(novoEstado);
    });
  }
  else{
    let novoEstado = estado.map(e => {
      if(e.nome === obj.target.name)
      {
        e.valor = obj.target.value;
        return e;
      }
      else
      {
        return e;
      }
    });

    setEstado(novoEstado);
  }
}

  useEffect(() => {
    estado.map(e => {
      if(e.valor)
      {
        document.querySelector('[name="' + e.nome + '"]').style.border = '1px solid black';
      }
      return e;
    });
  });

  useEffect(()=>{
    axios.get('http://localhost:5000/dado', {params: {
      usuario: state.usuario,
      pagina: "Dados"
    }}).then((response) => {
      let dadosJS = JSON.parse(response.data.json);
      
      dadosJS.map(e => {
          e.sqlID = response.data.id;
          return e;
      });
    
      setEstado(dadosJS);
    }).catch(function (error) {
      
    });;
  }, [])
  
  
  return (
    <div>
      <Header stage={2} user={usuario}/>
      <TextoBase texto={"Insira as informações conforme solicitadas:"} />

      <section className="documentos">
        {estado.map((d, index) => (
          <Documento key={index} documento={d} funcao={d.validacao ? mudaCEP : mudaTexto}/>
        ))}
      </section>

      <Botao funcao={validaDocumentos} texto={"Avançar"} />
      <Botao funcao={limparDados} texto={"Limpar"}/>
    </div>
  )
}

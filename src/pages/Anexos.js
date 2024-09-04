import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import dados from '../dados/anexos.json'

import Header from '../components/Header'
import TextoBase from '../components/TextoBase'
import Botao from '../components/Botao'
import Anexo from "../components/Anexo"

import axios from 'axios';

export default function Anexos() {
  const [estado, setEstado] = useState(dados)
  const {state} = useLocation();
  const navigate = useNavigate();

  const validaAnexos = () => {
    let todosPreenchidos = 0;

    estado.forEach(function(d) { 
      if(d.nome_arquivo)
        {
          todosPreenchidos++;
        }
        else
        {
          document.querySelector('input[name="' + d.nome + '"]').parentNode.getElementsByClassName("btn")[0].style.border = '1px dashed red';
        }
    });

    if(todosPreenchidos >= estado.length)
    {
      let paraPreencher = estado.length;
      let preenchidos = 0;
      
      estado.forEach(function(d) { 
        if(d.sqlID)
        {
          let valorEscolha = "0";
          if(d.valorEscolha){
            valorEscolha = d.valorEscolha;
          }
          let formData = new FormData();
          formData.append("base64", d.blob);
          formData.append("nome_arquivo", d.nome_arquivo);
          formData.append("usuario", state.usuario);
          formData.append("campo", d.nome);
          formData.append("valorEscolha", valorEscolha);
          formData.append("id", d.sqlID);
          
          axios.post("http://localhost:5001/documento", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          })
          .then((response) => {
            preenchidos++;
            if(preenchidos >= paraPreencher){
              navigate("/final", { state: { usuario: state.usuario, documentos: state.documentos, anexos: estado} });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        }
        else
        {
          let valorEscolha = "0";
          if(d.valorEscolha){
            valorEscolha = d.valorEscolha;
          }
          let formData = new FormData();
          formData.append("base64", d.blob);
          formData.append("nome_arquivo", d.nome_arquivo);
          formData.append("usuario", state.usuario);
          formData.append("campo", d.nome);
          formData.append("valorEscolha", valorEscolha);

          axios.put("http://localhost:5001/documento", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
          })
          .then((response) => {
            preenchidos++;
            if(preenchidos >= paraPreencher){
              navigate("/final", { state: { usuario: state.usuario, documentos: state.documentos, anexos: estado} });
            }
          })
          .catch((error) => {
            console.log(error);
          });
       }
      });
    }
  }

  const limparDados = () => {
    let sqlID = estado[0].sqlID;

    
    if(sqlID){
      axios.delete("http://localhost:5001/documento", {params: {usuario: state.usuario}}).then(response => {
          limparInterno();
      }).catch(function (error) {

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
    window.location.reload();
  }


  const readFile = (event, nome, nomeArquivo) => {
    let novoEstado = estado.map(e => {
      if(e.nome === nome)
      {
        e.nome_arquivo = nomeArquivo;
        e.blob = event.target.result.split(',')[1];;
        return e;
      }
      else
      {
        return e;
      }
    });

    setEstado(novoEstado);
  }

  const mudaAnexo = (event, htmlID) => {
    if(event.target.files.length > 0)
    {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', (e => readFile(e, event.target.name, file.name)));
      reader.readAsDataURL(file);

      document.getElementById(htmlID).parentNode.getElementsByClassName("spanNormal")[0].innerHTML = " para modificar o arquivo " + file.name;
    }
  }

  useEffect(() => {
    estado.map(e => {
      if(e.valor)
      {
        document.querySelector('input[name="' + e.nome + '"]').parentNode.getElementsByClassName("btn")[0].style.border = '1px dashed black';
      }

      return e;
    });
  });

  useEffect(()=>{
    axios.get('http://localhost:5001/documento', {params: {
        usuario: state.usuario
      }}).then((rDocumento) => {
        let documentos = rDocumento.data.documentos;

        let novoEstado = estado.map(e => {

        let doc = documentos.find((d) => {
           return d.campo == e.nome;
         });

         if(doc)
         {
          e.sqlID = doc.id;
          e.valorEscolha = doc.valorEscolha;
          e.blob = doc.base64;
          e.nome_arquivo = doc.nome_arquivo;
          e.valor = doc.nome_arquivo;
         }
          
          return e;
        });
        setEstado(novoEstado);
      }).catch(function (error) {

      });
  }, [])
  
  return (
    <div>
      <Header stage={3} user={state.usuario}/>

      <TextoBase texto={"Insira as informações conforme solicitadas:"} />

      <section className="anexos">
        {estado.map((a, index) => (
          <Anexo key={index} anexo={a} state={estado} funcao={mudaAnexo}/>
        ))}
      </section>

      <Botao funcao={validaAnexos} texto={"Avançar"}/>
      <Botao funcao={limparDados} texto={"Limpar"}/>
    </div>
  )
}

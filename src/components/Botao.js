const MouseOver = (event)  => {
  event.target.style.background = '#3D85BD';
}

const MouseOut = (event) => {
  event.target.style.background="#0F8622";
}

export default function Botao(dados) {

  return (
    <button className="botao" onClick={() => dados.funcao()} onMouseOver={MouseOver} onMouseOut={MouseOut}>{dados.texto}</button>
  )
}


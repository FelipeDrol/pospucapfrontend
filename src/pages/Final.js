import Header from '../components/Header'
import TextoCabeca from '../components/TextoCabeca'
import { useLocation } from "react-router-dom";

export default function Final() {
  const {state} = useLocation();
  const { usuario, documentos, anexos } = state;

  console.log(usuario, documentos, anexos);
  return (
    <div>
      <Header stage={0} user={usuario}/>
      <TextoCabeca texto={"Obrigado"} />
      <TextoCabeca texto={"Processo concluido com sucesso!"} />
    </div>
  )
}

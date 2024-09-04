import banner from '../assets/banner.png'
import TextoCabeca from '../components/TextoCabeca'

export default function Header(dados) {
  let texto = dados.user ? "Olá, " + dados.user + "! Seja bem-vindo(a) ao" : "Olá! Seja bem-vindo(a) ao";

  return (
    <header>
        <div className="indicador">
          <div className={(dados.stage === 0 ? "oculto" : "visivel")}>
            <span className={(dados.stage === 1 ? "ativo" : "inativo")}>01</span>
            <div className="line" />
            <span className={(dados.stage === 2 ? "ativo" : "inativo")}>02</span>
            <div className="line" />
            <span className={(dados.stage === 3 ? "ativo" : "inativo")}>03</span>
          </div>
        </div>
        <TextoCabeca texto={texto} />
        <section className="banner">
          <img src={banner} alt="Banner"/>
        </section>
    </header>
  )
}


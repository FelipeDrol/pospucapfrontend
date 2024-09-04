import InputText from '../components/inputText'

export default function Documento(props) {
    const documento = props.documento

    let htmlID = documento.nome + "-" + documento.id;

    return (
        <div className="documento">
            <label>{documento.nome}</label>
            {
                documento.tipo === "Escolha" ?
                <select id={htmlID} className="documentoValor" value={documento.valor ? documento.valor : ""} name={documento.nome} idref={props.idref} onChange={props.funcao}>
                    <option value="" disabled>Escolha</option>
                    {documento.opcoes.map((opt, index) => (
                        <option key={index} value={opt}>{opt} </option>
                    ))}
                </select> :
                <InputText id={htmlID} placeholder={""} classe={"documentoValor"} nome={documento.nome} funcao={props.funcao} disabled={documento.disabled} valor={documento.valor ? documento.valor : ""} />
            }
        </div>
    );
}
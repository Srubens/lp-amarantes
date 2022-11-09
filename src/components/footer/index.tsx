import {LogoAmarantes, LogoKeno} from "@components/index"

const Footer = () =>{
    return(
        <div className="footer">
        <div className="bg1_footer">
          <div className="d-flex flex-md-row flex-column justify-content-around align-items-center ">
            <div className="logo_amarantes" >
              <LogoAmarantes/>
            </div>
            <div>
            <p>
            Av. Conselheiro Aguiar, 1748 - 3º Andar - Boa Viagem, Recife - PE, 51111-011 (81) 2123-5655
            </p>
            </div>
            <div>
              <p>social icons</p>
            </div>
          </div>
          <br/>
          <div className="d-flex flex-md-row flex-column justify-content-around align-items-center text-center mb-4">
            <div className="termos" >
              <a href="#" target="_blank" rel="noopener noreferrer">Politica de Privacidade</a>
              <a href="#" target="_blank" className="termos_use" rel="noopener noreferrer">Termos de uso</a>
            </div>
  
            <div className="copy">
              <p>
              &copy; 2022 - Grupo Amarante - Todos os direitos reservados
              </p>
            </div>
  
            <div className="logoKeno" >
              <LogoKeno/>
            </div>
  
          </div>
        </div>
      </div>
    )
}

export default Footer
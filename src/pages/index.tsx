import {LogoAmarantes, LogoKeno} from "@components/index"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"


const Home = () => {

  const { register, handleSubmit, setValue, setFocus } = useForm()

  const [sucess, setSucess] = useState(false)

  const [form, setForm] =useState({
    nome:'',
    sobrenome:'',
    cpf:'',
    email:'',
    ddd:'',
    telefone:'',
    nascimento:'',
    cep:'',
    logradouro:'',
    numero:'',
    bairro:'',
    localidade:'',
    uf:''
  })

  const checkCEP = (e:any):any =>{
    const cep = e?.target.value.replace(/\D/g,'')
    // console.log(cep)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
         .then(res => res.json())
         .then(data => {
          console.log(data)
          setValue('logradouro', data.logradouro)
          setValue('localidade', data.localidade)
          setValue('bairro', data.bairro)
          setValue('uf', data.uf)
          setFocus('numero')
          
          form.logradouro = data.logradouro
          form.localidade = data.localidade
          form.bairro = data.bairro
          form.uf = data.uf
        })
         
  }

  const onChange = (evt:any):any =>{
    const value = evt.target.value 
    const key = evt.target.name
    console.log(evt.target.value)
    setForm(old => ({
        ...old,
        [key]:value
    }))
} 

const onSubmit = (e:any):any =>{
  console.log(e)
}

const salvar = async(e:any) =>{
  e.preventDefault()
  try{
    const response = await fetch('/api/save', {
      method:'POST',
      body:JSON.stringify(form)
    })
    const data = await response.json()
    setSucess(true)
    console.log('Envio de dados:', data)
  }catch(err){
    console.log('Error: ', err)
  }
}


  return (

    <>
    <div className="fluid">
        <div className="bg1">
          <div className="bg2">
            <div className="bg_yellow">
              <div className="bg_green">

                  <div className="main_top">
                    <div className="bg_folha1"></div>  
                    <div className="logo"></div>  
                    <div className="bg_folha2"></div>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    <div className="main">
      <div className="container">
        <header className='main_header d-flex flex-column justify-content-center align-items-center text-center' >
          <h1>Cadastro</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis perferendis animi libero facere fugiat minus doloremque incidunt fuga placeat delectus officia impedit possimus recusandae dolorem et quasi, quis, ducimus sint?</p>
        </header>
        <br/>
        <pre>
        {/* {JSON.stringify(form,null,2)} */}
          </pre>
        <br/>
        <form onSubmit={handleSubmit(onSubmit)} method="post" >
          <p>Dados pessoais</p>

          <div className="d-flex flex-md-row flex-column justify-content-between">
            <div className="col-12 col-md-5">
              <input className='form-control ip1' name="nome" value={form.nome} type="text" placeholder='nome' onChange={onChange} />
            </div>
            <div className="col-12 col-md-5 ">
              <input className='form-control ip1' name="sobrenome" value={form.sobrenome} type="text" placeholder='sobrenome' onChange={onChange}  />
            </div>
          </div>
          <br/>
          <div className="d-flex flex-md-row flex-column ">
            <div className="col-12 col-md-6">

              <div className="d-flex flex-md-row justify-content-between">
                <div className="col-md-5">
                  <input className='form-control ip2' name="cpf" value={form.cpf} type="text" placeholder='CPF' onChange={onChange}  />
                </div>
                <div className="col-md-5 ">
                  <input className='form-control ip2' name="email" value={form.email} type="email" placeholder='E-mail' onChange={onChange} />

                </div>

              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex flex-md-row justify-content-between ">
                <div className="col-md-2 col-3">
                  <input className='form-control ip2-1' name="ddd" value={form.ddd} type="text" placeholder='DDD' onChange={onChange} />
                </div>
                <div className="col-md-6 col-8 ">
                  <input className='form-control ip2' name="telefone" value={form.telefone} type="text" placeholder='Telefone'  onChange={onChange} />
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div className="col-12 col-md-12">
            <div className="d-flex flex-md-row ">
              <div className="col-12 col-md-4">
                <label>Data de Nascimento:</label>
                <input className='form-control' name="nascimento" value={form.nascimento} type="date" placeholder='Nascimento' onChange={onChange} />
              </div>
            </div>
          </div>
          <br/>
          <p>Endereço</p>
          <div className="d-flex flex-md-row flex-column justify-content-between">
            <div className="col-12 col-md-2">
              <input className='form-control ip2' name="cep" value={form.cep} type="text" placeholder='CEP'
                onBlur={checkCEP} onChange={onChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <input className='form-control ip1-address' value={form.logradouro} type="text" placeholder='Rua' {...register("logradouro")} name="logradouro" onChange={onChange} />
            </div>
            <div className="col-12 col-md-2">
              <input className='form-control ip2 col-12' type="text" placeholder='Número' value={form.numero}  {...register("numero")} name="numero" onChange={onChange} />
            </div>
          </div>
          <br/>
          <div className="d-flex flex-column flex-md-row justify-content-between">
            <div className="col-12 col-md-5">
              <input className='form-control ip1 col-12' value={form.bairro} type="text" placeholder='Bairro' {...register("bairro")} name="bairro" onChange={onChange} />
            </div>
            <div className="col-12 col-md-5">
              <input className='form-control ip1 col-12' {...register("localidade")} name="localidade" value={form.localidade} type="text" placeholder='Cidade' onChange={onChange} />
            </div>
          </div>
          <br/>
          <div className="d-flex flex-md-row">
            <div className="col-12 col-md-12">
              <div className="col-12 col-md-3">
                <input className='form-control ip2 col-12' {...register("uf")} name="uf" onChange={onChange} value={form.uf} type="text" placeholder='UF'  />
              </div>
            </div>
          </div>
          <br/>
          <div className="d-flex flex-md-row">
            <input type="checkbox" required /> Li e concordo com os termos de uso
          </div>
          <br/>
          <div className="d-flex justify-content-end flex-md-row">
            <div onClick={salvar} className="mybtn btn btn-warning col-12 col-sm-12 col-md-2">Cadastrar</div>
          </div>
        </form>
      </div>
    </div>

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

    </>
  )
}

export default Home
import { Header, Footer } from "@components/index"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'


const Home = () => {

  const { register, handleSubmit, setValue, setFocus, reset } = useForm()

  

  const [sucess, setSucess] = useState(false)
  const [retorno, setRetorno] = useState({})

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


  const nome = form.nome
  const email = form.email

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
    // console.log(evt.target.value)
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

    if(!form.nome && form.nome === ''){
      console.log('Erro')
      Swal.fire({
          icon:'error',
          title:'Erro ao cadastrar',
          html:`Para cadastrar preencha todos os campos!`,
          confirmButtonText:"Voltar",
          confirmButtonColor:"#ff1a1a"
      })
      return false;
      }

      if(!email && email === ''){
        console.log('Erro')
        Swal.fire({
            icon:'error',
            title:'Erro ao cadastrar',
            html:`Para cadastrar preencha todos os campos!`
        })
        return false;
    }else{
      
      Swal.fire({
        icon:'success',
        html:'Cadastro realizado com sucesso'
      })

      const response = await fetch('/api/save', {
        method:'POST',
        body:JSON.stringify(form)
      })
      const data = await response.json()

      setForm({
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

      //console.log(data)
      setSucess(true)
      //setRetorno(data)
 
    }
    

  }catch(err){
    console.log('Error: ', err)
  }
}


  return (

    <>
    <Header/>
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

              <div className="d-flex flex-column flex-md-row justify-content-between ">
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
                <div className="ip-phone col-md-6 col-8 ">
                  <input className='form-control ip2-phone' name="telefone" value={form.telefone} type="text" placeholder='Telefone'  onChange={onChange} />
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div className="col-12 col-md-12">
            <div className="d-flex flex-md-row ">
              <div className="col-12 col-md-4">
                <label>Data de Nascimento:</label>
                <input className='form-control ip2' name="nascimento" value={form.nascimento} type="date" placeholder='Nascimento' onChange={onChange} />
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

   <Footer/>

    </>
  )
}

export default Home
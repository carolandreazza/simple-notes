import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [tarefas, setTarefas] = useState([
  /*   {
      id:0,
      tarefa:'Minha tarefa 1',
      finalizada:false
    },
    {
      id:2,
      tarefa:'Minha tarefa 2',
      finalizada:true
    } */
  ]);
  const [modal, setModal] = useState(false);

  const abrirModal = () => {
    setModal(!modal);
  }
  
  const salvarTarefa = () => {
    var tarefa = document.getElementById('content-tarefa');
    setTarefas([
      ...tarefas,
      {
        id: new Date().getTime(),
        tarefa: tarefa.value,
        finalizada: false
      }      
    ]);

    window.localStorage.setItem('tarefas', JSON.stringify([
      ...tarefas,
      {
        id: new Date().getTime(),
        tarefa: tarefa.value,
        finalizada: false
      }      
    ]));

    setModal(false);
  }

  const marcarConcluida = (id,opt) =>{
    let novasTarefas = tarefas.filter(function(val){
      if(val.id == id){
        val.finalizada = opt;
      }
      return val;
    })
    setTarefas(novasTarefas);
    window.localStorage.setItem('tarefas',JSON.stringify(novasTarefas));
  }

  const deletarTodasTarefas = () => {
    setTarefas([]);   
    window.localStorage.setItem('tarefas',JSON.stringify([]));
  }

  const deletarTarefa = (id) => {
    let novasTarefas = tarefas.filter(function(val){
      if(val.id !== id){
        return val;
      }
    })
    setTarefas(novasTarefas);
    window.localStorage.setItem('tarefas',JSON.stringify(novasTarefas));
  }


  useEffect(() => {
    if(window.localStorage.getItem('tarefas') != undefined){
      setTarefas(JSON.parse(window.localStorage.getItem('tarefas')));
        console.log(window.localStorage.getItem('tarefas'));
    }
  }, []);

  return (
    <div className="App">
      {
        modal?
        <div className='modal'>
          <div className='modalContent'>
            <h3>Adicionar tarefa</h3>
            <input id='content-tarefa' type='text'/>
            <button onClick={()=>salvarTarefa()}>Salvar</button> 
          </div>
        </div>
        :
        <div></div>
      }
      <div onClick={()=>abrirModal()} className='addTarefa'>+</div>
      <div onClick={()=>deletarTodasTarefas()} className='deletarTodasTarefas'>-</div>
      <div className='boxTarefas'>
        <h2>Minhas tarefas do dia</h2>
        {
          tarefas.map((val)=>{
            if(!val.finalizada){
              return (
                <div className='tarefaSingle'>
                  <p onClick={()=>marcarConcluida(val.id, true)}>{val.tarefa}</p>
                  <span onClick={()=>deletarTarefa(val.id, true)} style={{color:'red'}}>[x]</span>
                </div>                
              );
            }else{
              return(
                <div className='tarefaSingle'>
                  <p onClick={()=>marcarConcluida(val.id, false)} style={{textDecoration:'line-through'}}>{val.tarefa}</p>
                  <span onClick={()=>deletarTarefa(val.id, true)} style={{color:'red'}}>[x]</span>
                </div>
              );
            }
          })
        }
      </div>
    </div>
  );
}

export default App;

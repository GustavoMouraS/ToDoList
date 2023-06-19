import React, {useState, useEffect} from "react";
import './ToDoList.css'
import Icone from './assets/Checklist.png'

function ToDoList (){

    const listaStorage = localStorage.getItem('lista')

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : [])
    const [novoItem, setNovoItem] = useState('')

    useEffect(()=>{
        localStorage.setItem('lista', JSON.stringify(lista))
    }, [lista])

    function adicionaItem (form){
        form.preventDefault();
        if (!novoItem){
            return;
        }
        setLista([...lista, {text: novoItem, iscompleted: false}])
        setNovoItem('')
        document.getElementById('inputEntrada').focus
    }

    function clicou(index){
        const listaAux = [...lista]
        listaAux[index].iscompleted = !listaAux[index].iscompleted
        setLista(listaAux)
    }

    function deletar(index){
        const listaAux = [...lista]
        listaAux.splice(index,1)
        setLista(listaAux)
    }

    function deletaTudo(){
        setLista([])
    }

    return (
        <div>
        <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input id='inputEntrada' type="text" placeholder="Adicione uma tarefa" value={novoItem} onChange={(e) =>{setNovoItem (e.target.value)}} autoComplete="off"/>
                <button type="submit" className="add">Add</button>
            </form>
            <div className="listaTarefas">
                {
                    lista.length <1
                    ?
                    <img src={Icone} className="img" />
                    :
                    lista.map((item, index) => (
                        <div key={index} className={item.iscompleted ? 'item completo' : 'item'}>
                    <span onClick={() => {clicou(index)}}>{item.text}</span>
                    <button onClick={() => {deletar(index)}} className="del">Deletar</button>
                </div>
                ))
                }
                {lista.length > 0 && 
                <button className="delall" onClick={() => {deletaTudo()}}>Deletar Todas</button>}
            </div>
        </div>
    )
}

export default ToDoList
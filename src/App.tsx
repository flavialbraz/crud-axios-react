import './App.css'
import { useState, useEffect } from 'react'
import axios from "axios"
import { Button, TextField } from '@mui/material';
import { TaskListProps } from './types/taskList';



function App() {
      
  const [tasks, setTasks] = useState<TaskListProps[]>([]);

  const [taskName, setTaskName] = useState("")
  const [description, setDescription] = useState("") 
  const [saveTask, setSaveTask] = useState(false)

  const [editMode, setEditMode] = useState(false);

  function cleanInputs () {
    setTaskName("")
    setDescription("")
  }
  // POST  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios.post("https://641217d66e3ca31753068388.mockapi.io/fakeTasks", {
      taskName, 
      description,
    })
    .then(res => {
      console.log("POST FEITO")
      setSaveTask(true)
    })

    cleanInputs()
}

  // GET 
  useEffect(() => {
      axios.get("https://641217d66e3ca31753068388.mockapi.io/fakeTasks")
      .then(res => setTasks(res.data))
        .catch(error => console.log(error))
  }, [saveTask])

       
  // DELETE
   const handleDeletTask = (id: number) =>   {
      axios.delete(`https://641217d66e3ca31753068388.mockapi.io/fakeTasks/${id}`)
     .then(() => { setTasks(tasks.filter(tasks => tasks.id !== id)) })
     .catch(error =>console.error(error))
    }

    // Path
    // setTasks((tasks) => {
    //   return tasks.map((task) => {
    //     if (task.id === id) {
    //       return { ...task, ...response.data };
    //     }
    //     return task;
    //   });
    // });
    


    const handleEdit = (id: number) => {
      
      axios.put(`https://641217d66e3ca31753068388.mockapi.io/fakeTasks/${id}`, {
        taskName,
        description,
      })
      
      .then((res) => {
        setTasks((tasks) => {
          return tasks.map((item) => {
            if (item.id === id) { 
            return {...item, ...res.data}
          } 
          return item;
          })
        })
        
        cleanInputs()

      }).catch((error) => {
        console.log(error);
      });
    };
  
    
     
 

  return (
    <div className="App">
  
      <div className="criarElemento">
          <h1>Tarefas</h1>
          <form onSubmit={handleSubmit}> 

            <TextField
              id="outlined-multiline-flexible"
              label="Task Name"
              multiline
              maxRows={4}
              name="taskName"
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
            /> 
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              maxRows={4}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name="description"
            /> 

            <Button variant="outlined" type="submit">Salvar</Button>   

          </form>
      </div>
    
      <ul>
            {tasks.map((task: TaskListProps) => {
              return (
                <li key={task.id}>
                <h2> {task.taskName} </h2>
                <p> {task.description} </p>

                <Button onClick={() => handleEdit(task.id ? task.id : 0)}> EDITAAAAAAR</Button>

                <Button onClick={() => handleDeletTask(task.id ? task.id : 0)}>Delete</Button>

                </li>
              )
            })} 
      </ul>
      
    </div>
  )
}

export default App

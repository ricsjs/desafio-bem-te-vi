import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button, Input, Label, TextField } from "react-aria-components";
import { withAuthProtection } from "../components/privateRoute";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllTasksData } from "../utils/tasks/api";

export const meta: MetaFunction = () => {
  return [
    { title: "Home - Tasks" },
    { name: "description", content: "Home - Tasks" },
  ];
};

export interface TaskProps {
  id: string;
  name: string;
  description: string;
  status: string;
  userId: string;
}

function Home() {
  const { user } = useContext(AuthContext);
  const [tasksData, setTasksData] = useState<TaskProps[]>([]);
  
  const userId = user;

  const getAllTasks = async () => {
     try {
       getAllTasksData(userId).then((response) => {
        if (response.tasks.length == 0) {
          console.log("Nenhum registro");
        } 
        setTasksData(response.tasks);
       })
     } catch(error) {
      console.log(error)
     }
   }

   useEffect(() => {
    if (userId) {
      getAllTasks();
    }
   }, [userId]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search:", event.target.value);
  };

  const handleDelete = (id: string) => {
    console.log("Delete task with id:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit task with id:", id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-4xl p-8 bg-white rounded-xl shadow-lg dark:bg-gray-800">
        <div className="flex justify-between items-center mb-6">
          <TextField className="w-full max-w-sm">
            <Label className="sr-only">Buscar tarefas</Label>
            <Input
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Buscar tarefas..."
              onChange={handleSearch}
            />
          </TextField>
          <Link to="/add-task">
            <Button className="ml-4 p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-800 dark:hover:bg-blue-700">
              Nova Tarefa
            </Button>
          </Link>
        </div>

        <ul className="space-y-4">
          {tasksData.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {task.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {task.description}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    className="p-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onPress={() => handleEdit(task.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="p-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    onPress={() => handleDelete(task.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default withAuthProtection(Home);

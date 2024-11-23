import { MetaFunction } from "@remix-run/node";
import { Button, Dialog, DialogTrigger, Heading, Input, Label, Modal, TextField } from "react-aria-components";
import { withAuthProtection } from "../components/privateRoute";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { createTask, deleteTask, getAllTasksData, getTaskById, updateTask } from "../utils/tasks/api";
import { toast } from "react-toastify";

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

export interface TaskStatus {
  PENDING: string;
  IN_PROGRESS: string;
  COMPLETED: string;
  CANCELLED: string;
}

const taskStatusMapping: { [key in keyof TaskStatus]: string } = {
  PENDING: "Pendente",
  IN_PROGRESS: "Em progresso",
  COMPLETED: "Completa",
  CANCELLED: "Cancelada",
};

function Home() {
  const { user } = useContext(AuthContext);
  const [tasksData, setTasksData] = useState<TaskProps[]>([]);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState<keyof TaskStatus>("PENDING");

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as keyof TaskStatus;
    setTaskStatus(newStatus);
  };

  const displayStatus = taskStatusMapping[taskStatus] || "Desconhecido";

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const userId = user;

  const getAllTasks = async () => {
    try {
      getAllTasksData(userId).then((response) => {
        if (response.tasks.length == 0) {
          toast.info("Nenhum registro encontrado!");
        }
        setTasksData(response.tasks);
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userId) {
      getAllTasks();
    }
  }, [userId]);

  async function handleCreateTask() {
    if (!taskName || !taskDescription) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const taskData = {
        userId,
        name: taskName,
        description: taskDescription,
      }

      const response = await createTask(taskData);
      if (response.success) {
        setTaskName("");
        setTaskDescription("");
        getAllTasks();
      }
    } catch (error) {
      window.location.reload();
      console.error("Erro ao criar tarefa:", error);
      toast.error("Erro ao criar a tarefa. Tente novamente mais tarde!");
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Search:", event.target.value);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    toast.success("Tarefa deletada com sucesso!");
    getAllTasks();
  };

  const handleUpdate = async (id: string) => {
    try {
      if (isEditing) {
        const taskData = {
          userId,
          id,
          name: taskName,
          description: taskDescription,
          status: taskStatus,
        };

        const updateResponse = await updateTask(taskData.id, taskData);
        if (updateResponse.success && updateResponse.task) {
          setEditModalOpen(false);
          getAllTasks();
        } else {
          window.location.reload();
        }
      } else {
        const response = await getTaskById(id);
        if (!response.task) {
          toast.info("Nenhum registro encontrado!");
          return;
        }
        const task = response.task;

        setTaskName(task.name);
        setTaskDescription(task.description);
        setTaskStatus(task.status as keyof TaskStatus);
        setEditModalOpen(true);
        setIsEditing(true);
      }
    } catch (error) {
      window.location.reload();
      console.error(error);
    }
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
          <DialogTrigger>
            <Button
              onPress={() => setCreateModalOpen(true)}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Nova Tarefa
            </Button>
            <Modal
              isDismissable isOpen={isCreateModalOpen} onOpenChange={setCreateModalOpen}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <Dialog className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <form onSubmit={handleCreateTask}>
                  <Heading
                    slot="title"
                    className="mb-4 text-lg font-bold text-gray-900 dark:text-white"
                  >
                    Nova Tarefa
                  </Heading>
                  <TextField className="mb-4">
                    <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nome da tarefa:
                    </Label>
                    <Input
                      onChange={(e) => setTaskName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </TextField>
                  <TextField className="mb-4">
                    <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Descrição:
                    </Label>
                    <Input
                      onChange={(e) => setTaskDescription(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </TextField>
                  <div className="flex justify-between mt-4 space-x-4">
                    <Button
                      type="submit"
                      className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Criar Tarefa
                    </Button>
                    <Button
                      slot="close"
                      className="flex-1 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Fechar
                    </Button>
                  </div>
                </form>
              </Dialog>
            </Modal>
          </DialogTrigger>
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
                    Descrição:{" "}
                    {task.description}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Status:{" "}
                    {displayStatus}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <DialogTrigger>
                    <Button
                      className="p-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      onPress={() => handleUpdate(task.id)}
                    >
                      Editar
                    </Button>
                    <Modal
                      isDismissable
                      isOpen={isEditModalOpen}
                      onOpenChange={setEditModalOpen}
                      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    >
                      <Dialog className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          handleUpdate(task.id);
                        }}>
                          <Heading
                            slot="title"
                            className="mb-4 text-lg font-bold text-gray-900 dark:text-white"
                          >
                            Editar Tarefa
                          </Heading>

                          <TextField className="mb-4">
                            <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Nome da tarefa:
                            </Label>
                            <Input
                              value={taskName}
                              onChange={(e) => setTaskName(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </TextField>

                          <TextField className="mb-4">
                            <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Descrição:
                            </Label>
                            <Input
                              value={taskDescription}
                              onChange={(e) => setTaskDescription(e.target.value)}
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </TextField>

                          <Label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Status:
                          </Label>
                          <select
                            value={taskStatus}
                            onChange={handleStatusChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          >
                            <option value="PENDING">Pendente</option>
                            <option value="IN_PROGRESS">Em progresso</option>
                            <option value="COMPLETED">Completa</option>
                            <option value="CANCELLED">Cancelada</option>
                          </select>

                          <div className="flex justify-between mt-4 space-x-4">
                            <Button
                              type="submit"
                              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              Salvar
                            </Button>
                            <Button
                              slot="close"
                              className="flex-1 px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                              Fechar
                            </Button>
                          </div>
                        </form>
                      </Dialog>
                    </Modal>

                  </DialogTrigger>

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

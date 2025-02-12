import { useEffect, useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔥 BUSCA AS TAREFAS QUANDO O USUÁRIO ESTIVER LOGADO
  useEffect(() => {
    const fetchTasks = async () => {
      if (auth?.token) {
        setLoading(true);
        try {
          const response = await api.get("tasks/", {
            headers: { Authorization: `Bearer ${auth.token}` },
          });
          setTasks(response.data);
        } catch (error) {
          console.error("Erro ao carregar tarefas:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchTasks();
  }, [auth?.token]);

  // 🔥 ADICIONA UMA NOVA TAREFA
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await api.post(
        "tasks/",
        { title: newTask, description: "Detalhes da tarefa", completed: false },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );

      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // 🔥 DELETA UMA TAREFA
  const deleteTask = async (id: number) => {
    try {
      await api.delete(`tasks/${id}/`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  // 🔥 ABRE O MODAL DE EDIÇÃO
  const openEditModal = (task: Task) => {
    setEditedTask(task);
    setEditModal(true);
  };

  // 🔥 FECHA O MODAL DE EDIÇÃO
  const closeEditModal = () => {
    setEditedTask(null);
    setEditModal(false);
  };

  // 🔥 SALVA AS ALTERAÇÕES NA TAREFA
  const saveTaskEdit = async () => {
    if (!editedTask || !auth) return;

    try {
      const response = await api.put(
        `tasks/${editedTask.id}/`,
        {
          title: editedTask.title,
          description: editedTask.description,
          completed: editedTask.completed,
        },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editedTask.id ? response.data : task
        )
      );

      closeEditModal();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  // 🔥 FAZ O LOGOUT
  const logout = () => {
    auth?.logout();
    navigate("/"); // Redireciona para a tela de login
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* TOPO COM BOTÃO DE LOGOUT */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Minhas Tarefas</h2>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

      {/* FORMULÁRIO PARA ADICIONAR NOVA TAREFA */}
      <form onSubmit={addTask} className="flex gap-2">
        <input
          type="text"
          placeholder="Nova Tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 flex-1"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Adicionando..." : "Adicionar"}
        </button>
      </form>

      {/* LISTA DE TAREFAS */}
      {loading ? (
        <p className="mt-4 text-gray-500">Carregando tarefas...</p>
      ) : (
        <ul className="mt-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between border-b p-2"
            >
              <span>{task.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(task)}
                  className="text-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 🔥 MODAL DE EDIÇÃO */}
      {editModal && editedTask && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Editar Tarefa</h3>
            <input
              type="text"
              className="border p-2 w-full mb-2"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
            <textarea
              className="border p-2 w-full mb-2"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={closeEditModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={saveTaskEdit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;

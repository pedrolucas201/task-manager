import { useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // ✅ Garante um estado válido para erro

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // ✅ Resetando erro antes da tentativa de login

    if (!username || !password) {
      setError("Preencha todos os campos!");
      return;
    }

    try {
      await auth?.login({ username, password });
      navigate("/tasks"); // ✅ Redireciona para a página de tarefas
    } catch (error: any) {
      console.error("Erro no login:", error);

      if (error.response) {
        console.log("Resposta da API:", error.response); // 🔍 Debugando a resposta do servidor

        if (error.response.status === 401) {
          setError("Usuário ou senha incorretos! Verifique e tente novamente.");
        } else {
          setError(error.response?.data?.detail || "Erro ao conectar com o servidor.");
        }
      } else {
        setError("Erro inesperado. Verifique sua conexão.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {/* ✅ Exibição garantida da mensagem de erro */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 mb-3 text-center rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">
          Entrar
        </button>
        <p className="text-center mt-4">
          Não tem uma conta?{" "}
          <a href="/register" className="text-blue-500">Crie uma agora!</a>
        </p>
      </form>
    </div>
  );
};

export default Login;

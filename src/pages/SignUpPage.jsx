import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/Users";
import Alert from "../animations/alert";
import PasswordStrengthMeter from "../components/ui/PassStrengthMeter";
import { Eye, EyeOff } from "lucide-react";
const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const navigate = useNavigate();
    const [alertInfo, setAlertInfo] = useState({ show: false, type: "", message: "" });

    const addUser = useUserStore((state) => state.addUser);

    const handleSignUp = (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setAlertInfo({ show: true, type: "noData", message: "Todos os campos são obrigatórios." });
            return;
        }

        const newUser = addUser(username, email, password);

        if (!newUser) {
            setAlertInfo({ show: true, type: "userExists", message: "Usuário ou e-mail já cadastrado." });
            return;
        }

        setAlertInfo({ show: true, type: "success", message: "Cadastro realizado com sucesso!" });

        setTimeout(() => {
            navigate("/home");
        }, 1500);
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br relative from-[#131313] to-[#1f1f1f]">
            {alertInfo.show && (
                <Alert
                    type={alertInfo.type}
                    message={alertInfo.message}
                    onClose={() => setAlertInfo(prev => ({ ...prev, show: false }))}
                />
            )}
            <div className="w-[30rem] bg-gray-200/8 rounded-2xl backdrop-filter backdrop-blur-xl flex flex-col items-center p-8">
                <form onSubmit={handleSignUp} className="flex flex-col items-center w-full">
                    <h1 className="text-3xl text-white p-1 mb-8">
                        Sign Up
                    </h1>
                    <div className="w-full text-white flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="username">Crie um nome de usuário:</label>
                            <input
                                type="text"
                                placeholder="JohnSmith123..."
                                id="username"
                                className="bg-[#101010]/90 border border-gray-600 p-2 rounded-3xl focus:outline-none focus:bg-white focus:text-black focus:placeholder:text-black transition-colors"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                placeholder="email@example.com..."
                                id="email"
                                className="bg-[#101010]/90 border border-gray-600 p-2 rounded-3xl focus:outline-none focus:bg-white focus:text-black focus:placeholder:text-black transition-colors"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="flex flex-col relative">
                            <label htmlFor="pass">Crie uma senha:</label>
                            <input
                                type={isVisible ? "text" : "password"}
                                placeholder="senha..."
                                id="pass"
                                className="bg-[#101010]/90 border border-gray-600 p-2 rounded-3xl focus:outline-none focus:bg-white focus:text-black focus:placeholder:text-black transition-colors"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <button type="button" onClick={() => setIsVisible(!isVisible)} className="absolute right-3 top-[34px] text-gray-400 hover:text-white">
                                {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                            <PasswordStrengthMeter password={password} />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#0e0e0e] border border-gray-600 text-white hover:bg-white hover:text-black transition-colors duration-300 p-2 mt-4 rounded-3xl w-full font-semibold"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
                <div className="w-full mt-4 pt-4 border-t border-gray-600 text-center">
                    <span className="text-gray-400">
                        Já tem uma conta?{" "}
                        <a
                            className="cursor-pointer font-semibold text-white hover:text-cyan-400 transition-colors duration-200"
                            onClick={() => navigate("/")}
                        >
                            Faça o login!
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
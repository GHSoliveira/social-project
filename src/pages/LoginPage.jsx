import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../animations/alert";
import { useUserStore } from "../store/Users";
import { Eye, EyeClosed } from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false)

    const [alert, setAlert] = useState({
        show: false,
        type: "",
        where: "",
    });

    const login = useUserStore((state) => state.login);
    const whoIsLogged = useUserStore((state) => state.whoIsLogged);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setAlert({ show: true, type: "noData", where: "login" });
            return;
        }

        const success = login(email, password);

        if (success) {
            setAlert({ show: true, type: "success", where: "login" });
            navigate("/home");
        } else {
            setAlert({ show: true, type: "fail", where: "login" });
        }

        setEmail("");
        setPassword("");
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br relative from-[#131313] to-[#1f1f1f]">
            {alert.show && (
                <Alert
                    type={alert.type}
                    where={alert.where}
                    onClose={() => setAlert({ ...alert, show: false })}
                />
            )}
            <div className="w-[30rem] bg-gray-200/8 rounded-2xl backdrop-filter backdrop-blur-xl flex flex-col items-center p-8">
                <form onSubmit={handleLogin} className="flex flex-col items-center w-full">
                    <h1 className="text-3xl bg-white bg-clip-text text-transparent p-1 mb-8">
                        LogIn
                    </h1>
                    <div className="w-full text-[#ffffff] flex flex-col gap-4">
                        <div className="flex flex-col ">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                placeholder="email@example.com..."
                                id="email"
                                className="bg-[#101010]/9 border-1 border-gray-600 p-2 rounded-3xl focus:outline-none focus:bg-white focus:text-black focus:placeholder:text-black"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="pass">Password:</label>
                            <input
                                type={isVisible ? "text" : "password"}
                                placeholder="password..."
                                id="pass"
                                className="bg-[#101010]/9 border-1 border-gray-600 p-2 rounded-3xl focus:outline-none focus:bg-white focus:text-black focus:placeholder:text-black"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <div className="h-8 w-full flex justify-between items-center">
                                <button type="button" onClick={() => setIsVisible(!isVisible)}>{isVisible ? <Eye /> : <EyeClosed />}</button>
                                <span className="">
                                    Não tem uma conta?{" "}
                                    <a
                                        className="cursor-pointer text-[#afafaf] hover:text-white transition-colors duration-200"
                                        onClick={() => {
                                            navigate("/signup");
                                        }}
                                    >
                                        cadastre-se!
                                    </a>
                                </span>
                            </div>

                        </div>
                        <button
                            className="bg-[#0e0e0e] border-1 border-gray-600 text-white hover:bg-white hover:text-black transition-colors duration-300 p-2 mt-4 rounded-3xl"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <button
                    className="bg-[#0e0e0e] text-white w-full border-1 border-gray-600 hover:bg-white hover:text-black transition-colors duration-300 p-2 mt-4 rounded-3xl"
                    type="button"
                    onClick={() => {
                        navigate("/home");
                        useUserStore.getState().logout();
                    }}
                >
                    Entrar como convidado
                </button>
            </div>
        </div>
    );
};

export default LoginPage;

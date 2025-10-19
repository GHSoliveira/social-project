import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { usePostStore } from "../store/Posts";
import { useUserStore } from "../store/Users";
import { configurations } from "../config/Configurations";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import MostLiked from "../components/posts/MostLiked";
import Feed from "../components/posts/Feed";
import Alert from "../animations/Alert";

const Homepage = () => {
    const posts = usePostStore((state) => state.posts);
    const { whoIsLogged, isLoggedIn } = useUserStore();
    const navigate = useNavigate();

    const [alert, setAlert] = useState({ show: false, type: "", where: "", message: "" });

    return (
        <div className="h-screen w-screen relative bg-gradient-to-br overflow-hidden from-[#111111] to-[#1f1f1f] flex">
            {alert.show && (
                <Alert
                    type={alert.type}
                    where={alert.where}
                    message={alert.message}
                    onClose={() => setAlert({ ...alert, show: false })}
                />
            )}

            <Sidebar isLogged={isLoggedIn} configs={configurations.home.options} />

            <div className="w-full flex flex-col">
                <Header where={"Homepage"} user={whoIsLogged} isLogged={isLoggedIn} />
                <main className="w-full h-full flex min-h-0">
                    <div className="w-full h-full flex flex-col overflow-y-scroll">
                        <div className="w-full h-fit p-4 min-w-0 flex flex-col">
                            <MostLiked content={posts} />
                        </div>
                        <Feed content={posts} />
                    </div>

                    <div className="w-[15%] h-full relative">
                        <button
                            className="bg-[#0f0f0f] text-white border border-gray-600 hover:bg-white hover:text-black transition-colors duration-300 absolute bottom-8 right-8 w-16 h-16 flex justify-center items-center cursor-pointer rounded-full shadow-lg"
                            onClick={() => {
                                isLoggedIn
                                    ? navigate("/post")
                                    : setAlert({
                                        show: true,
                                        type: "fail",
                                        message: "Você precisa fazer login para criar um post."
                                    });
                            }}
                        >
                            <Plus />
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Homepage;
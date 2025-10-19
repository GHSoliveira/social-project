import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../store/Posts";
import { useUserStore } from "../store/Users";
import { configurations } from "../config/Configurations";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import ImagePreviewer from "../components/ui/ImagePreviewer";
import Alert from "../animations/Alert";

const CreatePost = () => {
    const { whoIsLogged, isLoggedIn } = useUserStore();
    const addPost = usePostStore((state) => state.addPost);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [alert, setAlert] = useState({ show: false, type: "", where: "" });

    const handlePostCreation = () => {
        if (!title.trim() || !content.trim()) {
            setAlert({ show: true, type: "noData", where: "global" });
            return;
        }

        addPost(title, content, image, whoIsLogged);
        navigate('/home');
    };

    return (
        <div className="flex w-screen h-screen overflow-hidden bg-gradient-to-br from-[#111111] to-[#1f1f1f]">
            {alert.show && <Alert type={alert.type} where={alert.where} onClose={() => setAlert({ show: false })} />}
            <Sidebar
                configs={configurations.postCreation.options}
                isLogged={isLoggedIn}
            />
            <div className="flex w-full flex-col">
                <Header where='Criação de Post' user={whoIsLogged} isLogged={isLoggedIn} />
                <main className="h-fit w-fit p-8">
                    <div className="w-full h-full bg-gradient-to-br flex gap-8 bg-[#0f0f0f] border-1 border-gray-600 rounded-2xl p-8">
                        <div>
                            <div className="flex flex-col text-white">
                                <label htmlFor="title">Título do post:</label>
                                <input
                                    type="text"
                                    placeholder="digite o titulo..."
                                    id="title"
                                    className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#1a1a1a] transition-colors duration-300 focus:outline-none bg-transparent text-white placeholder:text-gray-400 w-xl p-2 rounded-3xl"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>
                            <div className="flex flex-col text-white mt-4">
                                <label htmlFor="content">Conteúdo do post:</label>
                                <textarea
                                    rows={6}
                                    cols={10}
                                    placeholder="digite o conteúdo do seu post..."
                                    id="content"
                                    className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] hover:from-[#2a2a2a] hover:to-[#1a1a1a] transition-colors duration-300 focus:outline-none bg-transparent text-white placeholder:text-gray-400 w-xl p-2 rounded-3xl"
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between">
                            <ImagePreviewer onChange={setImage} value={image} size={64} />
                            <button className="bg-gradient-to-r from-[#0f0f0f] to-[#0f0f0f] border-1 border-gray-600 hover:bg-gradient-to-r hover:from-white hover:to-white transition-colors duration-300 text-white p-2 mt-8 w-xl rounded-3xl hover:text-black"
                                type="button"
                                onClick={handlePostCreation}
                            >
                                Criar post
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CreatePost;
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { User, X, Edit3 } from "lucide-react";
import { useUserStore } from "../store/Users";
import { usePostStore } from "../store/Posts";
import ImagePreviewer from "../components/ui/ImagePreviewer";
import Alert from "../animations/Alert";

const ModalConfig = ({ onClose, onSuccess }) => {
    const { whoIsLogged, updateProfilePicture } = useUserStore();
    const [picture, setPicture] = useState(whoIsLogged?.profilePicture || "");
    const [alert, setAlert] = useState({ show: false, type: "", where: "" });

    const handleUpdatePic = () => {
        if (!picture.trim()) {
            setAlert({ show: true, type: 'noData', where: 'global', message: 'Por favor, insira um link para a imagem.' });
            return;
        }
        updateProfilePicture(picture);
        onSuccess("Foto de perfil alterada com sucesso!");
        onClose();
    };

    return (
        <div className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center bg-gray-800/60 z-50">
            {alert.show && <Alert type={alert.type} where={alert.where} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />}
            <div className="w-auto h-auto rounded-3xl bg-gradient-to-r relative p-8 from-[#0f0f0f] to-[#1e1e1e] border border-gray-600 shadow-lg">
                <button
                    className="absolute top-4 right-4 rounded-full bg-gray-700 hover:bg-red-500 text-white p-2 transition-colors"
                    onClick={onClose}
                >
                    <X />
                </button>
                <div className="flex flex-col gap-6 items-center">
                    <h2 className="text-2xl text-white font-bold mb-2">Alterar Foto de Perfil</h2>
                    <ImagePreviewer onChange={setPicture} value={picture} size={"64"} />
                    <button
                        className="p-3 border-2 border-white w-[20rem] rounded-full text-white hover:bg-white hover:text-gray-700 transition-colors duration-300 font-semibold"
                        onClick={handleUpdatePic}
                    >
                        Salvar Alteração
                    </button>
                </div>
            </div>
        </div>
    );
};


const Profile = () => {
    const [openModal, setOpenModal] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: "", where: "", message: "" });

    const { whoIsLogged, isLoggedIn } = useUserStore();
    const { posts } = usePostStore();
    const navigate = useNavigate();

    const userStats = useMemo(() => {
        if (!isLoggedIn) return { postCount: 0, likesGivenCount: 0, commentsMadeCount: 0 };

        const postCount = posts.filter(post => post.user.username === whoIsLogged.username).length;

        const likesGivenCount = posts.reduce((acc, post) => {
            return acc + (post.upvotedBy.includes(whoIsLogged.email) ? 1 : 0);
        }, 0);

        const commentsMadeCount = posts.reduce((acc, post) => {
            return acc + post.comments.filter(comment => comment.user.username === whoIsLogged.username).length;
        }, 0);

        return { postCount, likesGivenCount, commentsMadeCount };
    }, [posts, whoIsLogged, isLoggedIn]);

    const showSuccessAlert = (message) => {
        setAlert({ show: true, type: 'success', where: 'global', message });
    };

    if (!isLoggedIn) {
        navigate("/");
        return null;
    }

    return (
        <div className="w-screen h-screen relative bg-gradient-to-r from-[#0f0f0f] to-[#1e1e1e] flex justify-center">
            {alert.show && <Alert type={alert.type} where={alert.where} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />}
            {openModal && <ModalConfig onClose={() => setOpenModal(false)} onSuccess={showSuccessAlert} />}

            <div className="h-full w-full max-w-4xl p-4 border-l-2 border-r-2 border-gray-700 bg-[#0f0f0f] flex flex-col gap-6 items-center">
                <div className="relative">
                    <div className="h-64 w-64 p-1.5 rounded-full bg-gradient-to-r from-cyan-800 to-cyan-500">
                        <img
                            className="w-full h-full rounded-full object-cover object-center border-4 border-[#0f0f0f]"
                            src={whoIsLogged.profilePicture}
                            alt="Foto de Perfil"
                        />
                    </div>
                    <button
                        onClick={() => setOpenModal(true)}
                        className="absolute bottom-4 right-4 bg-gray-800/80 p-3 rounded-full text-white hover:bg-cyan-500 transition-colors duration-300 border border-gray-600"
                    >
                        <Edit3 size={20} />
                    </button>
                </div>

                <div className="w-full h-fit flex items-center flex-col gap-2 p-2 text-center">
                    <h1 className="text-4xl text-cyan-400 font-bold">{whoIsLogged?.username}</h1>
                    <h2 className="text-2xl text-emerald-400 font-semibold">{whoIsLogged?.role}</h2>
                    <p className="text-gray-400 mt-2 max-w-lg">{whoIsLogged.bio}</p>
                </div>

                <div className="w-full max-w-md bg-gray-900/50 p-4 rounded-xl border border-gray-700 flex justify-around text-white">
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-cyan-400">{userStats.postCount}</span>
                        <span className="text-gray-400">Posts</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-emerald-400">{userStats.likesGivenCount}</span>
                        <span className="text-gray-400">Likes Dados</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-2xl font-bold text-blue-400">{userStats.commentsMadeCount}</span>
                        <span className="text-gray-400">Comentários</span>
                    </div>
                </div>

                <div className="mt-auto mb-4">
                    <button
                        className="text-white border-2 p-2 w-[10rem] rounded-2xl hover:bg-white hover:text-gray-700 transition-colors duration-300 font-semibold"
                        onClick={() => navigate("/home")}
                    >
                        Retornar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
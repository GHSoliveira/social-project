
import { useState } from "react";
import { X } from "lucide-react";
import { useUserStore } from "../../store/Users";
import { usePostStore } from "../../store/Posts";
import ImagePreviewer from "../ui/ImagePreviewer";

const ModalEdition = ({ post, onClose, onShowAlert }) => {
    const { whoIsLogged } = useUserStore();
    const updatePost = usePostStore((state) => state.updatePost);

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.image);

    const handleEditPost = () => {
        if (whoIsLogged.username !== post.user.username) {
            onShowAlert('notAllowed', 'global', 'Você só pode editar seus próprios posts.');
            return;
        }

        if (!title.trim() || !content.trim()) {
            onShowAlert('noData', 'global', 'Título e conteúdo não podem estar vazios.');
            return;
        }

        updatePost(post.id, { title, content, image });
        onShowAlert('success', 'global', 'Post atualizado com sucesso!');
        onClose();
    };

    return (
        <div className="absolute top-0 left-0 h-full w-full bg-[#1a1a1a]/80 backdrop-blur-xl p-4 z-40 rounded-2xl flex items-center justify-center gap-8">
            <div className="w-auto h-auto bg-gradient-to-br from-[#111111] to-[#1f1f1f] border border-gray-600 p-8 rounded-2xl flex gap-8 relative">
                <button className="absolute top-4 right-4 bg-gray-700 rounded-full p-2 hover:bg-red-500 transition-colors" onClick={onClose}>
                    <X />
                </button>

                <div className="flex flex-col">
                    <div className="flex flex-col text-white">
                        <label htmlFor="title" className="mb-2">Título do post:</label>
                        <input
                            type="text"
                            id="title"
                            className="bg-gradient-to-r from-[#111111] to-[#2a2a2a] focus:outline-none text-white w-96 p-2 rounded-3xl border border-gray-600"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col text-white mt-4">
                        <label htmlFor="content" className="mb-2">Conteúdo do post:</label>
                        <textarea
                            id="content"
                            rows={6}
                            className="bg-gradient-to-r from-[#111111] to-[#2a2a2a] focus:outline-none text-white w-96 p-2 rounded-3xl border border-gray-600"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between">
                    <ImagePreviewer onChange={setImage} value={image} size={'48'} />
                    <button
                        className="bg-gradient-to-r from-[#3778f1] to-[#0648ac] hover:from-[#355ca3] hover:to-[#658dd6] transition-colors duration-300 text-white p-2 mt-4 w-full rounded-3xl"
                        type="button"
                        onClick={handleEditPost}
                    >
                        Salvar Edição
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEdition;

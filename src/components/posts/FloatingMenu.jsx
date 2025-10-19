import { MoreHorizontal, Trash2, Edit3 } from "lucide-react";
import { useState } from "react";
import { usePostStore } from "../../store/Posts";
import { useUserStore } from "../../store/Users";
import { allRoles } from "../../config/setHierarchy";

const FloatingMenu = ({ post, postId, openModal, onActionDisallowed }) => {
    const [open, setOpen] = useState(false);
    const [isConfirmingDelete, setConfirmingDelete] = useState(false);
    const deletePost = usePostStore((state) => state.deletePost);
    const { whoIsLogged, isLoggedIn } = useUserStore();

    const handleDelete = () => {
        if (!isLoggedIn) {
            onActionDisallowed("Usuário deslogado");
            return;
        }

        const adminRoles = allRoles.find((obj) => obj.adminRoles)?.adminRoles || [];
        const isAdmin = adminRoles.includes(whoIsLogged.role);
        const isOwner = whoIsLogged.username === post.user.username;

        if (!isAdmin && !isOwner) {
            onActionDisallowed("Você não tem permissão para realizar essa ação");
            setOpen(false);
            return;
        }

        if (isConfirmingDelete) {
            deletePost(postId);
            setOpen(false);
            setConfirmingDelete(false);
        } else {
            setConfirmingDelete(true);
        }
    };

    const handleOpenMenu = () => {
        setOpen(!open);
        if (open) {
            setConfirmingDelete(false);
        }
    }

    return (
        <div className="relative inline-block text-left">
            <button onClick={handleOpenMenu}>
                <MoreHorizontal className="cursor-pointer hover:text-gray-400" />
            </button>

            {open && (
                <div className="absolute right-0 w-48 origin-top-right rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1 text-white">
                        <button className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-700"
                            onClick={() => {
                                openModal();
                                setOpen(false);
                            }}
                        >
                            <Edit3 size={18} /> Editar
                        </button>
                        <button
                            className={`flex items-center gap-2 px-4 py-2 w-full transition-colors duration-200 ${isConfirmingDelete ? 'bg-red-700 hover:bg-red-600' : 'hover:bg-gray-700'}`}
                            onClick={handleDelete}
                        >
                            <Trash2 size={18} className="text-red-400" /> {isConfirmingDelete ? 'Confirmar?' : 'Deletar'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FloatingMenu;
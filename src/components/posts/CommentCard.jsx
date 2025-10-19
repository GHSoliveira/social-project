import { useState } from "react";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import FloatingMenuComment from "./FloatingMenuComment";
import Alert from "../../animations/alert";

const CommentCard = ({ postId, comment }) => {
    const { user, content, id } = comment;
    const [alert, setAlert] = useState({ show: false, type: "", where: "" });

    const handleNotImplemented = () => {
        setAlert({ show: true, type: 'warning', where: 'global', message: 'Funcionalidade ainda não implementada!' });
    };

    return (
        <div className="bg-gray-600/60 p-3 border-2 border-gray-500 backdrop-blur-2xl rounded-3xl w-full h-fit mb-4">
            {alert.show && <Alert type={alert.type} where={alert.where} message={alert.message} onClose={() => setAlert({ show: false })} />}
            <header className="flex justify-between w-full items-start">
                <div className="flex gap-3 w-fit h-fit">
                    <img src={user.profilePicture} className="h-12 w-12 rounded-full object-cover" alt={user.username} />
                    <div className="flex flex-col leading-tight">
                        <span className="text-xl text-white">{user.username}</span>
                        <span className="text-xs text-emerald-300">{user.role}</span>
                    </div>
                </div>
                <FloatingMenuComment postId={postId} commentId={id} commentUser={user} onNotImplemented={handleNotImplemented} />
            </header>
            <main className="p-4">
                <p className="text-gray-200 break-words">{content}</p>
            </main>
            <footer className="flex text-gray-300 gap-4 justify-end">
                <ThumbsUp size={18} className="hover:text-emerald-400 cursor-pointer" onClick={handleNotImplemented} />
                <ThumbsDown size={18} className="hover:text-red-400 cursor-pointer" onClick={handleNotImplemented} />
                <MessageCircle size={18} className="hover:text-blue-400 cursor-pointer" onClick={handleNotImplemented} />
            </footer>
        </div>
    );
};

export default CommentCard;
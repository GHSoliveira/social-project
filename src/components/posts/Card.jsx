
import { ArrowRight, MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { usePostStore } from "../../store/Posts";
import FloatingMenu from "./FloatingMenu.jsx";
import { useUserStore } from "../../store/Users";
import Alert from "../../animations/alert.jsx";
import CommentsSection from "./CommentsSection";
import ModalEdition from "./ModalEdition";

export const MiniCard = ({ user, post }) => {
    return (
        <div className={`w-64 h-80 rounded-2xl overflow-hidden shrink-0 text-white border-1 border-gray-700 bg-gradient-to-r from-[#202020] to-[#2e2e2e] hover:bg-gradient-to-r hover:from-[#2e2e2e] hover:to-[#202020] transition-colors duration-300 text-justify cursor-pointer`}>
            <div
                className="w-full h-2/5 bg-gray-400"
                style={{ backgroundImage: `url(${post.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
            />
            <span className="w-full h-1/5 text-[1.5rem] block text-ellipsis whitespace-nowrap overflow-hidden pl-4 pr-4 pt-4">
                {post.title}
            </span>
            <span className="w-full h-1/5 block text-ellipsis whitespace-nowrap overflow-hidden pl-4 pr-4 text-gray-400">
                {post.content}
            </span>
            <div className="w-full h-1/5 flex gap-2 p-4 items-center">
                <div
                    className="h-12 w-12 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${user.profilePicture})` }}
                />
                <h1 className="text-lg text-start whitespace-nowrap text-ellipsis overflow-hidden text-[#22c55e]">{user.username}</h1>
            </div>
        </div>
    );
};

const SpanEdited = () => (
    <div className="absolute top-2 left-[50%] transform translate-x-[-50%]">
        <span className="text-gray-600 text-xs">(Post editado)</span>
    </div>
);

const FullCard = ({ post, user }) => {
    const { whoIsLogged, isLoggedIn } = useUserStore();
    const [comment, setComment] = useState("");
    const [openComments, setOpenComments] = useState(false);
    const [openChangeModal, setOpenChangeModal] = useState(false);

    const [alert, setAlert] = useState({ show: false, type: "", where: "" });

    const addComment = usePostStore((state) => state.addComment);
    const toggleUpvote = usePostStore((state) => state.toggleUpvote);
    const toggleDownvote = usePostStore((state) => state.toggleDownvote);

    const userEmail = whoIsLogged?.email;
    const hasUpvoted = post.upvotedBy.includes(userEmail);
    const hasDownvoted = post.downvotedBy.includes(userEmail);
    const score = post.upvotedBy.length - post.downvotedBy.length;

    const handleShowAlert = (type, where = 'global', message) => {
        setAlert({ show: true, type, where, message });
    };

    const setNewComment = () => {
        if (!isLoggedIn) {
            handleShowAlert('fail', 'global', 'Você precisa estar logado para comentar.');
            return;
        }
        if (!comment.trim()) {
            handleShowAlert('noData', 'global');
            return;
        }
        addComment(post.id, comment, whoIsLogged);
        setComment("");
    };

    return (
        <div className="w-full relative h-[30rem] rounded-2xl flex flex-col border border-gray-700 text-white bg-gradient-to-r from-[#202020] to-[#2e2e2e] transition-colors duration-300 mb-12">
            {openChangeModal && <ModalEdition post={post} onClose={() => setOpenChangeModal(false)} onShowAlert={handleShowAlert} />}
            {openComments && <CommentsSection postId={post.id} onClose={() => setOpenComments(false)} />}
            {post.isEdited && <SpanEdited />}
            {alert.show && <Alert type={alert.type} where={alert.where} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />}

            <div className="w-full h-[85%] p-2">
                <div className="w-full h-[3.5rem] flex items-center justify-between p-2">
                    <div className="flex gap-2 items-center">
                        <div className="h-12 w-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${user.profilePicture})` }} />
                        <div className="leading-tight">
                            <h1 className="text-xl text-green-600">{user.username}</h1>
                            <h3 className="text-xs text-emerald-300">{user.role}</h3>
                        </div>
                    </div>
                    {!openComments && (
                        <FloatingMenu post={post} postId={post.id} openModal={() => setOpenChangeModal(true)} onActionDisallowed={(msg) => handleShowAlert('notAllowed', 'global', msg)} />
                    )}
                </div>
                <div className="w-full h-[calc(100%-3.5rem)] flex">
                    <div className="w-[60%] flex flex-col gap-4 p-2 h-full">
                        <h1 className="text-3xl overflow-hidden text-ellipsis">{post.title}</h1>
                        <h3 className="text-gray-300 text-justify">{post.content}</h3>
                    </div>
                    <div className="w-[40%] flex justify-end p-2 h-full">
                        <div
                            className="w-full h-full rounded-3xl border-2 border-gray-600 bg-cover bg-center"
                            style={{ backgroundImage: `url(${post.image})` }}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full h-[15%] gap-3 px-4 flex items-center border-t border-gray-700">
                {isLoggedIn && (
                    <div className="flex gap-4 h-full items-center w-[50%]">
                        <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${whoIsLogged.profilePicture})` }} />
                        <input
                            type="text"
                            placeholder="Digite seu comentário..."
                            className="bg-gradient-to-r w-[80%] from-[#1a1a1a] to-[#2a2a2a] border-2 border-gray-600 p-2 rounded-3xl focus:outline-none"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            maxLength={100}
                        />
                        <button className="bg-[#0f0f0f] w-12 h-12 border border-gray-600 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors" onClick={setNewComment}>
                            <ArrowRight />
                        </button>
                    </div>
                )}
                <div className={`flex h-full ${isLoggedIn ? 'w-[50%]' : 'w-full'} justify-end items-center gap-8`}>
                    <div className="flex gap-2 items-center">
                        <button onClick={() => isLoggedIn && toggleUpvote(post.id, userEmail)} className={`cursor-pointer transition-colors duration-300 ${hasUpvoted ? "text-emerald-400" : "hover:text-emerald-400 text-white"}`} disabled={!isLoggedIn}><ThumbsUp /></button>
                        <span className="text-xl">{score}</span>
                        <button onClick={() => isLoggedIn && toggleDownvote(post.id, userEmail)} className={`cursor-pointer transition-colors duration-300 ${hasDownvoted ? "text-red-400" : "hover:text-red-400 text-white"}`} disabled={!isLoggedIn}><ThumbsDown /></button>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span>{post.comments.length ?? 0}</span>
                        <MessageCircle className="hover:text-blue-400 transition-colors duration-200 cursor-pointer" onClick={() => setOpenComments(!openComments)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const Card = ({ big, user, post }) => {
    return big ? <FullCard user={user} post={post} /> : <MiniCard user={user} post={post} />;
};

export default Card;
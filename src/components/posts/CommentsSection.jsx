import { X } from "lucide-react";
import { usePostStore } from "../../store/Posts";
import CommentCard from "./CommentCard";

const CommentsSection = ({ postId, onClose }) => {
    const postComments = usePostStore((state) => state.posts.find((p) => p.id === postId)?.comments) || [];

    return (
        <div className="absolute transition-opacity duration-300 right-2 top-2 flex p-4 flex-col items-center overflow-y-auto bg-gray-800/60 border-2 border-gray-600 backdrop-blur-2xl rounded-3xl w-[40%] h-[95%] z-30">
            <button className="absolute top-4 right-4 bg-gray-700 rounded-full p-1 hover:bg-red-500 transition-colors z-50" onClick={onClose}>
                <X size={20} />
            </button>
            <h2 className="text-white text-2xl mb-4 w-full text-center">Comentários</h2>

            <div className="w-full">
                {postComments.length === 0 ? (
                    <p className="text-gray-400 text-center mt-8">Nenhum comentário ainda.</p>
                ) : (
                    postComments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} postId={postId} />
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentsSection;
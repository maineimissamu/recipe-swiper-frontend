import {useState, useEffect} from 'react';
import {getComments, createComment, deleteComment} from '../services/comments.service';
import {useAuth} from '../context/AuthContext';

function Comments({recipeId}) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null);
    const {user} = useAuth();

    useEffect(() => {
        loadComments();
    }, [recipeId]);

    const loadComments = async () => {
        try {
            const commentsData = await getComments(recipeId);
            setComments(commentsData);
        } catch(err) {
            setError(err.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       if(!newComment.trim()) return;

        try {
            const commentData = await createComment(recipeId, newComment);
            setComments([commentData, ...comments]);
            setNewComment('');
        } catch(err) {
            setError(err.message);
        }
    }

    const handleDelete = async (commentId) => {
        try {
            await deleteComment(commentId);
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch(err) {
            setError(err.message);
        }
    }
    

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Submit
                </button>
            </form>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div className="space-y-4">
                {comments.map(comment => (
                    <div key={comment._id} className="bg-white p-4 rounded-md shadow-md">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">{comment.author.username}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                        {user && user._id === comment.author._id && (
                            <button onClick={() => handleDelete(comment._id)} className="text-red-500 hover:text-red-700">Delete</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comments;
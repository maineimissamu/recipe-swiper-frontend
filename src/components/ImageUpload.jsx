import { useState } from "react";
import { uploadImage } from "../utils/cloudinary";
import { IoCloudUpload, IoImage, IoClose } from "react-icons/io5";

function ImageUpload({onImageUploaded, currentImage}) {
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage || null);

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if(!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if(file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            return;
        }

        setIsUploading(true);

        try {
            const localPreview = URL.createObjectURL(file);
            setPreview(localPreview);

            const url = await uploadImage(file);

            onImageUploaded(url);

            URL.revokeObjectURL(localPreview);
            setPreview(url);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
            setPreview(null);
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setPreview(null);
        onImageUploaded('');
    }

    return (
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Image
        </label>
        
        {preview ? (
            <div className="relative">
                <img 
                    src={preview} 
                    alt="Recipe preview" 
                    className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                />
                <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                    <IoClose className="text-lg" />
                </button>
                {isUploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white mx-auto mb-2"></div>
                            <p>Uploading...</p>
                        </div>
                    </div>
                )}
            </div>
        ) :(
            <label className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <IoCloudUpload className="text-4xl mb-2" />
                    <p className="text-sm">Click to upload image</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading}
                />
            </label>
        )}
    </div>
);
}

export default ImageUpload;
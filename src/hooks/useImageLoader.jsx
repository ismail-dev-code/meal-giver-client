
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const useImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const uploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD_KEY}`;

    try {
      setUploading(true);
      const response = await axios.post(uploadUrl, formData);
      const url = response.data.data.url;
      setUploadedUrl(url);
      toast.success("Image uploaded successfully!");
      return url;
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed!");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, uploadedUrl, setUploadedUrl };
};

export default useImageUploader;
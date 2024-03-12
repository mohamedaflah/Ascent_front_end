// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadImageToCloudinary = async (imageFile:any) => {
  console.log("🚀 ~ uploadImageToCloudinary ~ imageFile:", imageFile)
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "ml_default");

  try {
    // 9d43f0bc549b13f9aed6c48d798762
    const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return ""; // Handle the error appropriately
  }
};

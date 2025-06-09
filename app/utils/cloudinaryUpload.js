export const uploadToCloudinary = async (file, folder) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Donation App");
  formData.append("folder", folder);

  const res = await fetch("https://api.cloudinary.com/v1_1/dhcqfjulx/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.secure_url;
};

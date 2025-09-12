import React, { useState } from "react";

export default function App() {
  const [image, setImage] = useState(null);
  const [enhanced, setEnhanced] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch("http://localhost:5000/enhance", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    setEnhanced(URL.createObjectURL(blob));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Photo Quality Enhance</h1>

      <input type="file" accept="image/*" onChange={handleUpload} />

      {loading && <p className="mt-4 text-blue-500 font-semibold">Enhancing...</p>}

      {image && (
        <div className="flex gap-6 mt-6">
          <div>
            <h2 className="text-lg font-semibold">Original</h2>
            <img src={image} alt="original" className="rounded shadow-md max-w-xs" />
          </div>

          {enhanced && (
            <div>
              <h2 className="text-lg font-semibold">Enhanced</h2>
              <img src={enhanced} alt="enhanced" className="rounded shadow-md max-w-xs" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

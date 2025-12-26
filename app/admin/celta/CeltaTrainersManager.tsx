"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Button from "@/components/Button";
import {
  listCeltaTrainers,
  createCeltaTrainer,
  updateCeltaTrainer,
  deleteCeltaTrainer,
  uploadTrainerPhoto,
  deleteTrainerPhoto,
  CeltaTrainer,
} from "@/lib/firebase/celtaTrainers";

export default function CeltaTrainersManager() {
  const [trainers, setTrainers] = useState<CeltaTrainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    titleLine: "",
    bio: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await listCeltaTrainers(false);
      setTrainers(data);
    } catch (err: any) {
      const errorMessage = err.message || "Unknown error";
      console.error("Error loading trainers:", err);
      
      if (errorMessage.includes("permission") || errorMessage.includes("Permission")) {
        setError(
          "Permission denied. Please ensure Firestore security rules include the 'celtaTrainers' collection."
        );
      } else {
        setError("Failed to load trainers: " + errorMessage);
      }
      setTrainers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.titleLine.trim() || !formData.bio.trim()) {
      setError("Please fill in all required fields (name, title line, bio).");
      return;
    }

    try {
      setUploading(true);

      if (editingId) {
        const updateData: any = {
          name: formData.name.trim(),
          titleLine: formData.titleLine.trim(),
          bio: formData.bio.trim(),
          order: formData.order,
          isActive: formData.isActive,
        };

        if (selectedFile) {
          const trainer = trainers.find((t) => t.id === editingId);
          if (trainer?.photoPath) {
            await deleteTrainerPhoto(trainer.photoPath);
          }
          const { url, path } = await uploadTrainerPhoto(editingId, selectedFile);
          updateData.photoUrl = url;
          updateData.photoPath = path;
        }

        await updateCeltaTrainer(editingId, updateData);
        setSuccess("Trainer updated successfully.");
      } else {
        const trainerId = await createCeltaTrainer({
          name: formData.name.trim(),
          titleLine: formData.titleLine.trim(),
          bio: formData.bio.trim(),
          order: formData.order,
          isActive: formData.isActive,
        });

        if (selectedFile) {
          const { url, path } = await uploadTrainerPhoto(trainerId, selectedFile);
          await updateCeltaTrainer(trainerId, { photoUrl: url, photoPath: path });
        }

        setSuccess("Trainer created successfully.");
      }

      await loadTrainers();
      resetForm();
    } catch (err: any) {
      setError("Failed to save trainer: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (trainer: CeltaTrainer) => {
    setEditingId(trainer.id || null);
    setFormData({
      name: trainer.name,
      titleLine: trainer.titleLine,
      bio: trainer.bio,
      order: trainer.order || 0,
      isActive: trainer.isActive !== undefined ? trainer.isActive : true,
    });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) {
      return;
    }

    try {
      const trainer = trainers.find((t) => t.id === id);
      if (trainer?.photoPath) {
        await deleteTrainerPhoto(trainer.photoPath);
      }
      await deleteCeltaTrainer(id);
      await loadTrainers();
      setSuccess("Trainer deleted successfully.");
    } catch (err: any) {
      setError("Failed to delete trainer: " + (err.message || "Unknown error"));
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      titleLine: "",
      bio: "",
      order: 0,
      isActive: true,
    });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <AdminLayout>
      <h1 className="mb-8">Manage CELTA Trainers</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          {success}
        </div>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? "Edit Trainer" : "Add New Trainer"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="titleLine" className="block text-sm font-medium text-gray-700 mb-2">
                Title Line *
              </label>
              <input
                id="titleLine"
                type="text"
                value={formData.titleLine}
                onChange={(e) => setFormData({ ...formData, titleLine: e.target.value })}
                required
                placeholder="e.g., Senior CELTA Tutor"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div>
              <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <input
                id="order"
                type="number"
                min="0"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="flex items-center">
              <input
                id="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
                Active
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio *
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
              Photo (optional)
            </label>
            <input
              id="photo"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setSelectedFile(file);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            {editingId && trainers.find((t) => t.id === editingId)?.photoUrl && !selectedFile && (
              <p className="text-xs text-gray-500 mt-1">
                Current photo will be kept. Select a new file to replace it.
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" variant="primary" disabled={uploading}>
              {uploading ? "Saving..." : editingId ? "Save Changes" : "Add Trainer"}
            </Button>
            {editingId && (
              <Button type="button" onClick={resetForm} variant="secondary">
                Cancel
              </Button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All Trainers</h2>
        {loading ? (
          <p className="text-gray-600">Loading trainers...</p>
        ) : trainers.length === 0 ? (
          <p className="text-gray-600">No trainers found. Add your first trainer above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Photo
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Order
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {trainers.map((trainer) => (
                  <tr key={trainer.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      {trainer.photoUrl ? (
                        <img
                          src={trainer.photoUrl}
                          alt={trainer.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No photo</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {trainer.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {trainer.titleLine}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {trainer.order || 0}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {trainer.isActive ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(trainer)}
                          className="text-primary hover:text-primary-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => trainer.id && handleDelete(trainer.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdminLayout>
  );
}






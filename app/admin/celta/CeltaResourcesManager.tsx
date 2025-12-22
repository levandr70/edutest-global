"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import Button from "@/components/Button";
import {
  listCeltaResources,
  createCeltaResource,
  updateCeltaResource,
  deleteCeltaResource,
  uploadResourceFile,
  deleteResourceFile,
  CeltaResource,
  CeltaResourceCategory,
} from "@/lib/firebase/celtaResources";

export default function CeltaResourcesManager() {
  const [resources, setResources] = useState<CeltaResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    category: "application_form" as CeltaResourceCategory,
    title: "",
    description: "",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await listCeltaResources();
      setResources(data);
    } catch (err: any) {
      const errorMessage = err.message || "Unknown error";
      console.error("Error loading resources:", err);
      
      if (errorMessage.includes("permission") || errorMessage.includes("Permission")) {
        setError("Permission denied. Please ensure Firestore security rules include the 'celtaResources' collection.");
      } else {
        setError("Failed to load resources: " + errorMessage);
      }
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.category || !formData.title.trim()) {
      setError("Please fill in all required fields (category, title).");
      return;
    }

    if (!editingId && !selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      setUploading(true);

      if (editingId) {
        const updateData: any = {
          category: formData.category,
          title: formData.title.trim(),
          order: formData.order,
          isActive: formData.isActive,
        };
        
        if (formData.description.trim()) {
          updateData.description = formData.description.trim();
        }

        if (selectedFile) {
          const resource = resources.find((r) => r.id === editingId);
          if (resource?.filePath) {
            await deleteResourceFile(resource.filePath);
          }
          const { url, path, fileName, fileType } = await uploadResourceFile(editingId, selectedFile);
          updateData.fileUrl = url;
          updateData.filePath = path;
          updateData.fileName = fileName;
          updateData.fileType = fileType;
        }

        await updateCeltaResource(editingId, updateData);
        setSuccess("Resource updated successfully.");
      } else {
        const createData: any = {
          category: formData.category,
          title: formData.title.trim(),
          order: formData.order,
          isActive: formData.isActive,
        };
        
        if (formData.description.trim()) {
          createData.description = formData.description.trim();
        }
        
        const resourceId = await createCeltaResource(createData);

        if (selectedFile) {
          const { url, path, fileName, fileType } = await uploadResourceFile(resourceId, selectedFile);
          await updateCeltaResource(resourceId, {
            fileUrl: url,
            filePath: path,
            fileName: fileName,
            fileType: fileType,
          });
        }

        setSuccess("Resource created successfully.");
      }

      await loadResources();
      resetForm();
    } catch (err: any) {
      setError("Failed to save resource: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (resource: CeltaResource) => {
    setEditingId(resource.id || null);
    setFormData({
      category: resource.category,
      title: resource.title,
      description: resource.description || "",
      order: resource.order || 0,
      isActive: resource.isActive !== undefined ? resource.isActive : true,
    });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resource? This will also delete the associated file.")) {
      return;
    }

    try {
      const resource = resources.find((r) => r.id === id);
      if (resource?.filePath) {
        await deleteResourceFile(resource.filePath);
      }
      await deleteCeltaResource(id);
      await loadResources();
      setSuccess("Resource deleted successfully.");
    } catch (err: any) {
      setError("Failed to delete resource: " + (err.message || "Unknown error"));
      console.error(err);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      category: "application_form",
      title: "",
      description: "",
      order: 0,
      isActive: true,
    });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getCategoryLabel = (category: CeltaResourceCategory): string => {
    switch (category) {
      case "application_form":
        return "Application Form";
      case "pre_interview_task":
        return "Pre-Interview Task";
      case "other":
        return "Other";
      default:
        return category;
    }
  };

  const getCategoryBadgeColor = (category: CeltaResourceCategory): string => {
    switch (category) {
      case "application_form":
        return "bg-blue-100 text-blue-800";
      case "pre_interview_task":
        return "bg-purple-100 text-purple-800";
      case "other":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <h1 className="mb-8">Manage CELTA Documents</h1>

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
          {editingId ? "Edit Resource" : "Add New Resource"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as CeltaResourceCategory })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="application_form">Application Form</option>
                <option value="pre_interview_task">Pre-Interview Task</option>
                <option value="other">Other</option>
              </select>
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
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              File {!editingId && "*"}
            </label>
            <input
              id="file"
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setSelectedFile(file);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            {editingId && resources.find((r) => r.id === editingId)?.fileName && !selectedFile && (
              <p className="text-xs text-gray-500 mt-1">
                Current file: {resources.find((r) => r.id === editingId)?.fileName}. Select a new file to replace it.
              </p>
            )}
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

          <div className="flex gap-4">
            <Button type="submit" variant="primary" disabled={uploading}>
              {uploading ? "Saving..." : editingId ? "Save Changes" : "Add Resource"}
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
        <h2 className="text-2xl font-semibold mb-4">All Resources</h2>
        {loading ? (
          <p className="text-gray-600">Loading resources...</p>
        ) : resources.length === 0 ? (
          <p className="text-gray-600">No resources found. Add your first resource above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Title
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    File Name
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
                {resources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor(resource.category)}`}>
                        {getCategoryLabel(resource.category)}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {resource.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {resource.fileName || (
                        <span className="text-gray-400 text-sm">No file</span>
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {resource.order || 0}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {resource.isActive ? (
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
                        {resource.fileUrl && (
                          <a
                            href={resource.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Download
                          </a>
                        )}
                        <button
                          onClick={() => handleEdit(resource)}
                          className="text-primary hover:text-primary-800 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => resource.id && handleDelete(resource.id)}
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



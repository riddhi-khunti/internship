import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  Users,
  DollarSign,
  X
} from "lucide-react";

const AdminEvents = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    capacity: 100,
    price: 0
  });

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /* ---------------- FORM VALIDATION ---------------- */
  const validateForm = () => {
    let newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required";
    }

    if (!formData.time) {
      newErrors.time = "Event time is required";
    }

    if (!formData.capacity) {
      newErrors.capacity = "Capacity is required";
    } else if (formData.capacity <= 0) {
      newErrors.capacity = "Capacity must be greater than 0";
    }

    if (!formData.price && formData.price !== 0) {
      newErrors.price = "Price is required";
    } else if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- MODAL HANDLERS ---------------- */
  const openAddModal = () => {
    setEditingEvent(null);
    setErrors({});
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      capacity: 100,
      price: 0
    });
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setErrors({});
    setFormData(event);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!validateForm()) return;

    console.log("Submitting Event Data:", formData);

    if (editingEvent) {
      // Update existing event locally
      // Logic removed for static demo
    } else {
      // Create new event locally
      // Logic removed for static demo
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    // Remove event locally
    // Remove event locally
    // Logic removed for static demo
  };

  const toggleStatus = (event) => {
    // Toggle status locally
    // Toggle status locally
    // Logic removed for static demo
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage Events</h1>
          <p className="text-gray-500">Create and manage events (Static Mode)</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full"
        >
          <Plus size={18} /> Add Event
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow border">
          <div className="flex justify-between">
            <div>
              <h2 className="font-semibold">Summer Music Festival</h2>
              <span className="text-xs text-green-500">active</span>
            </div>

            <div className="flex gap-2">
              <Pencil
                onClick={() => openEditModal({
                  id: 1,
                  title: "Summer Music Festival",
                  description: "An amazing outdoor music experience with live bands.",
                  date: "2024-07-15",
                  time: "18:00",
                  capacity: 500,
                  price: 49.99,
                  active: true
                })}
                className="cursor-pointer text-blue-500"
              />
              <Trash2
                onClick={() => handleDelete(1)}
                className="cursor-pointer text-red-500"
              />
            </div>
          </div>

          <p className="text-gray-600 mt-2">
            An amazing outdoor music experience with live bands.
          </p>

          {/* Info */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="flex items-center gap-2 bg-blue-100 p-2 rounded-full text-sm">
              <Calendar size={16} />
              2024-07-15
            </div>

            <div className="flex items-center gap-2 bg-purple-100 p-2 rounded-full text-sm">
              <Clock size={16} />
              18:00
            </div>

            <div className="flex items-center gap-2 bg-yellow-100 p-2 rounded-full text-sm">
              <Users size={16} />
              150 / 500
            </div>

            <div className="flex items-center gap-2 bg-green-100 p-2 rounded-full text-sm">
              <DollarSign size={16} />
              $49.99
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span>Booking</span>
              <span>30.0%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full mt-1">
              <div
                className="h-2 bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: "30%" }}
              />
            </div>
          </div>

          {/* Toggle */}
          <div className="flex justify-between mt-4 items-center">
            <span className="text-sm font-medium">Status</span>
            <button
              onClick={() => toggleStatus({ id: 1, active: true })}
              className="w-12 h-6 rounded-full transition-colors duration-200 bg-orange-500"
            >
              <div className="w-4 h-4 bg-white rounded-full transform transition-transform duration-200 ml-1 translate-x-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-3xl w-full max-w-lg relative shadow-xl">
            <X
              className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            />

            <h2 className="text-xl font-bold mb-4">
              {editingEvent ? "Edit Event" : "Add Event"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium ml-1 mb-1">Event Title</label>
                <input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium ml-1 mb-1">Event Description</label>
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors resize-none h-24"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium ml-1 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors"
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium ml-1 mb-1">Event Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors"
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium ml-1 mb-1">Capacity</label>
                  <input
                    type="number"
                    placeholder="Capacity"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors"
                  />
                  {errors.capacity && (
                    <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium ml-1 mb-1">Price ($)</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="w-full p-2 bg-gray-100 rounded-lg border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-colors"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
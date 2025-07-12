import { useState } from "react";
import { toast } from "react-toastify";
import { createCampus } from "../../../services/campus.ts";
import ComponentCard from "../../common/ComponentCard";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";
import Input from "../input/InputField";

type Coordinate = {
  lat: number;
  lng: number;
};

type CampusFormState = {
  name: string;
  description: string;
  eduMailExtension: string;
  averageHalfDistance: string; // keep as string for input, convert to number on submit
  coordinates: Coordinate[];
};

export default function CampusForm() {
  const [form, setForm] = useState<CampusFormState>({
    name: "",
    description: "",
    eduMailExtension: "",
    averageHalfDistance: "",
    coordinates: [
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
      { lat: 0, lng: 0 },
    ],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoordinateChange = (
    idx: number,
    field: "lat" | "lng",
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      coordinates: prev.coordinates.map((coord, i) =>
        i === idx
          ? { ...coord, [field]: value === "" ? "" : Number(value) }
          : coord
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleEdit = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = async () => {
    setLoading(true);
    try {
      await createCampus({
        name: form.name,
        description: form.description,
        eduMailExtension: form.eduMailExtension,
        averageHalfDistance: Number(form.averageHalfDistance),
        coordinates: form.coordinates.map((c) => ({
          lat: Number(c.lat),
          lng: Number(c.lng),
        })),
      });
      toast.success("Campus created successfully!");
      setModalOpen(false);
    } catch (error) {
      setModalOpen(false);
      toast.error("Failed to create campus.");
      console.error("Error creating campus:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title="Campus Info Inputs">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="font-medium text-gray-700 mb-1 block">
            Campus Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="font-medium text-gray-700 mb-1 block">
            Description <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="font-medium text-gray-700 mb-1 block">
            EDU Mail Extension <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="eduMailExtension"
            value={form.eduMailExtension}
            onChange={handleChange}
            placeholder="e.g. du.ac.bd"
            required
          />
        </div>
        <div>
          <label className="font-medium text-gray-700 mb-1 block">
            Average Half Distance (km) <span className="text-red-500">*</span>
          </label>
          <Input
            type="number"
            name="averageHalfDistance"
            value={form.averageHalfDistance}
            onChange={handleChange}
            step={0.01}
            min="0"
            required
          />
        </div>
        <div>
          <label className="font-medium text-gray-700 mb-1 block">
            Coordinates <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.coordinates.map((coord, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-xs text-gray-500">Point {idx + 1}</span>
                <Input
                  type="number"
                  name={`lat-${idx}`}
                  placeholder="Latitude"
                  value={coord.lat === 0 ? "" : coord.lat}
                  onChange={(e) =>
                    handleCoordinateChange(idx, "lat", e.target.value)
                  }
                  required
                />
                <Input
                  type="number"
                  name={`lng-${idx}`}
                  placeholder="Longitude"
                  value={coord.lng === 0 ? "" : coord.lng}
                  onChange={(e) =>
                    handleCoordinateChange(idx, "lng", e.target.value)
                  }
                  required
                />
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" className="bg-brand-600 text-white">
          Create Campus
        </Button>
      </form>

      {/* Modal for preview before submit */}
      <Modal
        isOpen={modalOpen}
        onClose={handleEdit}
        className="max-w-[600px] w-full m-4"
      >
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center">
            Campus Data Preview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block font-semibold text-gray-700 mb-1">
                Name:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                {form.name}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700 mb-1">
                EDU Mail Extension:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                {form.eduMailExtension}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="block font-semibold text-gray-700 mb-1">
                Description:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                {form.description}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700 mb-1">
                Average Half Distance:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                {form.averageHalfDistance}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="block font-semibold text-gray-700 mb-1">
                Coordinates:
              </span>
              <div className="space-y-1">
                {form.coordinates.map((coord, idx) => (
                  <span
                    key={idx}
                    className="block text-gray-900 bg-gray-100 rounded px-2 py-1"
                  >
                    Point {idx + 1}: Lat: {coord.lat}, Lng: {coord.lng}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={handleEdit}
              className="w-full sm:w-auto"
            >
              Edit
            </Button>
            <Button
              onClick={handleModalSubmit}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </Modal>
    </ComponentCard>
  );
}

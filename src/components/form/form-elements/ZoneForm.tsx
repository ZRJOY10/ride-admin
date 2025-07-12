import { useState } from "react";
import { toast } from "react-toastify";
import { createZone } from "../../../services/zone";
import ComponentCard from "../../common/ComponentCard";
import Button from "../../ui/button/Button";
import CampusDropdown from "../../ui/dropdown/CampusDropdown";
import { Modal } from "../../ui/modal";
import Input from "../input/InputField";

type Coordinates = {
  latitude: string;
  longitude: string;
};

type ZoneFormState = {
  campusId: string;
  zoneName: string;
  zoneDescription: string;
  coordinatesLeft: Coordinates;
  coordinatesRight: Coordinates;
  coordinatesTop: Coordinates;
  coordinatesBottom: Coordinates;
};

export default function ZoneForm() {
  const [form, setForm] = useState<ZoneFormState>({
    campusId: "",
    zoneName: "",
    zoneDescription: "",
    coordinatesLeft: { latitude: "", longitude: "" },
    coordinatesRight: { latitude: "", longitude: "" },
    coordinatesTop: { latitude: "", longitude: "" },
    coordinatesBottom: { latitude: "", longitude: "" },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [coord, field] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [coord]: {
          ...(prev[coord as keyof ZoneFormState] as Coordinates),
          [field]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCampusChange = (campusId: string) => {
    setForm((prev) => ({
      ...prev,
      campusId,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.campusId) {
      toast.error("Campus is required!");
      return;
    }
    setModalOpen(true);
  };

  const handleEdit = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = async () => {
    setLoading(true);
    try {
      const coordinates = [
        {
          lat: Number(form.coordinatesLeft.latitude),
          lng: Number(form.coordinatesLeft.longitude),
        },
        {
          lat: Number(form.coordinatesRight.latitude),
          lng: Number(form.coordinatesRight.longitude),
        },
        {
          lat: Number(form.coordinatesTop.latitude),
          lng: Number(form.coordinatesTop.longitude),
        },
        {
          lat: Number(form.coordinatesBottom.latitude),
          lng: Number(form.coordinatesBottom.longitude),
        },
      ];

      const payload = {
        name: form.zoneName,
        description: form.zoneDescription,
        coordinates,
        campusId: form.campusId,
      };

      await createZone(payload);
      toast.success("Zone created successfully!");
      setModalOpen(false);
    } catch (error) {
      setModalOpen(false);
      toast.error("Failed to create zone.");
      console.error("Error creating zone:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentCard title="Zone Info Inputs">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <CampusDropdown
            value={form.campusId}
            onChange={handleCampusChange}
            label="Campus"
            required={true}
          />
        </div>
        <div>
          <label className="font-medium text-gray-700 mb-1 block">
            Zone Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="zoneName"
            value={form.zoneName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="font-medium text-gray-700 mb-1 block">
            Zone Description <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="zoneDescription"
            value={form.zoneDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-medium text-gray-700 mb-1 block">
              Left Coordinates <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                  Latitude <span className="text-red-500">*</span>
                </label>
                <Input
                  name="coordinatesLeft.latitude"
                  value={form.coordinatesLeft.latitude}
                  onChange={handleChange}
                  placeholder="Latitude"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                  Longitude <span className="text-red-500">*</span>
                </label>
                <Input
                  name="coordinatesLeft.longitude"
                  value={form.coordinatesLeft.longitude}
                  onChange={handleChange}
                  placeholder="Longitude"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="font-medium text-gray-700 mb-1 block">
              Right Coordinates <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                  Latitude <span className="text-red-500">*</span>
                </label>
                <Input
                  name="coordinatesRight.latitude"
                  value={form.coordinatesRight.latitude}
                  onChange={handleChange}
                  placeholder="Latitude"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                  Longitude <span className="text-red-500">*</span>
                </label>
                <Input
                  name="coordinatesRight.longitude"
                  value={form.coordinatesRight.longitude}
                  onChange={handleChange}
                  placeholder="Longitude"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="font-medium text-gray-700 mb-1 block">
              Top Coordinates <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                  Latitude <span className="text-red-500">*</span>
                </label>
                <Input
                  name="coordinatesTop.latitude"
                  value={form.coordinatesTop.latitude}
                  onChange={handleChange}
                  placeholder="Latitude"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                  Longitude <span className="text-red-500">*</span>
                </label>
                <Input
                  name="coordinatesTop.longitude"
                  value={form.coordinatesTop.longitude}
                  onChange={handleChange}
                  placeholder="Longitude"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="font-medium text-gray-700 mb-1 block">
              Bottom Coordinates <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                  Latitude <span className="text-red-500">*</span>
                </label>
                <Input
                  name="coordinatesBottom.latitude"
                  value={form.coordinatesBottom.latitude}
                  onChange={handleChange}
                  placeholder="Latitude"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                  Longitude <span className="text-red-500">*</span>
                </label>
                <Input
                  name="coordinatesBottom.longitude"
                  value={form.coordinatesBottom.longitude}
                  onChange={handleChange}
                  placeholder="Longitude"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <Button type="submit" className="bg-brand-600 text-white">
          Create Zone
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
            Zone Data Preview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="block font-semibold text-gray-700 mb-1">
                Campus ID:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                {form.campusId}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700 mb-1">
                Zone Name:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                {form.zoneName}
              </span>
            </div>
            <div className="sm:col-span-2">
              <span className="block font-semibold text-gray-700 mb-1">
                Zone Description:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                {form.zoneDescription}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700 mb-1">
                Left Coordinates:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                Lat: {form.coordinatesLeft.latitude}, Lng:{" "}
                {form.coordinatesLeft.longitude}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700 mb-1">
                Right Coordinates:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                Lat: {form.coordinatesRight.latitude}, Lng:{" "}
                {form.coordinatesRight.longitude}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700 mb-1">
                Top Coordinates:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                Lat: {form.coordinatesTop.latitude}, Lng:{" "}
                {form.coordinatesTop.longitude}
              </span>
            </div>
            <div>
              <span className="block font-semibold text-gray-700 mb-1">
                Bottom Coordinates:
              </span>
              <span className="block text-gray-900 bg-gray-100 rounded px-2 py-1">
                Lat: {form.coordinatesBottom.latitude}, Lng:{" "}
                {form.coordinatesBottom.longitude}
              </span>
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

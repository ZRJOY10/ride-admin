import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { getCampusList, updateCampus } from "../../services/campus.ts";

type CampusCoordinate = {
  lat: number;
  lng: number;
};

export default function CampusList() {
  const [search, setSearch] = useState({ name: "", eduMailExtension: "" });
  const [campusList, setCampusList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getCampusList(search.name, search.eduMailExtension);
      setCampusList(res.data || []);
    } catch {
      setCampusList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (campus) => {
    setSelectedCampus(campus);
    setEditForm(null);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCampus(null);
    setEditMode(false);
    setEditForm(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditForm({ ...selectedCampus });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx?: number,
    coordField?: "lat" | "lng"
  ) => {
    if (editForm && typeof idx === "number" && coordField) {
      // Editing coordinates
      const newCoords = editForm.coordinates.map((c, i: number) =>
        i === idx ? { ...c, [coordField]: e.target.value } : c
      );
      setEditForm({ ...editForm, coordinates: newCoords });
    } else {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCampus(editForm.id, {
        name: editForm.name,
        description: editForm.description,
        eduMailExtension: editForm.eduMailExtension,
        averageHalfDistance: Number(editForm.averageHalfDistance),
        coordinates: editForm.coordinates.map((c: CampusCoordinate) => ({
          lat: Number(c.lat),
          lng: Number(c.lng),
        })),
      });
      setCampusList((prev) =>
        prev.map((c) =>
          c.id === editForm.id
            ? {
                ...editForm,
                coordinates: editForm.coordinates.map(
                  (c: CampusCoordinate) => ({
                    lat: Number(c.lat),
                    lng: Number(c.lng),
                  })
                ),
              }
            : c
        )
      );
      setSelectedCampus({
        ...editForm,
        coordinates: editForm.coordinates.map((c: CampusCoordinate) => ({
          lat: Number(c.lat),
          lng: Number(c.lng),
        })),
      });
      setEditMode(false);
      toast.success("Campus updated successfully!");
    } catch (error) {
      toast.error("Failed to update campus.");
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete ${selectedCampus.name}?`)
    ) {
      // TODO: Call delete API here
      setCampusList((prev) => prev.filter((c) => c.id !== selectedCampus.id));
      handleCloseModal();
    }
  };

  // Helper to get coordinate by index with fallback
  const getCoord = (coords: CampusCoordinate[], idx: number) =>
    coords && coords[idx]
      ? {
          lat: Number(coords[idx].lat).toFixed(4),
          lng: Number(coords[idx].lng).toFixed(4),
        }
      : { lat: "-", lng: "-" };

  return (
    <>
      <PageMeta
        title="Campus List - cholBhai"
        description="All the Campus List"
      />
      <PageBreadcrumb pageTitle="Campus List" />
      <div className="space-y-6">
        <ComponentCard title="Search Campus list">
          <form
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            onSubmit={handleSearch}
          >
            <div>
              <input
                type="text"
                name="name"
                value={search.name}
                onChange={handleChange}
                placeholder="Search by Name"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white dark:bg-gray-900 py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:text-white/90 dark:placeholder:text-white/30"
              />
            </div>
            <div>
              <input
                type="text"
                name="eduMailExtension"
                value={search.eduMailExtension}
                onChange={handleChange}
                placeholder="Search by Mail Extension"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white dark:bg-gray-900 py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:text-white/90 dark:placeholder:text-white/30"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-brand-500 to-brand-700 text-white font-semibold shadow-lg hover:from-brand-600 hover:to-brand-800 transition"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>
          <div>
            {campusList.length === 0 && !loading && (
              <div className="text-center text-gray-400 py-8">
                <span className="inline-block px-4 py-2 rounded bg-gray-100 dark:bg-gray-800">
                  No campus found.
                </span>
              </div>
            )}
            {campusList.length > 0 && (
              <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <table className="min-w-full text-sm text-gray-900 dark:text-white">
                  <thead>
                    <tr className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                      <th className="px-4 py-3 text-left font-semibold text-gray-500">
                        #
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500">
                        Zone Name
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500">
                        Left Coordinates
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500">
                        Right Coordinates
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500">
                        Top Coordinates
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500">
                        Bottom Coordinates
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-500">
                        Status
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {campusList.map((campus, idx) => {
                      const coords = campus.coordinates || [];
                      const left = getCoord(coords, 0);
                      const right = getCoord(coords, 1);
                      const top = getCoord(coords, 2);
                      const bottom = getCoord(coords, 3);
                      return (
                        <tr
                          key={campus.id}
                          className="border-b border-gray-100 dark:border-gray-800"
                        >
                          <td className="px-4 py-3">{idx + 1}</td>
                          <td className="px-4 py-3 font-semibold">
                            {campus.name}
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className="font-bold">
                                lat - {left.lat}
                              </span>
                              <br />
                              <span className="text-xs text-gray-500">
                                lng - {left.lng}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className="font-bold">
                                lat - {right.lat}
                              </span>
                              <br />
                              <span className="text-xs text-gray-500">
                                lng - {right.lng}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className="font-bold">lat - {top.lat}</span>
                              <br />
                              <span className="text-xs text-gray-500">
                                lng - {top.lng}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className="font-bold">
                                lat - {bottom.lat}
                              </span>
                              <br />
                              <span className="text-xs text-gray-500">
                                lng - {bottom.lng}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {campus.isActive ? (
                              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                Active
                              </span>
                            ) : (
                              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                              onClick={() => handleView(campus)}
                              title="View"
                            >
                              <EyeIcon className="w-5 h-5 text-gray-500" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* Pagination placeholder */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-xl">
                  <span className="text-sm text-gray-500">Page 1 of 1</span>
                  <div className="flex gap-1">
                    <button className="px-3 py-1 rounded border text-gray-500 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
                      Previous
                    </button>
                    <button className="px-3 py-1 rounded border text-brand-600 border-brand-200 bg-brand-50 font-semibold text-sm">
                      1
                    </button>
                    <button className="px-3 py-1 rounded border text-gray-500 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ComponentCard>
      </div>
      {/* Modal for campus details and edit */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        className="max-w-lg w-full m-4"
      >
        {selectedCampus && !editMode && (
          <div className="p-6 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-extrabold mb-4 text-brand-700 dark:text-brand-300 flex items-center gap-2">
              {selectedCampus.name}
            </h2>
            <div className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Description:{" "}
              </span>
              <span className="text-gray-800 dark:text-gray-100">
                {selectedCampus.description}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Mail Extension:{" "}
              </span>
              <span className="text-brand-600 dark:text-brand-400">
                {selectedCampus.eduMailExtension}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Avg. Half Distance:{" "}
              </span>
              <span className="text-gray-800 dark:text-gray-100">
                {selectedCampus.averageHalfDistance}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Coordinates:{" "}
              </span>
              <div className="text-xs text-gray-700 dark:text-gray-300">
                {(
                  selectedCampus.coordinates as { lat: number; lng: number }[]
                ).map((c, i) => (
                  <div key={i}>
                    <span className="font-semibold">Point {i + 1}:</span> (
                    {c.lat},{c.lng})
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                className="border-brand-500 text-brand-600"
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="bg-red-600 text-white"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button variant="outline" onClick={handleCloseModal}>
                Close
              </Button>
            </div>
          </div>
        )}
        {selectedCampus && editMode && (
          <form
            className="p-6 bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg"
            onSubmit={handleEditSubmit}
          >
            <h2 className="text-2xl font-extrabold mb-4 text-brand-700 dark:text-brand-300">
              Edit {selectedCampus.name}
            </h2>
            <div className="mb-2">
              <label className="font-semibold block mb-1 text-gray-700 dark:text-gray-200">
                Name:
              </label>
              <input
                className="w-full border rounded px-2 py-1 focus:ring-2 focus:ring-brand-400"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold block mb-1 text-gray-700 dark:text-gray-200">
                Description:
              </label>
              <textarea
                className="w-full border rounded px-2 py-1 focus:ring-2 focus:ring-brand-400"
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold block mb-1 text-gray-700 dark:text-gray-200">
                Mail Extension:
              </label>
              <input
                className="w-full border rounded px-2 py-1 focus:ring-2 focus:ring-brand-400"
                name="eduMailExtension"
                value={editForm.eduMailExtension}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold block mb-1 text-gray-700 dark:text-gray-200">
                Avg. Half Distance:
              </label>
              <input
                className="w-full border rounded px-2 py-1 focus:ring-2 focus:ring-brand-400"
                name="averageHalfDistance"
                type="number"
                value={editForm.averageHalfDistance}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold block mb-1 text-gray-700 dark:text-gray-200">
                Coordinates:
              </label>
              <div className="space-y-1">
                {editForm.coordinates.map((c, i: number) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="text-xs text-gray-500">Point {i + 1}</span>
                    <input
                      className="border rounded px-2 py-1 w-24 focus:ring-2 focus:ring-brand-400"
                      type="number"
                      value={c.lat}
                      onChange={(e) => handleEditChange(e, i, "lat")}
                      required
                    />
                    <input
                      className="border rounded px-2 py-1 w-24 focus:ring-2 focus:ring-brand-400"
                      type="number"
                      value={c.lng}
                      onChange={(e) => handleEditChange(e, i, "lng")}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button
                type="submit"
                variant="outline"
                className="border-brand-500 text-brand-600"
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}

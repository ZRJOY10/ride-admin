import { useState } from "react";
import { toast } from "react-toastify";
import { deleteZone, updateZone } from "../../../services/zone";
import Input from "../../form/input/InputField";
import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button";
import { Modal } from "../../ui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

// Add this simple tooltip component
const Tooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => (
  <span className="relative group">
    {children}
    <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
      {text}
    </span>
  </span>
);

// Update the Zone type to match your backend data
interface Zone {
  id: string;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ZoneTableListProps {
  zones: Zone[];
  rows?: number;
}

export default function ZoneTableList({ zones, rows }: ZoneTableListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = rows || 5;
  const totalPages = Math.ceil((zones?.length || 0) / rowsPerPage);

  // Modal state
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editZone, setEditZone] = useState<Zone | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleView = (zone: Zone) => {
    setSelectedZone(zone);
    setEditMode(false);
    setEditZone(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditZone(selectedZone);
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    idx?: number,
    coordField?: "lat" | "lng"
  ) => {
    if (editZone && typeof idx === "number" && coordField) {
      const newCoords = editZone.coordinates.map((c, i) =>
        i === idx ? { ...c, [coordField]: Number(e.target.value) } : c
      );
      setEditZone({ ...editZone, coordinates: newCoords });
    } else if (editZone) {
      setEditZone({ ...editZone, [e.target.name]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (!editZone) return;
    setLoading(true);
    try {
      await updateZone(editZone.id, {
        name: editZone.name,
        description: editZone.description,
        coordinates: editZone.coordinates,
        campusId: editZone.id, // Pass the correct campusId here
      });
      toast.success("Zone updated successfully!");
      setSelectedZone(editZone);
      setEditMode(false);
    } catch {
      toast.error("Failed to update zone.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedZone) return;
    if (!window.confirm("Are you sure you want to delete this zone?")) return;
    setLoading(true);
    try {
      await deleteZone(selectedZone.id);
      toast.success("Zone deleted successfully!");
      setSelectedZone(null);
      // Optionally, refresh the list here by calling parent fetch or removing from zones array
    } catch {
      toast.error("Failed to delete zone.");
    } finally {
      setLoading(false);
    }
  };

  const paginatedData = zones.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  #
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Zone Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Left Coordinates
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Right Coordinates
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Top Coordinates
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Bottom Coordinates
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>
            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedData.map((zone, idx) => (
                <TableRow
                  key={zone.id}
                  className="transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {(currentPage - 1) * rowsPerPage + idx + 1}
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {zone.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  {/* Coordinates: 0=Left, 1=Right, 2=Top, 3=Bottom */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        lat - {zone.coordinates[0]?.lat}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        lng - {zone.coordinates[0]?.lng}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        lat - {zone.coordinates[1]?.lat}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        lng - {zone.coordinates[1]?.lng}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        lat - {zone.coordinates[2]?.lat}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        lng - {zone.coordinates[2]?.lng}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        lat - {zone.coordinates[3]?.lat}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        lng - {zone.coordinates[3]?.lng}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 capitalize text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={zone.isActive ? "success" : "error"}
                    >
                      {zone.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <Tooltip text="View">
                      <button
                        className="text-gray-400 hover:text-brand-600 transition-colors duration-150"
                        onClick={() => handleView(zone)}
                        aria-label="View"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <nav
          className="inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {(() => {
            const pages = [];
            const start = Math.max(1, currentPage - 2);
            const end = Math.min(totalPages, currentPage + 2);
            for (let i = start; i <= end; i++) {
              pages.push(i);
            }
            if (start > 1) {
              pages.unshift("...");
              pages.unshift(1);
            }
            if (end < totalPages) {
              pages.push("...");
              pages.push(totalPages);
            }
            return pages.map((page, idx) =>
              typeof page === "number" ? (
                <button
                  key={page}
                  className={`px-3 py-1 border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === page
                      ? "bg-brand-100 text-brand-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ) : (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 py-1 text-gray-400 text-sm select-none"
                >
                  ...
                </span>
              )
            );
          })()}
          <button
            className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </nav>
      </div>

      {/* Zone Details Modal */}
      <Modal
        isOpen={!!selectedZone}
        onClose={() => {
          setSelectedZone(null);
          setEditMode(false);
          setEditZone(null);
        }}
        className="max-w-lg w-full m-4"
      >
        {selectedZone && !editMode && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{selectedZone.name}</h2>
            <div className="mb-2">
              <span className="font-semibold">Description: </span>
              {selectedZone.description}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status: </span>
              <Badge
                size="sm"
                color={selectedZone.isActive ? "success" : "error"}
              >
                {selectedZone.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Coordinates:</span>
              <ul className="ml-4 list-disc">
                {selectedZone.coordinates.map((c, i) => (
                  <li key={i}>
                    <span className="font-semibold">Point {i + 1}:</span> lat:{" "}
                    {c.lat}, lng: {c.lng}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleEdit}>
                Edit
              </Button>
              <Button
                className="bg-red-600 text-white"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </Button>
              <Button variant="outline" onClick={() => setSelectedZone(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
        {selectedZone && editMode && editZone && (
          <form
            className="p-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <h2 className="text-xl font-bold mb-4">Edit {editZone.name}</h2>
            <div className="mb-2">
              <label className="font-semibold block mb-1">Zone Name:</label>
              <Input
                name="name"
                value={editZone.name}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold block mb-1">Description:</label>
              <Input
                name="description"
                value={editZone.description}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="font-semibold block mb-1">Coordinates:</label>
              <div className="space-y-1">
                {editZone.coordinates.map((c, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="text-xs text-gray-500">Point {i + 1}</span>
                    <Input
                      type="number"
                      value={c.lat}
                      onChange={(e) => handleEditChange(e, i, "lat")}
                      required
                      className="w-24"
                    />
                    <Input
                      type="number"
                      value={c.lng}
                      onChange={(e) => handleEditChange(e, i, "lng")}
                      required
                      className="w-24"
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
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditMode(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Button from "../../components/ui/button/Button";

// Simple Modal component
function Modal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  loading = false,
}: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm overflow-hidden">
        {/* Modal Header */}
        <div
          className={`px-6 py-3 ${
            title === "Delete Zone" ? "bg-red-500" : "bg-brand-600"
          }`}
        >
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          <p className="mb-4">{message}</p>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="bg-red-500 border border-red-500 text-white hover:bg-red-600 font-semibold"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className={`bg-red-500 hover:bg-red-600 text-white font-semibold`}
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                confirmText
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ZoneView() {
  const location = useLocation();
  const navigate = useNavigate();
  const zone = location.state?.zone;

  const [form, setForm] = useState({
    zoneName: zone?.zoneName || "",
    zoneDescription: zone?.zoneDescription || "",
    coordinatesLeft: {
      latitude: zone?.coordinatesLeft?.latitude || "",
      longitude: zone?.coordinatesLeft?.longitude || "",
    },
    coordinatesRight: {
      latitude: zone?.coordinatesRight?.latitude || "",
      longitude: zone?.coordinatesRight?.longitude || "",
    },
    coordinatesTop: {
      latitude: zone?.coordinatesTop?.latitude || "",
      longitude: zone?.coordinatesTop?.longitude || "",
    },
    coordinatesBottom: {
      latitude: zone?.coordinatesBottom?.latitude || "",
      longitude: zone?.coordinatesBottom?.longitude || "",
    },
    status: zone?.status || "active",
  });

  const [modal, setModal] = useState<{
    open: boolean;
    type: "save" | "delete" | null;
  }>({ open: false, type: null });

  const [loading, setLoading] = useState(false);

  if (!zone) {
    return (
      <div className="p-8">
        <PageMeta
          title="Zone Not Found - Campus Ride"
          description="Zone not found"
        />
        <PageBreadcrumb pageTitle="Zone Not Found" />
        <div className="text-red-500 mt-8">Zone information not found.</div>
      </div>
    );
  }

  // Validation
  const validateForm = () => {
    if (
      !form.zoneName.trim() ||
      !form.zoneDescription.trim() ||
      !form.coordinatesLeft.latitude.trim() ||
      !form.coordinatesLeft.longitude.trim() ||
      !form.coordinatesRight.latitude.trim() ||
      !form.coordinatesRight.longitude.trim() ||
      !form.coordinatesTop.latitude.trim() ||
      !form.coordinatesTop.longitude.trim() ||
      !form.coordinatesBottom.latitude.trim() ||
      !form.coordinatesBottom.longitude.trim() ||
      !form.status.trim()
    ) {
      toast.error("All fields are required!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
      return false;
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (
      name.startsWith("coordinatesLeft") ||
      name.startsWith("coordinatesRight") ||
      name.startsWith("coordinatesTop") ||
      name.startsWith("coordinatesBottom")
    ) {
      const [coord, field] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [coord]: {
          ...prev[coord],
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setModal({ open: true, type: "save" });
  };

  const handleDelete = () => {
    setModal({ open: true, type: "delete" });
  };

  const handleModalConfirm = async () => {
    setLoading(true);
    setTimeout(() => {
      setModal({ open: false, type: null });
      setLoading(false);
      if (modal.type === "save") {
        toast.success("Zone changes saved!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (modal.type === "delete") {
        toast.error("Zone deleted!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => navigate(-1), 1200);
      }
    }, 1200); // Simulate API delay
  };

  const handleModalCancel = () => {
    setModal({ open: false, type: null });
    setLoading(false);
  };

  // Badge component for status
  const StatusBadge = ({ status }: { status: string }) => (
    <span
      className={`inline-block px-4 py-1 rounded-full text-sm font-semibold
        ${
          status === "active"
            ? "bg-green-100 text-emerald-600"
            : "bg-red-100 text-red-500"
        }
      `}
    >
      {status === "active" ? "Active" : "Inactive"}
    </span>
  );

  return (
    <div>
      <PageMeta
        title={`Zone View - ${zone.zoneName} | Campus Ride`}
        description={`Details for zone ${zone.zoneName}`}
      />
      <PageBreadcrumb pageTitle="Zone View" />
      <form onSubmit={handleSave}>
        <div className="space-y-12 bg-white rounded-lg shadow p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                {form.zoneName ? `${form.zoneName}'s Info` : "Zone Info Inputs"}
              </h2>
              <StatusBadge status={form.status} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              <Button
                type="button"
                className="bg-red-500 border border-red-500 text-white hover:bg-red-600 font-semibold px-6 py-2 rounded shadow w-full sm:w-auto"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
            <div className="space-y-6">
              <div>
                <label className="font-medium text-gray-700 mb-1 block">
                  Zone Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="zoneName"
                  value={form.zoneName}
                  onChange={handleChange}
                  placeholder="Enter zone name"
                  required
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 mb-1 block">
                  Zone Description <span className="text-red-500">*</span>
                </label>
                <TextArea
                  value={form.zoneDescription || ""}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      zoneDescription: value,
                    }))
                  }
                  placeholder="Enter zone's description"
                  rows={4}
                  required
                  hint="Provide a brief description of the zone"
                />
              </div>
              <div>
                <label className="font-medium text-gray-700 mb-1 block">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium text-gray-700 mb-1 block">
                    Left Coordinates <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                        Latitude
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
                        Longitude
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                        Latitude
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
                        Longitude
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                        Latitude
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
                        Longitude
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
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 ml-1 mb-0.5 block">
                        Latitude
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
                        Longitude
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
            </div>
          </div>
        </div>
      </form>
      <Modal
        open={modal.open}
        title={modal.type === "delete" ? "Delete Zone" : "Save Changes"}
        message={
          modal.type === "delete"
            ? "Are you sure you want to delete this zone?"
            : "Are you sure you want to save the changes?"
        }
        confirmColor={
          modal.type === "delete"
            ? "bg-red-500 hover:bg-red-600"
            : "bg-brand-600 hover:bg-brand-700"
        }
        confirmText={modal.type === "delete" ? "Delete" : "Save"}
        loading={loading}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

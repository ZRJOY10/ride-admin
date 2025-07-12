import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button/Button";
import { Modal } from "../../components/ui/modal";
import { getRiders, updateRider } from "../../services/rider";

export default function RiderList() {
  const [riders, setRiders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRider, setSelectedRider] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    getRiders({ limit: rowsPerPage, page: currentPage })
      .then((res) => {
        console.log("Riders API result:", res.data.data); // <-- Add this line
        setRiders(res.data.data || []);
        setTotalPages(res.data?.meta?.totalPages || 1);
      })
      .catch(() => toast.error("Failed to fetch riders"))
      .finally(() => setLoading(false));
  }, [currentPage]);

  const handleAccept = async (id: string) => {
    setLoading(true);
    try {
      await updateRider(id, { status: "APPROVED" });
      toast.success("Rider accepted!");
      setRiders((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "APPROVED" } : r))
      );
      setSelectedRider(null);
    } catch {
      toast.error("Failed to accept rider");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setLoading(true);
    try {
      await updateRider(id, { status: "REJECTED" });
      toast.success("Rider rejected!");
      setRiders((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "REJECTED" } : r))
      );
      setSelectedRider(null);
    } catch {
      toast.error("Failed to reject rider");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Rider List - Campus Ride"
        description="All the Rider List"
      />
      <PageBreadcrumb pageTitle="Rider List" />
      <div className="space-y-6">
        <ComponentCard title="Search Rider list by name">
          {loading ? (
            <div className="py-10 text-center text-brand-600 font-semibold">
              Loading...
            </div>
          ) : (
            <>
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-dark-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bike
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-dark-900">
                    {riders.map((rider) => (
                      <tr key={rider.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {rider.firstName} {rider.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {rider.bikeModel || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            color={
                              rider.hasRiderProfile === "true"
                                ? "success"
                                : rider.status === "false"
                                ? "error"
                                : "warning"
                            }
                            size="sm"
                          >
                            {rider.status || "PENDING"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="text-gray-400 hover:text-brand-600 transition-colors duration-150"
                            onClick={() => setSelectedRider(rider)}
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <nav
                  className="inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages || 1)
                      )
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Next
                  </button>
                </nav>
              </div>
            </>
          )}
        </ComponentCard>
      </div>
      {/* Rider Details Modal */}
      <Modal
        isOpen={!!selectedRider}
        onClose={() => setSelectedRider(null)}
        className="max-w-lg w-full m-4"
      >
        {selectedRider && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">
              {selectedRider.user?.firstName} {selectedRider.user?.lastName}
            </h2>
            <div className="mb-2">
              <span className="font-semibold">Bike Model: </span>
              {selectedRider.bikeModel || "-"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status: </span>
              <Badge
                color={
                  selectedRider.status === "APPROVED"
                    ? "success"
                    : selectedRider.status === "REJECTED"
                    ? "error"
                    : "warning"
                }
                size="sm"
              >
                {selectedRider.status || "PENDING"}
              </Badge>
            </div>
            {/* Add more fields as needed */}
            <div className="flex justify-end gap-2 mt-6">
              {(!selectedRider.status ||
                selectedRider.status === "PENDING") && (
                <>
                  <Button
                    variant="success"
                    onClick={() => handleAccept(selectedRider.id)}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Accept"}
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(selectedRider.id)}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Reject"}
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setSelectedRider(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

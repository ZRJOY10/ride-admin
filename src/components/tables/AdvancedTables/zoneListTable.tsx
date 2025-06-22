import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this import
import Badge from "../../ui/badge/Badge";
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

interface zone {
  id: number;
  zoneName: string;
  coordinatesLeft: {
    longitude: string;
    latitude: string;
  };
  coordinatesRight: {
    longitude: string;
    latitude: string;
  };
  coordinatesTop: {
    longitude: string;
    latitude: string;
  };
  coordinatesBottom: {
    longitude: string;
    latitude: string;
  };
  status: string;
}

// Define the table data using the interface
const tableData: zone[] = [
  {
    id: 1,
    zoneName: "Shahbag",
    coordinatesLeft: { latitude: "23.7383", longitude: "90.3952" },
    coordinatesRight: { latitude: "23.7384", longitude: "90.3963" },
    coordinatesTop: { latitude: "23.7390", longitude: "90.3957" },
    coordinatesBottom: { latitude: "23.7370", longitude: "90.3950" },
    status: "active",
  },
  {
    id: 2,
    zoneName: "TSC",
    coordinatesLeft: { latitude: "23.7311", longitude: "90.3930" },
    coordinatesRight: { latitude: "23.7312", longitude: "90.3945" },
    coordinatesTop: { latitude: "23.7320", longitude: "90.3935" },
    coordinatesBottom: { latitude: "23.7300", longitude: "90.3930" },
    status: "active",
  },
  {
    id: 3,
    zoneName: "Shohid Minar",
    coordinatesLeft: { latitude: "23.7289", longitude: "90.3975" },
    coordinatesRight: { latitude: "23.7290", longitude: "90.3985" },
    coordinatesTop: { latitude: "23.7300", longitude: "90.3980" },
    coordinatesBottom: { latitude: "23.7280", longitude: "90.3970" },
    status: "inactive",
  },
  {
    id: 4,
    zoneName: "Karzon Hall",
    coordinatesLeft: { latitude: "23.7324", longitude: "90.3945" },
    coordinatesRight: { latitude: "23.7326", longitude: "90.3958" },
    coordinatesTop: { latitude: "23.7330", longitude: "90.3950" },
    coordinatesBottom: { latitude: "23.7320", longitude: "90.3940" },
    status: "active",
  },
  {
    id: 5,
    zoneName: "DU Central Library",
    coordinatesLeft: { latitude: "23.7335", longitude: "90.3961" },
    coordinatesRight: { latitude: "23.7337", longitude: "90.3970" },
    coordinatesTop: { latitude: "23.7340", longitude: "90.3965" },
    coordinatesBottom: { latitude: "23.7330", longitude: "90.3960" },
    status: "inactive",
  },
  {
    id: 6,
    zoneName: "Curzon Gate",
    coordinatesLeft: { latitude: "23.7338", longitude: "90.3934" },
    coordinatesRight: { latitude: "23.7340", longitude: "90.3945" },
    coordinatesTop: { latitude: "23.7345", longitude: "90.3940" },
    coordinatesBottom: { latitude: "23.7335", longitude: "90.3930" },
    status: "active",
  },
  {
    id: 7,
    zoneName: "Teacher Student Center",
    coordinatesLeft: { latitude: "23.7309", longitude: "90.3920" },
    coordinatesRight: { latitude: "23.7311", longitude: "90.3930" },
    coordinatesTop: { latitude: "23.7315", longitude: "90.3925" },
    coordinatesBottom: { latitude: "23.7305", longitude: "90.3920" },
    status: "active",
  },
  {
    id: 8,
    zoneName: "Bangla Academy",
    coordinatesLeft: { latitude: "23.7315", longitude: "90.4010" },
    coordinatesRight: { latitude: "23.7317", longitude: "90.4020" },
    coordinatesTop: { latitude: "23.7320", longitude: "90.4015" },
    coordinatesBottom: { latitude: "23.7310", longitude: "90.4010" },
    status: "inactive",
  },
  {
    id: 9,
    zoneName: "National Museum",
    coordinatesLeft: { latitude: "23.7395", longitude: "90.3955" },
    coordinatesRight: { latitude: "23.7397", longitude: "90.3965" },
    coordinatesTop: { latitude: "23.7400", longitude: "90.3960" },
    coordinatesBottom: { latitude: "23.7390", longitude: "90.3950" },
    status: "active",
  },
  {
    id: 10,
    zoneName: "FBS Dhaka University",
    coordinatesLeft: { latitude: "23.7328", longitude: "90.3928" },
    coordinatesRight: { latitude: "23.7330", longitude: "90.3940" },
    coordinatesTop: { latitude: "23.7335", longitude: "90.3935" },
    coordinatesBottom: { latitude: "23.7325", longitude: "90.3925" },
    status: "active",
  },
  {
    id: 11,
    zoneName: "DU Gymnasium",
    coordinatesLeft: { latitude: "23.7295", longitude: "90.3955" },
    coordinatesRight: { latitude: "23.7297", longitude: "90.3965" },
    coordinatesTop: { latitude: "23.7300", longitude: "90.3960" },
    coordinatesBottom: { latitude: "23.7290", longitude: "90.3950" },
    status: "inactive",
  },
  {
    id: 12,
    zoneName: "Institute of Education and Research",
    coordinatesLeft: { latitude: "23.7350", longitude: "90.3942" },
    coordinatesRight: { latitude: "23.7352", longitude: "90.3952" },
    coordinatesTop: { latitude: "23.7355", longitude: "90.3947" },
    coordinatesBottom: { latitude: "23.7345", longitude: "90.3940" },
    status: "active",
  },
  {
    id: 13,
    zoneName: "Science Annex Building",
    coordinatesLeft: { latitude: "23.7360", longitude: "90.3933" },
    coordinatesRight: { latitude: "23.7362", longitude: "90.3944" },
    coordinatesTop: { latitude: "23.7365", longitude: "90.3938" },
    coordinatesBottom: { latitude: "23.7355", longitude: "90.3932" },
    status: "inactive",
  },
  {
    id: 14,
    zoneName: "Nabab Nawab Ali Chowdhury Senate Building",
    coordinatesLeft: { latitude: "23.7355", longitude: "90.3915" },
    coordinatesRight: { latitude: "23.7357", longitude: "90.3925" },
    coordinatesTop: { latitude: "23.7360", longitude: "90.3920" },
    coordinatesBottom: { latitude: "23.7350", longitude: "90.3910" },
    status: "active",
  },
  {
    id: 15,
    zoneName: "Central Playground DU",
    coordinatesLeft: { latitude: "23.7368", longitude: "90.3902" },
    coordinatesRight: { latitude: "23.7370", longitude: "90.3913" },
    coordinatesTop: { latitude: "23.7375", longitude: "90.3907" },
    coordinatesBottom: { latitude: "23.7365", longitude: "90.3900" },
    status: "active",
  },
  {
    id: 1,
    zoneName: "Shahbag",
    coordinatesLeft: { latitude: "23.7383", longitude: "90.3952" },
    coordinatesRight: { latitude: "23.7384", longitude: "90.3963" },
    coordinatesTop: { latitude: "23.7390", longitude: "90.3957" },
    coordinatesBottom: { latitude: "23.7370", longitude: "90.3950" },
    status: "active",
  },
  {
    id: 2,
    zoneName: "TSC",
    coordinatesLeft: { latitude: "23.7311", longitude: "90.3930" },
    coordinatesRight: { latitude: "23.7312", longitude: "90.3945" },
    coordinatesTop: { latitude: "23.7320", longitude: "90.3935" },
    coordinatesBottom: { latitude: "23.7300", longitude: "90.3930" },
    status: "active",
  },
  {
    id: 3,
    zoneName: "Shohid Minar",
    coordinatesLeft: { latitude: "23.7289", longitude: "90.3975" },
    coordinatesRight: { latitude: "23.7290", longitude: "90.3985" },
    coordinatesTop: { latitude: "23.7300", longitude: "90.3980" },
    coordinatesBottom: { latitude: "23.7280", longitude: "90.3970" },
    status: "inactive",
  },
  {
    id: 4,
    zoneName: "Karzon Hall",
    coordinatesLeft: { latitude: "23.7324", longitude: "90.3945" },
    coordinatesRight: { latitude: "23.7326", longitude: "90.3958" },
    coordinatesTop: { latitude: "23.7330", longitude: "90.3950" },
    coordinatesBottom: { latitude: "23.7320", longitude: "90.3940" },
    status: "active",
  },
  {
    id: 5,
    zoneName: "DU Central Library",
    coordinatesLeft: { latitude: "23.7335", longitude: "90.3961" },
    coordinatesRight: { latitude: "23.7337", longitude: "90.3970" },
    coordinatesTop: { latitude: "23.7340", longitude: "90.3965" },
    coordinatesBottom: { latitude: "23.7330", longitude: "90.3960" },
    status: "inactive",
  },
  {
    id: 6,
    zoneName: "Curzon Gate",
    coordinatesLeft: { latitude: "23.7338", longitude: "90.3934" },
    coordinatesRight: { latitude: "23.7340", longitude: "90.3945" },
    coordinatesTop: { latitude: "23.7345", longitude: "90.3940" },
    coordinatesBottom: { latitude: "23.7335", longitude: "90.3930" },
    status: "active",
  },
  {
    id: 7,
    zoneName: "Teacher Student Center",
    coordinatesLeft: { latitude: "23.7309", longitude: "90.3920" },
    coordinatesRight: { latitude: "23.7311", longitude: "90.3930" },
    coordinatesTop: { latitude: "23.7315", longitude: "90.3925" },
    coordinatesBottom: { latitude: "23.7305", longitude: "90.3920" },
    status: "active",
  },
  {
    id: 8,
    zoneName: "Bangla Academy",
    coordinatesLeft: { latitude: "23.7315", longitude: "90.4010" },
    coordinatesRight: { latitude: "23.7317", longitude: "90.4020" },
    coordinatesTop: { latitude: "23.7320", longitude: "90.4015" },
    coordinatesBottom: { latitude: "23.7310", longitude: "90.4010" },
    status: "inactive",
  },
  {
    id: 9,
    zoneName: "National Museum",
    coordinatesLeft: { latitude: "23.7395", longitude: "90.3955" },
    coordinatesRight: { latitude: "23.7397", longitude: "90.3965" },
    coordinatesTop: { latitude: "23.7400", longitude: "90.3960" },
    coordinatesBottom: { latitude: "23.7390", longitude: "90.3950" },
    status: "active",
  },
  {
    id: 10,
    zoneName: "FBS Dhaka University",
    coordinatesLeft: { latitude: "23.7328", longitude: "90.3928" },
    coordinatesRight: { latitude: "23.7330", longitude: "90.3940" },
    coordinatesTop: { latitude: "23.7335", longitude: "90.3935" },
    coordinatesBottom: { latitude: "23.7325", longitude: "90.3925" },
    status: "active",
  },
  {
    id: 11,
    zoneName: "DU Gymnasium",
    coordinatesLeft: { latitude: "23.7295", longitude: "90.3955" },
    coordinatesRight: { latitude: "23.7297", longitude: "90.3965" },
    coordinatesTop: { latitude: "23.7300", longitude: "90.3960" },
    coordinatesBottom: { latitude: "23.7290", longitude: "90.3950" },
    status: "inactive",
  },
  {
    id: 12,
    zoneName: "Institute of Education and Research",
    coordinatesLeft: { latitude: "23.7350", longitude: "90.3942" },
    coordinatesRight: { latitude: "23.7352", longitude: "90.3952" },
    coordinatesTop: { latitude: "23.7355", longitude: "90.3947" },
    coordinatesBottom: { latitude: "23.7345", longitude: "90.3940" },
    status: "active",
  },
  {
    id: 13,
    zoneName: "Science Annex Building",
    coordinatesLeft: { latitude: "23.7360", longitude: "90.3933" },
    coordinatesRight: { latitude: "23.7362", longitude: "90.3944" },
    coordinatesTop: { latitude: "23.7365", longitude: "90.3938" },
    coordinatesBottom: { latitude: "23.7355", longitude: "90.3932" },
    status: "inactive",
  },
  {
    id: 14,
    zoneName: "Nabab Nawab Ali Chowdhury Senate Building",
    coordinatesLeft: { latitude: "23.7355", longitude: "90.3915" },
    coordinatesRight: { latitude: "23.7357", longitude: "90.3925" },
    coordinatesTop: { latitude: "23.7360", longitude: "90.3920" },
    coordinatesBottom: { latitude: "23.7350", longitude: "90.3910" },
    status: "active",
  },
  {
    id: 15,
    zoneName: "Central Playground DU",
    coordinatesLeft: { latitude: "23.7368", longitude: "90.3902" },
    coordinatesRight: { latitude: "23.7370", longitude: "90.3913" },
    coordinatesTop: { latitude: "23.7375", longitude: "90.3907" },
    coordinatesBottom: { latitude: "23.7365", longitude: "90.3900" },
    status: "active",
  },
];

const rowsPerPage = 5;

export default function ZoneTableList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const navigate = useNavigate(); // <-- Add this line

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const handleView = (zone: zone) => {
    navigate("/zone-view", { state: { zone } });
  };

  const paginatedData = tableData.slice(
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
                          {zone.zoneName}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        lat - {zone.coordinatesLeft.latitude}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        lng - {zone.coordinatesLeft.longitude}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        lat - {zone.coordinatesRight.latitude}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        lng - {zone.coordinatesRight.longitude}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        lat - {zone.coordinatesTop.latitude}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        lng - {zone.coordinatesTop.longitude}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        lat - {zone.coordinatesBottom.latitude}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        lng - {zone.coordinatesBottom.longitude}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 capitalize text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={zone.status === "active" ? "success" : "error"}
                    >
                      {zone.status}
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
            // Calculate page numbers to show: current, previous 2, next 2
            const pages = [];
            const start = Math.max(1, currentPage - 2);
            const end = Math.min(totalPages, currentPage + 2);
            for (let i = start; i <= end; i++) {
              pages.push(i);
            }
            // Add first page and ellipsis if needed
            if (start > 1) {
              pages.unshift("...");
              pages.unshift(1);
            }
            // Add last page and ellipsis if needed
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
    </div>
  );
}

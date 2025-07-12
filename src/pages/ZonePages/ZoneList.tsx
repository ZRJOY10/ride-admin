import { useEffect, useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ZoneTableList from "../../components/tables/AdvancedTables/zoneListTable";
import CampusDropdown from "../../components/ui/dropdown/CampusDropdown";
import { getCampusById } from "../../services/campus";

type Zone = {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  coordinates: { lat: number; lng: number }[];
};

type Campus = {
  id: string;
  name: string;
  description: string;
  eduMailExtension: string;
  averageHalfDistance: number;
  coordinates: { lat: number; lng: number }[];
  zones?: Zone[];
};

export default function ZoneList() {
  const [campusId, setCampusId] = useState<string>("");
  const [campus, setCampus] = useState<Campus | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);

  useEffect(() => {
    if (campusId) {
      getCampusById(campusId)
        .then((res) => {
          const data = res.data || res;
          setCampus(data);
          setZones(data.zones || []);
        })
        .catch(() => {
          setCampus(null);
          setZones([]);
        });
    } else {
      setCampus(null);
      setZones([]);
    }
  }, [campusId]);

  return (
    <>
      <PageMeta title="Zone List - cholBhai" description="All the Zone List" />
      <PageBreadcrumb pageTitle="Zone List" />
      <div className="space-y-6">
        <ComponentCard title="Search Zone list by name">
          {campus && (
            <div className="mb-6 flex justify-center">
              <div className="p-6 rounded-xl bg-gradient-to-r from-blue-100 to-blue-50 shadow-md border border-blue-200 max-w-md w-full text-center">
                <div className="font-bold text-lg text-blue-800 mb-2 flex items-center justify-center gap-2">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2"
                    ></path>
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    ></circle>
                  </svg>
                  Campus Info
                </div>
                <div className="text-blue-900 text-base mb-1">
                  <span className="font-semibold">Name:</span> {campus.name}
                </div>
                <div className="text-blue-700 text-sm">
                  <span className="font-semibold">Description:</span>{" "}
                  {campus.description}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-4">
            <div className="w-full lg:w-auto">
              <CampusDropdown
                value={campusId}
                onChange={setCampusId}
                label=""
                required={false}
                className="min-w-[220px]"
              />
            </div>
            <div className="hidden lg:block flex-1">
              <form action="" method="POST">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search ....."
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                  />
                  <button className="absolute -translate-y-1/2 left-4 top-1/2">
                    <svg
                      className="fill-gray-500 dark:fill-gray-400"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <ZoneTableList zones={zones} rows={10} />
        </ComponentCard>
      </div>
    </>
  );
}

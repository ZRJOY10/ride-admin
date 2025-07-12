import { useEffect, useState } from "react";
import { getCampusList } from "../../../services/campus.ts";

type Campus = {
  id: string;
  name: string;
};

interface CampusDropdownProps {
  value?: string;
  onChange: (campusId: string) => void;
  label?: string;
  className?: string;
  required?: boolean;
}

export default function CampusDropdown({
  value,
  onChange,
  label = "Select Campus",
  className = "",
  required = false,
}: CampusDropdownProps) {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCampuses = async () => {
      setLoading(true);
      try {
        const res = await getCampusList();
        setCampuses(res.data || []);
      } catch {
        setCampuses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCampuses();
  }, []);

  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        className="w-full h-11 px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        required={required} // <-- set required attribute
      >
        <option value="">Select a campus</option>
        {campuses.map((campus) => (
          <option key={campus.id} value={campus.id}>
            {campus.name}
          </option>
        ))}
      </select>
    </div>
  );
}

import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Button from "../../ui/button/Button";
import Input from "../input/InputField";
import Label from "../Label";

type FilePreview = {
  file: File | null;
  url: string;
};

export default function RiderForm() {
  const [form, setForm] = useState({
    name: "",
    fullName: "",
    userName: "",
    nidFront: null as File | null,
    nidBack: null as File | null,
    drivingLicenceFront: null as File | null,
    drivingLicenceBack: null as File | null,
    bikeLicenceFront: null as File | null,
    bikeLicenceBack: null as File | null,
    universityIdFront: null as File | null,
    universityIdBack: null as File | null,
  });

  const [previews, setPreviews] = useState<Record<string, FilePreview>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));
      setPreviews((prev) => ({
        ...prev,
        [name]: { file, url },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    alert("Rider created!");
  };

  // Helper for rendering file input with preview
  const renderFileInput = (label: string, name: keyof typeof form) => (
    <div>
      <Label>
        {label} <span className="text-red-500">*</span>
      </Label>
      <input
        type="file"
        name={name}
        accept="image/*,application/pdf"
        onChange={handleChange}
        required
        className="block w-full border border-gray-300 rounded px-3 py-2"
      />
      {previews[name] && previews[name].file && (
        <div className="mt-2">
          {previews[name].file.type.startsWith("image/") ? (
            <img
              src={previews[name].url}
              alt={label}
              className="h-20 rounded border border-gray-200 object-contain"
            />
          ) : (
            <a
              href={previews[name].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-xs"
            >
              Preview PDF
            </a>
          )}
        </div>
      )}
    </div>
  );

  return (
    <ComponentCard title="Rider Info Inputs">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="userName">
              User Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="userName"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              placeholder="Enter user name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {renderFileInput("NID Front", "nidFront")}
          {renderFileInput("NID Back", "nidBack")}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {renderFileInput("Driving Licence Front", "drivingLicenceFront")}
          {renderFileInput("Driving Licence Back", "drivingLicenceBack")}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {renderFileInput("Bike Licence Front", "bikeLicenceFront")}
          {renderFileInput("Bike Licence Back", "bikeLicenceBack")}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {renderFileInput("University ID Card Front", "universityIdFront")}
          {renderFileInput("University ID Card Back", "universityIdBack")}
        </div>
        <Button size="md" variant="primary" type="submit">
          Create Rider
        </Button>
      </form>
    </ComponentCard>
  );
}

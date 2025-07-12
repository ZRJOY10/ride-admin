import { useState } from "react";
import { toast } from "react-toastify";
import { createRider } from "../../../services/rider";
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
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    nidFront: null as File | null,
    nidBack: null as File | null,
    universityIdFront: null as File | null,
    universityIdBack: null as File | null,
    drivingLicense: null as File | null,
    vehicleLicense: null as File | null,
    numberPlateImage: null as File | null,
    bikeRegistrationNumber: "",
    bikeModel: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);

      if (form.nidFront) formData.append("nidFront", form.nidFront);
      if (form.nidBack) formData.append("nidBack", form.nidBack);
      if (form.universityIdFront)
        formData.append("universityIdFront", form.universityIdFront);
      if (form.universityIdBack)
        formData.append("universityIdBack", form.universityIdBack);
      if (form.drivingLicense)
        formData.append("drivingLicense", form.drivingLicense);
      if (form.vehicleLicense)
        formData.append("vehicleLicense", form.vehicleLicense);
      if (form.numberPlateImage)
        formData.append("numberPlateImage", form.numberPlateImage);
      if (form.bikeRegistrationNumber)
        formData.append("bikeRegistrationNumber", form.bikeRegistrationNumber);
      if (form.bikeModel) formData.append("bikeModel", form.bikeModel);

      await createRider(formData);
      toast.success("Rider created!");
    } catch (error) {
      toast.error("Failed to create rider!");
      console.error("Error creating rider:", error);
    }
  };

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
            <Label htmlFor="firstName">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {renderFileInput("NID Front", "nidFront")}
          {renderFileInput("NID Back", "nidBack")}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {renderFileInput("University ID Card Front", "universityIdFront")}
          {renderFileInput("University ID Card Back", "universityIdBack")}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {renderFileInput("Driving License", "drivingLicense")}
          {renderFileInput("Vehicle License", "vehicleLicense")}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {renderFileInput("Number Plate Image", "numberPlateImage")}
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="bikeRegistrationNumber">
              Bike Registration Number
            </Label>
            <Input
              id="bikeRegistrationNumber"
              name="bikeRegistrationNumber"
              value={form.bikeRegistrationNumber}
              onChange={handleChange}
              placeholder="Enter bike registration number"
            />
          </div>
          <div>
            <Label htmlFor="bikeModel">Bike Model</Label>
            <Input
              id="bikeModel"
              name="bikeModel"
              value={form.bikeModel}
              onChange={handleChange}
              placeholder="Enter bike model"
            />
          </div>
        </div>
        <Button size="md" variant="primary" type="submit">
          Create Rider
        </Button>
      </form>
    </ComponentCard>
  );
}

import { useState } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import Button from "../../ui/button/Button.tsx";
import Input from "../input/InputField.tsx";
import TextArea from "../input/TextArea.tsx";
import Label from "../Label.tsx";

export default function ZoneForm() {
  const [message, setMessage] = useState("");
  return (
    <ComponentCard title="Zone Info Inputs">
      <div className="space-y-6">
        <div>
          <Label htmlFor="zoneName">Zone Name</Label>
          <Input type="text" id="zoneName" />
        </div>

        <div>
          <Label>Zone Description</Label>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Left Coordinates */}
          <div>
            <Label htmlFor="leftCoordinates">Left Coordinates</Label>
            <Input
              type="text"
              id="leftLat"
              placeholder="Enter Left zone latitude"
            />
            <br />
            <Input
              type="text"
              id="leftLng"
              placeholder="Enter Left zone longitude"
            />
          </div>

          {/* Right Coordinates */}
          <div>
            <Label htmlFor="rightCoordinates">Right Coordinates</Label>
            <Input
              type="text"
              id="rightLat"
              placeholder="Enter Right zone latitude"
            />
            <br />
            <Input
              type="text"
              id="rightLng"
              placeholder="Enter Right zone longitude"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Top Coordinates */}
          <div>
            <Label htmlFor="topCoordinates">Top Coordinates</Label>
            <Input
              type="text"
              id="topLat"
              placeholder="Enter Top zone latitude"
            />
            <br />
            <Input
              type="text"
              id="topLng"
              placeholder="Enter Top zone longitude"
            />
          </div>

          {/* Bottom Coordinates */}
          <div>
            <Label htmlFor="bottomCoordinates">Bottom Coordinates</Label>
            <Input
              type="text"
              id="bottomLat"
              placeholder="Enter Bottom zone latitude"
            />
            <br />
            <Input
              type="text"
              id="bottomLng"
              placeholder="Enter Bottom zone longitude"
            />
          </div>
        </div>
        <Button size="md" variant="primary">
          Create Zone
        </Button>
      </div>
    </ComponentCard>
  );
}

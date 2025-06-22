import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ZoneForm from "../../components/form/form-elements/ZoneForm";

export default function ZoneCreate() {
  return (
    <div>
      <PageMeta
        title="Zone Create - Campus Ride"
        description="This is zone creation page"
      />
      <PageBreadcrumb pageTitle="Zone Creation" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-12">
          <ZoneForm />
        </div>
      </div>
    </div>
  );
}

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import RiderForm from "../../components/form/form-elements/RiderForm";

export default function RiderCreate() {
  return (
    <div>
      <PageMeta
        title="Rider Create - Campus Ride"
        description="This is rider creation page"
      />
      <PageBreadcrumb pageTitle="Rider Creation" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-12">
          <RiderForm />
        </div>
      </div>
    </div>
  );
}

import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import CampusForm from "../../components/form/form-elements/CampusForm";
export default function CampusCreate() {
  return (
    <div>
      <PageMeta
        title="Campus Create - Campus Ride"
        description="This is campus  creation page"
      />
      <PageBreadcrumb pageTitle="Campus Creation" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-12">
          <CampusForm />
        </div>
      </div>
    </div>
  );
}

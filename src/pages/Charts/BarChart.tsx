import BarChartOne from "../../components/charts/bar/BarChartOne";
import ComponentCard from "../../components/common/ComponentCard";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function BarChart() {
  return (
    <div>
      <PageMeta
        title="React.js Chart Dashboard | campus_ride - React.js Admin Dashboard Template"
        description="This is React.js Chart Dashboard page for campus_ride - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}

import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <div className="flex flex-col gap-8 max-w-480 m-[0 auto]">
      <Row type="horizontal">
        <Heading type="h1" className="text-text-primary">
          Dashboard
        </Heading>
      </Row>
      <DashboardLayout />
    </div>
  );
}

export default Dashboard;

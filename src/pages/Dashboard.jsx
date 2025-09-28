import MainLineChart from "../components/dashboard/MainLineChart";
import Heading from "../ui/Heading";

function Dashboard() {
  return (
    <main className=" mt-20">
      <Heading size="small">Total daily sales during the current month</Heading>
      <div className=" col-span-2">
        <MainLineChart />
      </div>
    </main>
  );
}

export default Dashboard;

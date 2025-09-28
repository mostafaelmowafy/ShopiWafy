import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDailySales } from "./useDailySales";

function MainLineChart() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const { data, isLoading } = useDailySales(currentMonth, currentYear);

  if (isLoading) return <p>Loading daily sales chart...</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          interval={0} // يعرض كل الأيام
          tick={{ fontSize: 10 }}
          angle={-45}
          textAnchor="end"
        />

        <YAxis type="number" domain={[0, 10000]} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MainLineChart;

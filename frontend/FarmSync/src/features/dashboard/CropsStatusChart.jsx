import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Heading from "../../ui/Heading";

// Available: "bg-success/15 text-success",
// Harvest Soon: "bg-accent-harvest/15 text-accent-harvest",
// Future: "bg-info/15 text-info",

function CropsStatusChart({statusData}) {
  const statusColors = {
    Available: {
      fill: "var(--color-brand-light)",
      stroke: "var(--color-brand-light)",
    },
    "Harvest soon": {
      fill: "var(--color-accent-light)",
      stroke: "var(--color-accent-light)",
    },
    Future: {
      fill: "var(--color-action-light)",
      stroke: "var(--color-action-light)",
    },
  };

  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-5 shadow-sm">
      <Heading type="h2" className="mb-2 pl-4">
        Crops by status
      </Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={statusData}
            nameKey="name"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="45%"
            cy="50%"
            paddingAngle={3}
          >
            {statusData.map((entry) => (
              <Cell
                key={entry.name}
                fill={statusColors[entry.name]?.fill}
                stroke={statusColors[entry.name]?.stroke}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={11}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CropsStatusChart;

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Heading from "../../ui/Heading";

const colors = {
  quantity: {
    stroke: "var(--color-brand-primary)",
    fill: "var(--color-brand-light)",
  },
  text: "var(--color-text-secondary)",
  background: "var(--color-surface)",
  grid: "var(--color-border)",
};

function HarvestTimelineChart({timelineData}) {
  return (
    <div className="col-span-full rounded-lg border border-border bg-surface p-6 shadow-sm">
      <Heading type="h2" className="mb-4">
        Predicted Harvest Timeline
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={timelineData}>
          <XAxis
            dataKey="date"
            tickFormatter={formatChartDate}
            tick={{fill: colors.text}}
            tickLine={{stroke: colors.text}}
          />
          <YAxis tick={{fill: colors.text}} tickLine={{stroke: colors.text}} />
          <CartesianGrid strokeDasharray="4" stroke={colors.grid} />
          <Tooltip contentStyle={{backgroundColor: colors.background}} />
          <Area
            dataKey="quantity"
            type="natural"
            stroke={colors.quantity.stroke}
            fill={colors.quantity.fill}
            strokeWidth={1.5}
            name="Value:"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HarvestTimelineChart;

function formatChartDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(new Date(dateString));
}

import Stat from "./Stat";
import {LuSprout} from "react-icons/lu";
import {
  HiArchiveBox,
  HiOutlineCurrencyDollar,
  HiOutlineClock,
} from "react-icons/hi2";
import {formatCurrency} from "../../utils/helpers";
import Row from "../../ui/Row";

function Stats({stats}) {
  const {totalCrops, totalQuantity, totalInventoryValue, harvestSoonCount} =
    stats;
  return (
    <Row type="horizontal" className="gap-8">
      <Stat
        title="Total crops"
        value={totalCrops}
        color="green"
        icon={<LuSprout />}
      />

      <Stat
        icon={<HiArchiveBox />}
        title="Total quantity"
        value={totalQuantity}
        color="blue"
      />

      <Stat
        icon={<HiOutlineCurrencyDollar />}
        title="Inventory value"
        value={formatCurrency(totalInventoryValue)}
        color="yellow"
      />

      <Stat
        icon={<HiOutlineClock />}
        title="Harvest soon"
        value={harvestSoonCount}
        color="yellow"
      />
    </Row>
  );
}

export default Stats;

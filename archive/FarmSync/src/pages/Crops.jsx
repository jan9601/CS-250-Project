import CropsTable from "../features/crops/CropsTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Crops() {
  return (
    <div className="flex flex-col gap-8">
      <Row type="horizontal">
        <Heading type="h1" className="text-text-primary">
          All crops
        </Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CropsTable />
      </Row>
    </div>
  );
}

export default Crops;

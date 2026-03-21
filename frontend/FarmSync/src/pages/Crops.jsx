import CropsTable from "../features/crops/CropsTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCrop from "../features/crops/AddCrop";

function Crops() {
  return (
    <div className="flex flex-col gap-8 max-w-480 m-[0 auto]">
      <Row type="horizontal">
        <Heading type="h1" className="text-text-primary">
          All crops
        </Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CropsTable />
        <AddCrop />
      </Row>
    </div>
  );
}

export default Crops;

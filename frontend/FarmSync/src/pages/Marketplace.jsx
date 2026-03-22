import CropsTableOperations from "../features/crops/CropsTableOperations";
import MarketplaceLayout from "../features/marketplace/MarketplaceLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function MarketPlace() {
  return (
    <div className="flex flex-col gap-8 max-w-480 m-[0 auto]">
      <Row type="horizontal">
        <Heading type="h1" className="text-text-primary">
          Marketplace
        </Heading>
        <CropsTableOperations />
      </Row>
      <Row>
        <MarketplaceLayout />
      </Row>
    </div>
  );
}

export default MarketPlace;

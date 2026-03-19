import {useCrops} from "../crops/useCrops";
import MarketplaceGrid from "./MarketplaceGrid";

function MarketplaceLayout() {
  const {isLoading, crops} = useCrops();
  console.log(crops);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loader"></span>
      </div>
    );
  return <MarketplaceGrid crops={crops} />;
}

export default MarketplaceLayout;

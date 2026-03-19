import CropsCard from "./CropsCard";

/**
 * MarketplaceGrid
 * ----------------
 * Displays all marketplace crop cards in a responsive grid layout.
 *
 * This component receives the crops data and maps each crop
 * into a marketplace card used for browsing available products.
 */

function MarketplaceGrid({crops}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {crops.map((crop) => (
        <CropsCard
          cropType={crop.name}
          location={crop.location}
          predictedHarvestDate={crop.predictedHarvestDate}
          price={crop.price}
          quantity={crop.quantity}
          status={crop.status}
          key={crop.id}
        />
      ))}
    </div>
  );
}

export default MarketplaceGrid;

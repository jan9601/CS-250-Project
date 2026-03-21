import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import {formatStatus} from "../../utils/formatStatus";

function ListingDetails({crop, onCloseModal}) {
  const {
    name,
    plantingDate,
    predictedHarvestDate,
    confidenceScore,
    price,
    quantity,
    status,
    description,
    location,
  } = crop;

  const styledStatus = getStatusStyles(status);

  return (
    <div className="w-2xl max-w-full p-6 h-full">
      <div className="mb-6 flex items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-text-secondary">
            Marketplace listing details
          </p>
          <Heading type="h2">{name}</Heading>
          <p className="mt-1 text-sm text-text-secondary">{location}</p>
        </div>

        <span
          className={`rounded-full mr-6 px-3 py-1 text-xs font-semibold whitespace-nowrap ${styledStatus}`}
        >
          {formatStatus(status)}
        </span>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-bg px-4 py-4">
          <p className="mb-1 text-xs uppercase tracking-wide text-text-secondary">
            Unit price
          </p>
          <p className="text-2xl font-bold text-action-primary">${price}</p>
        </div>

        <div className="rounded-xl bg-bg px-4 py-4">
          <p className="mb-1 text-xs uppercase tracking-wide text-text-secondary">
            Available units
          </p>
          <p className="text-2xl font-bold text-text-primary">{quantity}</p>
        </div>

        <div className="rounded-xl bg-bg px-4 py-4">
          <p className="mb-1 text-xs uppercase tracking-wide text-text-secondary">
            Harvest date
          </p>
          <p className="text-base font-semibold text-text-primary">
            {predictedHarvestDate}
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-border p-5">
        <DetailItem label="Planting date" value={plantingDate} />
        <DetailItem label="Predicted harvest" value={predictedHarvestDate} />
        <DetailItem
          label="Confidence score"
          value={`${Math.round(confidenceScore * 100)}%`}
        />
        <DetailItem label="Status" value={formatStatus(status)} />
      </div>

      <div className="mb-6 rounded-xl border border-border p-5">
        <p className="mb-2 text-sm font-semibold text-text-primary">
          Description
        </p>
        <p className="leading-7 text-text-secondary">
          {description || "No description provided for this listing yet."}
        </p>
      </div>

      <div className="flex justify-end">
        <Button variation="secondary" onClick={onCloseModal}>
          Close
        </Button>
      </div>
    </div>
  );
}

function DetailItem({label, value}) {
  return (
    <div>
      <p className="mb-1 text-xs uppercase tracking-wide text-text-secondary">
        {label}
      </p>
      <p className="font-medium text-text-primary">{value}</p>
    </div>
  );
}

function getStatusStyles(status) {
  if (status === "AVAILABLE") return "bg-green-100 text-green-800";
  if (status === "HARVEST_SOON") return "bg-yellow-100 text-yellow-800";
  if (status === "FUTURE") return "bg-blue-100 text-blue-800";
  return "bg-gray-100 text-gray-700";
}

export default ListingDetails;

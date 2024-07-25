function MetricItem({ entry }: { entry: { label: string } }) {
  return (
    <div className="cursor-pointer border rounded-md hover:shadow-md p-4 col-span-1 flex items-center flex-col gap-5 text-xs text-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="63"
        height="48"
        viewBox="0 0 63 48"
        fill="none"
      >
        <path
          d="M31.5 0L38.7967 18.3111H62.4093L43.3063 29.6279L50.603 47.9389L31.5 36.6221L12.397 47.9389L19.6937 29.6279L0.590664 18.3111H24.2033L31.5 0Z"
          fill="black"
        />
      </svg>
      <h3>{entry.label}</h3>
    </div>
  );
}

export default MetricItem;

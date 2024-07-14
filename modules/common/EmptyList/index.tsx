export default function EmptyList({ text }: { text?: string }) {
  return (
    <div className="border w-full rounded-md flex items-center justify-center p-16 text-sm text-slate-600">
      {text ? text : "No Data Found"}
    </div>
  );
}

import { getHistoryData } from "@/app/(withNavigation)/history/getHistoryData";

export default async function Page() {
  const data = await getHistoryData();
  console.log(data);
  // Fetch data directly in a Server Component
  // Forward fetched data to your Client Component
  return (
    <div className={"w-full flex"}>
      {data.length > 0
        ? data.map((item, index) => (
            <div key={index} className="p-2 border border-gray-400 m-4 rounded text-blue-800">
              {item.search}
            </div>
          ))
        : "History is empty"}
    </div>
  );
}

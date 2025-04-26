interface Item {
  createdAt: string;
  itemName: string;
  quantity: number;
  unit: string;
  price: number;
}

interface ItemListCardProps {
  items: Item[];
  loading: boolean;
}

const ItemListCard = ({ items, loading }: ItemListCardProps) => {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow my-4">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md shadow-md w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Latest Items</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Item Name</th>
            <th className="border px-4 py-2 text-left">Quantity</th>
            <th className="border px-4 py-2 text-left">Unit</th>
            <th className="border px-4 py-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.createdAt}</td>
                <td className="border px-4 py-2">{item.itemName}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.unit}</td>
                <td className="border px-4 py-2">{item.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 text-center" colSpan={5}>
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemListCard;

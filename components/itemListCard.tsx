import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface Item {
  updatedAt: string;
  itemName: string;
  quantity: number;
  unit: string;
  price: number;
  id: string;
}

type ItemToEdit = {
  id: string;
  itemName: string;
  quantity?: number;
  unit: "KG" | "LTR" | "PC";
  price?: number;
};

interface ItemListCardProps {
  items: Item[];
  loading: boolean;
  onEdit: (item: ItemToEdit) => void;
  onDelete: (id: string) => void;
}

const ItemListCard = ({
  items,
  loading,
  onDelete,
  onEdit,
}: ItemListCardProps) => {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded shadow my-4 w-full max-w-3xl mx-auto">
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
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1 text-left text-sm sm:text-base">
                Date
              </th>
              <th className="border px-2 py-1 text-left text-sm sm:text-base">
                Item Name
              </th>
              <th className="border px-2 py-1 text-left text-sm sm:text-base">
                Quantity
              </th>
              <th className="border px-2 py-1 text-left text-sm sm:text-base">
                Unit
              </th>
              <th className="border px-2 py-1 text-left text-sm sm:text-base">
                Price
              </th>
              <th className="border px-2 py-1 text-left text-sm sm:text-base">
                Actions
              </th>{" "}
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index} className="hover:bg-green-100">
                  <td className="border px-2 py-1 text-sm sm:text-base">
                    {item.updatedAt}
                  </td>
                  <td className="border px-2 py-1 text-sm sm:text-base font-semibold">
                    {item.itemName}
                  </td>{" "}
                  <td className="border px-2 py-1 text-sm sm:text-base">
                    {item.quantity}
                  </td>
                  <td className="border px-2 py-1 text-sm sm:text-base">
                    {item.unit}
                  </td>
                  <td className="border px-2 py-1 text-sm sm:text-base text-green-700 font-semibold">
                    ৳{item.price.toLocaleString("en-BD")}
                  </td>{" "}
                  <td className="border px-2 py-1 text-sm sm:text-base">
                    <div className="flex flex-wrap gap-2">
                      {" "}
                      <button
                        onClick={() =>
                          onEdit({
                            id: item.id,
                            itemName: item.itemName,
                            quantity: item.quantity,
                            unit: item.unit as "KG" | "LTR" | "PC",
                            price: item.price,
                          })
                        }
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="border px-4 py-8 text-center text-gray-500 italic"
                  colSpan={6}
                >
                  No items found. Add your first item to get started!
                </td>{" "}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemListCard;

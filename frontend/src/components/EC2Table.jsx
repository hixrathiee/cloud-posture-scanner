import React, { useEffect, useState } from "react";
import { getInstances } from "../services/api";

function EC2Table() {
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const res = await getInstances();
        setInstances(res.data);
      } catch (error) {
        console.error("Error fetching EC2 instances:", error);
      }
    };

    fetchInstances();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 border-b">Instance ID</th>
              <th className="text-left px-4 py-3 border-b">Instance Type</th>
              <th className="text-left px-4 py-3 border-b">Public IP</th>
              <th className="text-left px-4 py-3 border-b">Security Groups</th>
            </tr>
          </thead>

          <tbody>
            {instances.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No instances found
                </td>
              </tr>
            ) : (
              instances.map((instance) => (
                <tr
                  key={instance.instanceId}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 border-b font-mono text-sm">
                    {instance.instanceId}
                  </td>

                  <td className="px-4 py-3 border-b">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                      {instance.instanceType}
                    </span>
                  </td>

                  <td className="px-4 py-3 border-b">
                    {instance.publicIp || "N/A"}
                  </td>

                  <td className="px-4 py-3 border-b">
                    {instance.securityGroups.join(", ")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EC2Table;
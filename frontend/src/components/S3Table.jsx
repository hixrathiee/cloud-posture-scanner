import React, { useEffect, useState } from "react";
import { getBuckets } from "../services/api";

function S3Table() {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const res = await getBuckets();
        setBuckets(res.data);
      } catch (error) {
        console.error("Error fetching buckets:", error);
      }
    };

    fetchBuckets();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
     
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 border-b">Bucket Name</th>
              <th className="text-left px-4 py-3 border-b">Region</th>
              <th className="text-left px-4 py-3 border-b">Encryption</th>
              <th className="text-left px-4 py-3 border-b">Public Access</th>
            </tr>
          </thead>

          <tbody>
            {buckets.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No buckets found
                </td>
              </tr>
            ) : (
              buckets.map((bucket) => (
                <tr
                  key={bucket.bucketName}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 border-b font-mono text-sm">
                    {bucket.bucketName}
                  </td>

                  <td className="px-4 py-3 border-b">
                    {bucket.region}
                  </td>

                  <td className="px-4 py-3 border-b">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      {bucket.encryption}
                    </span>
                  </td>

                  <td className="px-4 py-3 border-b">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        bucket.publicAccess === "Private"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {bucket.publicAccess}
                    </span>
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

export default S3Table;
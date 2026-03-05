import React, { useEffect, useState } from "react";
import { getCISResults } from "../services/api";

function CISResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await getCISResults();
        setResults(res.data);
      } catch (error) {
        console.error("Error fetching CIS results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 border-b">Check</th>
              <th className="text-left px-4 py-3 border-b">Resource</th>
              <th className="text-left px-4 py-3 border-b">Status</th>
              <th className="text-left px-4 py-3 border-b">Evidence</th>
            </tr>
          </thead>

          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No results found
                </td>
              </tr>
            ) : (
              results.map((r, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 border-b">{r.check}</td>

                  <td className="px-4 py-3 border-b font-mono text-sm">
                    {r.resource}
                  </td>

                  <td className="px-4 py-3 border-b">
                    <span
                      className={`px-3 py-1 rounded text-white text-xs font-medium ${r.status === "PASS"
                          ? "bg-green-500"
                          : "bg-red-500"
                        }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b text-sm text-gray-600">
                    {r.evidence}
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

export default CISResults;
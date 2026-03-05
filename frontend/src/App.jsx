import React from "react";
import EC2Table from "./components/EC2Table";
import S3Table from "./components/S3Table";
import CISResults from "./components/CISResults";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Cloud Posture Scanner Dashboard
      </h1>

      <div className="space-y-8">

        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-bold mb-4">EC2 Instances</h2>
          <EC2Table />
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-bold mb-4">S3 Buckets</h2>
          <S3Table />
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-bold mb-4">CIS Security Checks</h2>
          <CISResults />
        </div>

      </div>

    </div>
  );
}
export default App;
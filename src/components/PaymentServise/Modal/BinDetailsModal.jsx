/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Truck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BinDetailsModal = ({ showBinDetails, setShowBinDetails }) => {
  const binDetails = {
    id: 'BIN001',
    type: 'General Waste',
    location: '123 Green Street',
    capacity: '240L',
    lastEmptied: '2023-10-10',
    fillLevel: 15,
    monthlyData: [
      { month: 'May', waste: 180 },
      { month: 'Jun', waste: 200 },
      { month: 'Jul', waste: 220 },
      { month: 'Aug', waste: 190 },
      { month: 'Sep', waste: 210 },
      { month: 'Oct', waste: 230 },
    ]
  };

  return (
    <AnimatePresence>
      {showBinDetails && (
        <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div className="bg-white rounded-3xl shadow-2xl w-[700px] p-8">
            <h3 className="text-2xl font-bold text-emerald-600">Bin Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4>Bin ID: {binDetails.id}</h4>
                <p>Type: {binDetails.type}</p>
                <p>Location: {binDetails.location}</p>
                <p>Capacity: {binDetails.capacity}</p>
                <p>Last Emptied: {binDetails.lastEmptied}</p>
              </div>
              <div>
                <h4>Monthly Waste Collection</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={binDetails.monthlyData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="waste" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <button onClick={() => setShowBinDetails(false)} className="bg-emerald-500 text-white px-4 py-2 rounded-full">Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BinDetailsModal;

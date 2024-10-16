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
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-[700px] p-8"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Bin Details</h3>
              <motion.button
                onClick={() => setShowBinDetails(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                className="bg-emerald-100 dark:bg-emerald-800 p-4 rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-lg font-semibold mb-2">Bin ID: {binDetails.id}</h4>
                <p><span className="font-medium">Type:</span> {binDetails.type}</p>
                <p><span className="font-medium">Location:</span> {binDetails.location}</p>
                <p><span className="font-medium">Capacity:</span> {binDetails.capacity}</p>
                <p><span className="font-medium">Last Emptied:</span> {binDetails.lastEmptied}</p>
              </motion.div>

              <motion.div
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-lg font-semibold mb-2">Bin Collect Count</h4>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                        {binDetails.fillLevel}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-emerald-200">
                    <motion.div
                      style={{ width: `${binDetails.fillLevel}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${binDetails.fillLevel}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold mb-2">Monthly Waste Collection</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={binDetails.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="waste" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="bg-emerald-500 text-white px-4 py-2 rounded-full flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Truck className="h-5 w-5 mr-2" />
                Schedule Pickup
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BinDetailsModal;

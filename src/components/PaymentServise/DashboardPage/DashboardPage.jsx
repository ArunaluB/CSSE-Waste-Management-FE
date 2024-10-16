
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Trash2, User, Calendar, Truck, Archive, CreditCard, BarChart2, Settings,
  Sun, Moon, Plus, Award, TrendingUp, Info, X, CheckCircle, Check,
  DollarSign, Recycle, Leaf, Eye, Clock, FileText, ArrowRight, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentModal from '../Modal/PaymentModal';
import PaymentHistoryModal from '../Modal/PaymentHistoryModal';
import BinRegistrationModal from '../Modal/BinRegistrationModal';
import CompletionMessage from '../Modal/CompletionMessage';
import BinDetailsModal from '../Modal/BinDetailsModal';
const StatCard = ({ title, value, icon: Icon, trend, onClick, hasBin, children, isDarkMode }) => (
  <motion.div
    className={`relative p-6 rounded-3xl overflow-hidden group transition-all duration-500
    ${isDarkMode ? 'bg-gradient-to-br from-emerald-900 to-teal-800 text-emerald-100' : 'bg-gradient-to-br from-emerald-100 to-teal-200 text-emerald-900'}
    hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <Icon className={`h-8 w-8 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'} mb-4`} />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="flex items-end space-x-2">
      <p className="text-4xl font-bold">{value}</p>
      {trend && (
        <span className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
    {hasBin && (
      <motion.div
        className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <CheckCircle className="h-4 w-4" />
      </motion.div>
    )}
    {children}
  </motion.div>
);

const DashboardPage = ({ isDarkMode }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentHistoryModal, setShowPaymentHistoryModal] = useState(false);
  const [showBinRegistrationModal, setShowBinRegistrationModal] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [hasBin, setHasBin] = useState(false);
  const [showBinDetails, setShowBinDetails] = useState(false);


  return (
    <div className="pt-28 pb-20 px-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
            Recycling Dashboard
          </h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold flex items-center">
            <Award className="h-5 w-5 mr-2" />
            BLUE Badge
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard title="Next Payment Date" value="2024-05-25" icon={Trash2} trend={5.3} isDarkMode={isDarkMode} />
          <StatCard
            title="Recycling Bins"
            value={hasBin ? "1" : "0"}
            icon={Archive}
            trend={hasBin ? 100 : 0}
            onClick={() => setShowBinRegistrationModal(true)}
            hasBin={hasBin}
          >
            {/* Eye icon positioned at the bottom left */}
            <motion.div
              className="absolute bottom-2 right-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            ><Eye
                className="h-6 w-6 text-emerald-700"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent onClick event
                  setShowBinDetails(true); // Open modal
                }}
              />
            </motion.div>
          </StatCard>
          <StatCard title="Active Status" value="Active" icon={User} trend={0.8} isDarkMode={isDarkMode} />
          {/* <StatCard title="Monthly Payment" value="$4,000" icon={CreditCard} trend={7.2} isDarkMode={isDarkMode}>
            <Eye className="h-6 w-6 absolute bottom-2 right-2 text-emerald-700" />
          </StatCard> */}
          <StatCard
            title="Monthly Payment"
            value="$4,000"
            icon={CreditCard}
            trend={7.2}
            onClick={() => setShowPaymentModal(true)}
            isDarkMode={isDarkMode}
          >
            <motion.div
              className="absolute bottom-2 right-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Eye
                className="h-6 w-6 text-emerald-700"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent onClick event
                  setShowPaymentHistoryModal(true); // Open modal
                }}
              />
            </motion.div>
          </StatCard>
        </div>

        <div className={`p-6 rounded-3xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-12`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
              Recent Recycling Activity
            </h2>
            <button className={`px-4 py-2 rounded-full text-sm ${isDarkMode ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
              View All
            </button>
          </div>
          <ul className="space-y-4">
            {[1, 2, 3].map(i => (
              <li key={i} className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">BIN001</span>
                  <span className="font-semibold">Nuwan Kulasekara</span>
                  <span className="text-sm text-gray-500">2024-04-12</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Payment Modal */}
      {showPaymentModal && <PaymentModal showPaymentModal={showPaymentModal} setShowPaymentModal={setShowPaymentModal} />}
      {showPaymentHistoryModal && <PaymentHistoryModal showPaymentHistory={showPaymentHistoryModal} setShowPaymentHistory={setShowPaymentHistoryModal} />}
      {showBinRegistrationModal && (
        <BinRegistrationModal
          setShowBinRegistrationModal={setShowBinRegistrationModal}
          setShowCompletionMessage={setShowCompletionMessage}
          setHasBin={setHasBin}
          showBinRegistrationModal={showBinRegistrationModal}
        />
      )}
      {showCompletionMessage && <CompletionMessage showCompletionMessage={showCompletionMessage} setShowCompletionMessage={setShowCompletionMessage} />}
      {showBinDetails && <BinDetailsModal showBinDetails={showBinDetails} setShowBinDetails={setShowBinDetails} />}
    </div>
  );
};

export default DashboardPage;

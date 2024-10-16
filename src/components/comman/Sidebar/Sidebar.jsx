// Sidebar.js
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Trash2, User, Calendar, Truck, Archive, CreditCard, BarChart2, Settings } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="fixed left-0 top-0 h-full w-24 flex flex-col items-center py-24 space-y-8 bg-gray-100 shadow-light-neumorphic transition-colors duration-500">
            <Trash2 className="h-12 w-12 text-emerald-600" />
            {[
                { icon: BarChart2, label: 'Dashboard' },
                { icon: User, label: 'Users' },
                { icon: Calendar, label: 'Schedule' },
                { icon: Truck, label: 'Drivers' },
                { icon: Archive, label: 'Bins' },
                { icon: CreditCard, label: 'Payments' },
                { icon: Settings, label: 'Settings' },
            ].map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl text-emerald-700 hover:bg-emerald-50 transition-all duration-500 cursor-pointer transform hover:scale-110">
                    <item.icon className="h-6 w-6 mb-1" />
                    <span className="text-xs">{item.label}</span>
                </div>
            ))}
        </aside>
    );
};

export default Sidebar;

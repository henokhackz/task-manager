import React from 'react';
import { motion } from 'framer-motion';

const UserCard = ({
  title,
  description,
  count,
}: {
  title: string;
  description?: string;
  count: number;
}) => {
  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg p-6 border border-transparent hover:border-gray-300 transition-all duration-300 odd:bg-blue-300/20 even:bg-pink-300/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 md:text-md">
          {title}
        </h1>
        <div className="flex flex-col items-end">
          <p className="text-3xl font-medium text-gray-600">{count}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-600">{description}</p>
    </motion.div>
  );
};

export default UserCard;

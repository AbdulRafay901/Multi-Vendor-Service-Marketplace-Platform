import React from 'react';

const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl max-w-2xl mx-auto mt-6 text-center">
    <p className="font-bold">⚠️ Error Occurred</p>
    <p className="text-sm mt-1">{message}</p>
  </div>
);

export default ErrorMessage;
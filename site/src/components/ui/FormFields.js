import React from 'react';

export const InputField = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  placeholder = "", 
  className = "",
  required = false 
}) => (
  <div className={className}>
    <label className="block font-semibold mb-2 text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    />
  </div>
);

export const TextAreaField = ({ 
  label, 
  value, 
  onChange, 
  placeholder = "", 
  rows = 3, 
  className = "",
  required = false 
}) => (
  <div className={className}>
    <label className="block font-semibold mb-2 text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
    />
  </div>
);

export const SelectField = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  className = "",
  required = false 
}) => (
  <div className={className}>
    <label className="block font-semibold mb-2 text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export const ArrayField = ({ 
  label, 
  items = [], 
  onAdd, 
  onRemove, 
  onUpdate, 
  placeholder = "New item",
  required = false 
}) => (
  <div>
    <label className="block font-semibold mb-2 text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={item}
            onChange={(e) => onUpdate(index, e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-all"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-all"
      >
        + Add {label.slice(0, -1)}
      </button>
    </div>
  </div>
); 
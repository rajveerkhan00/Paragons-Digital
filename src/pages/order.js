import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const OrderForm = () => {
  const [serviceType, setServiceType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: '',
    quantity: 1,
    businessType: '',
    projectDeadline: '',
    portfolioStyle: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const serviceOptions = [
    { value: '', label: 'Select a service type' },
    { value: 'portfolio', label: 'Portfolio Website' },
    { value: 'business', label: 'Business Website' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'webapp', label: 'Web Application' },
    { value: 'marketing', label: 'Digital Marketing' },
    { value: 'branding', label: 'Branding Package' },
    { value: 'other', label: 'Other Project' }
  ];

  const portfolioStyles = [
    'Minimalist', 'Creative', 'Interactive', 
    'Gallery-Based', 'Video-Centric', 'Custom'
  ];

  const businessTypes = [
    'Startup', 'Small Business', 'Enterprise',
    'Non-Profit', 'Agency', 'Freelancer'
  ];

  const getAdditionalInfo = () => {
    const additionalInfo = {};
    switch(serviceType) {
      case 'portfolio':
        additionalInfo.portfolioStyle = formData.portfolioStyle;
        additionalInfo.projectsCount = formData.quantity;
        break;
      case 'business':
        additionalInfo.businessType = formData.businessType;
        additionalInfo.pagesCount = formData.quantity;
        break;
      case 'ecommerce':
        additionalInfo.productsCount = formData.quantity;
        additionalInfo.paymentGateway = formData.businessType;
        break;
      case 'webapp':
      case 'other':
        additionalInfo.deadline = formData.projectDeadline;
        additionalInfo.budget = formData.budget;
        break;
    }
    return additionalInfo;
  };

  const resetForm = () => {
    setServiceType('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      details: '',
      quantity: 1,
      businessType: '',
      projectDeadline: '',
      portfolioStyle: '',
      budget: ''
    });
  };

  const renderAdditionalFields = () => {
    switch(serviceType) {
      case 'portfolio':
        return (
          <>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Portfolio Style *</label>
              <select
                name="portfolioStyle"
                value={formData.portfolioStyle}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select preferred style</option>
                {portfolioStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Number of Projects to Showcase *</label>
              <input
                type="number"
                name="quantity"
                min="1"
                max="50"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        );
      case 'business':
        return (
          <>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Business Type *</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select your business type</option>
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Number of Pages Needed *</label>
              <input
                type="number"
                name="quantity"
                min="1"
                max="100"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </>
        );
      case 'ecommerce':
        return (
          <>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Approximate Number of Products *</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Payment Gateway Preference *</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select payment option</option>
                <option value="stripe">Stripe</option>
                <option value="paypal">PayPal</option>
                <option value="square">Square</option>
                <option value="custom">Custom Solution</option>
              </select>
            </div>
          </>
        );
      case 'webapp':
      case 'other':
        return (
          <>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Project Deadline *</label>
              <input
                type="date"
                name="projectDeadline"
                value={formData.projectDeadline}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-1">Estimated Budget (PKR) *</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select budget range</option>
                <option value="18000-30000">PKR 18,000 - 30,000</option>
                <option value="30000-45000">PKR 30,000 - 45,000</option>
                <option value="45000-70000">PKR 45,000 - 70,000</option>
                <option value="80000+">PKR 80,000+</option>
                <option value="custom">Custom Quote Needed</option>
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare submission data
      const submissionData = {
        serviceType: serviceOptions.find(opt => opt.value === serviceType)?.label || serviceType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        details: formData.details,
        additionalInfo: getAdditionalInfo(),
        submittedAt: new Date().toISOString()
      };

      // Send data to server endpoint which will handle both DB storage and email
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Service Type: ${submissionData.serviceType}\n\nDetails: ${formData.details}\n\nAdditional Info: ${JSON.stringify(submissionData.additionalInfo, null, 2)}`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast.success('Form submitted successfully! We will contact you soon.');
      resetForm();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Error submitting form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>      
    <Navbar />
    <div className="mt-20 min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <motion.div 
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">Service Request Form</h2>

        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-1">Service Type *</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            >
              {serviceOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-1">Full Name *</label>
            <input 
              type="text" 
              name="name"
              placeholder="Enter your name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-1">Email Address *</label>
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-1">Phone Number</label>
            <input 
              type="tel" 
              name="phone"
              placeholder="Enter your phone number" 
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>
          
          {serviceType && (
            <>
              {renderAdditionalFields()}
              
              <div>
                <label className="block text-gray-700 font-semibold text-sm sm:text-base mb-1">
                  {serviceType === 'portfolio' ? 'Specific Requirements' : 
                   serviceType === 'business' ? 'Business Goals' : 
                   'Project Details'} *
                </label>
                <textarea 
                  name="details"
                  placeholder={
                    serviceType === 'portfolio' ? 'Describe your work, preferred features, and any specific needs...' :
                    serviceType === 'business' ? 'Describe your business goals, target audience, and requirements...' :
                    'Describe your project in detail, including features and functionality needed...'
                  }
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
            </>
          )}
          
          <motion.button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition shadow-md font-semibold text-sm sm:text-base flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!serviceType || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : serviceType ? 'Submit Service Request' : 'Select Service to Continue'}
          </motion.button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Having trouble submitting? Email us directly at <a href="mailto:paragonsdigital@gmail.com" className="text-blue-600 hover:underline">paragonsdigital@gmail.com</a></p>
        </div>
      </motion.div>
    </div>
    <Footer />

    </>
  );
};

export default OrderForm;
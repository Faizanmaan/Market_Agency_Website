// Validation middleware for contact form
exports.validateContact = (req, res, next) => {
  const { name, email, message } = req.body;
  const errors = [];

  // Validate name
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  } else if (name.length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  // Validate email
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }

  // Validate message
  if (!message || message.trim().length === 0) {
    errors.push('Message is required');
  } else if (message.length > 1000) {
    errors.push('Message cannot exceed 1000 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

// Validation middleware for newsletter subscription
exports.validateEmail = (req, res, next) => {
  const { email } = req.body;
  const errors = [];

  // Validate email
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors
    });
  }

  next();
};

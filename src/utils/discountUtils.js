// Utility functions for discount code management

export const generateDiscountCode = (prefix = 'WANDOLO') => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `${prefix}-${timestamp}-${random}`.toUpperCase()
}

export const getDiscountPercentage = (userType = 'new') => {
  return 10 // 10% discount for new users
}

export const storeDiscountCode = (code, percentage, expiryDays = 30) => {
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + expiryDays)
  
  const discountData = {
    code,
    percentage,
    expiryDate: expiryDate.toISOString(),
    isUsed: false,
    isFirstBooking: true // Track if this is for first booking
  }
  
  localStorage.setItem('wandolo_discount_code', JSON.stringify(discountData))
}

export const getStoredDiscountCode = () => {
  try {
    const stored = localStorage.getItem('wandolo_discount_code')
    if (!stored) return null
    
    const discountData = JSON.parse(stored)
    const expiryDate = new Date(discountData.expiryDate)
    
    // Check if expired
    if (new Date() > expiryDate) {
      localStorage.removeItem('wandolo_discount_code')
      return null
    }
    
    // Check if already used
    if (discountData.isUsed) {
      return null
    }
    
    return discountData
  } catch (error) {
    console.error('Error parsing discount code:', error)
    return null
  }
}

export const markDiscountCodeAsUsed = () => {
  try {
    const stored = localStorage.getItem('wandolo_discount_code')
    if (!stored) return
    
    const discountData = JSON.parse(stored)
    discountData.isUsed = true
    discountData.isFirstBooking = false
    
    localStorage.setItem('wandolo_discount_code', JSON.stringify(discountData))
  } catch (error) {
    console.error('Error marking discount as used:', error)
  }
}

export const validateDiscountCode = (code) => {
  // Basic validation - check if it matches the stored code
  const storedDiscount = getStoredDiscountCode()
  if (!storedDiscount) return false
  
  return storedDiscount.code === code && !storedDiscount.isUsed
}

export const clearDiscountCode = () => {
  localStorage.removeItem('wandolo_discount_code')
}

export const hasValidDiscountCode = () => {
  const discountData = getStoredDiscountCode()
  return discountData !== null && !discountData.isUsed
}

// New function to check if this is the first booking
export const isFirstBooking = () => {
  const discountData = getStoredDiscountCode()
  return discountData !== null && discountData.isFirstBooking && !discountData.isUsed
}


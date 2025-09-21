'use client';

import { useState, useEffect } from 'react';

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      // Check screen width
      const screenWidth = window.innerWidth <= 768;
      
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        'android', 'webos', 'iphone', 'ipad', 'ipod', 
        'blackberry', 'windows phone', 'mobile'
      ];
      const userAgentMobile = mobileKeywords.some(keyword => 
        userAgent.includes(keyword)
      );

      // Check for touch capability
      const touchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0;

      // Device is mobile if any of these conditions are true
      const mobile = screenWidth || userAgentMobile || touchDevice;
      
      setIsMobile(mobile);
      setIsLoading(false);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    const handleResize = () => {
      checkMobile();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile, isLoading };
}
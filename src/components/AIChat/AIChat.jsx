import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChatbot } from '../../store/slices/uiSlice';
import styles from './AIChat.module.scss';

const AIChat = () => {
  const dispatch = useDispatch();
  const { chatbotOpen } = useSelector((state) => state.ui);
  const { tours } = useSelector((state) => state.tours);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Xin chào! Tôi là Wandolo AI, trợ lý du lịch của bạn. Tôi có thể giúp bạn tìm hiểu về các tour du lịch, địa điểm, giá cả và nhiều thông tin khác. Bạn có thể hỏi tôi bất cứ điều gì về các tour của chúng tôi!',
      timestamp: new Date(),
      suggestions: [
        "Tour nào rẻ nhất?",
        "Tour nào phù hợp cho người mới bắt đầu?",
        "Có tour nào ở Kon Tum không?",
        "Tour nào có cắm trại?"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add event listener for Escape key and click outside
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && chatbotOpen) {
        dispatch(toggleChatbot());
      }
    };

      const handleClickOutside = (e) => {
    if (chatbotOpen) {
      // Check if click is outside the chat container
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        console.log('Click outside detected');
        dispatch(toggleChatbot());
      }
    }
  };

  const handleDocumentClick = (e) => {
    if (chatbotOpen) {
      const overlay = document.querySelector(`.${styles.chatbotOverlay}`);
      if (overlay && e.target === overlay) {
        console.log('Document click on overlay');
        dispatch(toggleChatbot());
      }
    }
  };

    if (chatbotOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [chatbotOpen, dispatch]);

  // Suggested questions
  const suggestedQuestions = [
    "Tour nào phù hợp cho người mới bắt đầu?",
    "Có tour nào dưới 3 triệu không?",
    "Tour nào có hướng dẫn viên nữ?",
    "Có tour nào 3 ngày 2 đêm không?",
    "Tour nào có cắm trại?",
    "Có tour nào ở Kon Tum không?",
    "Tour nào khó nhất?",
    "Có tour nào ở Bảo Lộc không?"
  ];

  // AI response function with suggestions
  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    console.log('Processing message:', userMessage);
    console.log('Tours available:', tours.length);
    
    // Check for specific tour price queries (e.g., "Giá tour Hồn Churu")
    if (lowerMessage.includes('giá tour') || lowerMessage.includes('giá của tour')) {
      console.log('Processing specific tour price query');
      
      // Extract tour name from message
      let tourName = '';
      if (lowerMessage.includes('giá tour')) {
        tourName = userMessage.substring(userMessage.toLowerCase().indexOf('giá tour') + 9).trim();
      } else if (lowerMessage.includes('giá của tour')) {
        tourName = userMessage.substring(userMessage.toLowerCase().indexOf('giá của tour') + 13).trim();
      }
      
      console.log('Extracted tour name:', tourName);
      
      // Find matching tour
      const matchingTour = tours.find(tour => {
        const tourTitleLower = tour.title.toLowerCase();
        const tourNameLower = tourName.toLowerCase();
        
        // Exact match
        if (tourTitleLower === tourNameLower) return true;
        
        // Contains match
        if (tourTitleLower.includes(tourNameLower) || tourNameLower.includes(tourTitleLower)) return true;
        
        // Word match
        const tourWords = tourTitleLower.split(' ');
        const nameWords = tourNameLower.split(' ');
        return tourWords.some(word => nameWords.includes(word)) || 
               nameWords.some(word => tourWords.includes(word));
      });
      
      console.log('Matching tour:', matchingTour);
      
      if (matchingTour) {
        return {
          content: `💰 Giá tour "${matchingTour.title}":

• Giá: ${matchingTour.price.toLocaleString('vi-VN')}đ
• Thời gian: ${matchingTour.duration}
• Số người tối đa: ${matchingTour.maxPeople} người

💡 Bao gồm trong giá:
${matchingTour.included.map(item => `• ${item}`).join('\n')}

Bạn có muốn biết thêm về lịch trình hoặc yêu cầu tham gia không?`,
          suggestions: [
            `Lịch trình tour "${matchingTour.title}"`,
            `Yêu cầu tham gia tour "${matchingTour.title}"`,
            `Điểm nổi bật tour "${matchingTour.title}"`,
            "Tour nào rẻ hơn?"
          ]
        };
      }
    }
    
    // Check for general price-related queries
    if (lowerMessage.includes('giá') || lowerMessage.includes('tiền') || lowerMessage.includes('bao nhiêu')) {
      console.log('Processing general price query');
      const toursByPrice = tours.sort((a, b) => a.price - b.price);
      const cheapestTour = toursByPrice[0];
      const mostExpensiveTour = toursByPrice[toursByPrice.length - 1];
      
      console.log('Cheapest tour:', cheapestTour);
      console.log('Most expensive tour:', mostExpensiveTour);
      
      return {
        content: `Hiện tại chúng tôi có ${tours.length} tour với giá từ ${cheapestTour.price.toLocaleString('vi-VN')}đ đến ${mostExpensiveTour.price.toLocaleString('vi-VN')}đ. 

💰 Tour rẻ nhất: "${cheapestTour.title}" - ${cheapestTour.price.toLocaleString('vi-VN')}đ
💰 Tour đắt nhất: "${mostExpensiveTour.title}" - ${mostExpensiveTour.price.toLocaleString('vi-VN')}đ

Bạn có muốn tôi giới thiệu chi tiết về tour nào không?`,
        suggestions: [
          `Chi tiết tour "${cheapestTour.title}"`,
          `Chi tiết tour "${mostExpensiveTour.title}"`,
          "Tour nào dưới 3 triệu?",
          "Tour nào ở Kon Tum?"
        ]
      };
    }
    
    // Check for location queries
    if (lowerMessage.includes('kon tum') || lowerMessage.includes('kon klor')) {
      const konTumTours = tours.filter(tour => tour.location.toLowerCase().includes('kon tum'));
      if (konTumTours.length > 0) {
        return {
          content: `Chúng tôi có ${konTumTours.length} tour ở Kon Tum:

${konTumTours.map(tour => `📍 "${tour.title}" - ${tour.price.toLocaleString('vi-VN')}đ (${tour.duration})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: konTumTours.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      }
    }
    
    if (lowerMessage.includes('gia lai') || lowerMessage.includes('tơ nưng')) {
      const giaLaiTours = tours.filter(tour => tour.location.toLowerCase().includes('gia lai'));
      if (giaLaiTours.length > 0) {
        return {
          content: `Chúng tôi có ${giaLaiTours.length} tour ở Gia Lai:

${giaLaiTours.map(tour => `📍 "${tour.title}" - ${tour.price.toLocaleString('vi-VN')}đ (${tour.duration})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: giaLaiTours.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      }
    }
    
    if (lowerMessage.includes('bảo lộc') || lowerMessage.includes('lâm đồng')) {
      const baoLocTours = tours.filter(tour => tour.location.toLowerCase().includes('bảo lộc') || tour.location.toLowerCase().includes('lâm đồng'));
      if (baoLocTours.length > 0) {
        return {
          content: `Chúng tôi có ${baoLocTours.length} tour ở Bảo Lộc, Lâm Đồng:

${baoLocTours.map(tour => `📍 "${tour.title}" - ${tour.price.toLocaleString('vi-VN')}đ (${tour.duration})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: baoLocTours.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      }
    }
    
    if (lowerMessage.includes('đắk lắk') || lowerMessage.includes('yok đôn')) {
      const dakLakTours = tours.filter(tour => tour.location.toLowerCase().includes('đắk lắk') || tour.location.toLowerCase().includes('yok đôn'));
      if (dakLakTours.length > 0) {
        return {
          content: `Chúng tôi có ${dakLakTours.length} tour ở Đắk Lắk:

${dakLakTours.map(tour => `📍 "${tour.title}" - ${tour.price.toLocaleString('vi-VN')}đ (${tour.duration})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: dakLakTours.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      }
    }
    
    // Check for duration queries
    if (lowerMessage.includes('2 ngày') || lowerMessage.includes('2 đêm')) {
      const twoDayTours = tours.filter(tour => tour.duration.includes('2 ngày'));
      if (twoDayTours.length > 0) {
        return {
          content: `Chúng tôi có ${twoDayTours.length} tour 2 ngày 1 đêm:

${twoDayTours.map(tour => `⏱️ "${tour.title}" - ${tour.price.toLocaleString('vi-VN')}đ (${tour.location})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: twoDayTours.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      }
    }
    
    if (lowerMessage.includes('3 ngày') || lowerMessage.includes('3 đêm')) {
      const threeDayTours = tours.filter(tour => tour.duration.includes('3 ngày'));
      if (threeDayTours.length > 0) {
        return {
          content: `Chúng tôi có ${threeDayTours.length} tour 3 ngày 2 đêm:

${threeDayTours.map(tour => `⏱️ "${tour.title}" - ${tour.price.toLocaleString('vi-VN')}đ (${tour.location})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: threeDayTours.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      }
    }
    
    // Check for difficulty queries
    if (lowerMessage.includes('dễ') || lowerMessage.includes('mới bắt đầu')) {
      const easyTours = tours.filter(tour => tour.difficulty === 'Dễ');
      if (easyTours.length > 0) {
        return {
          content: `Chúng tôi có ${easyTours.length} tour phù hợp cho người mới bắt đầu:

${easyTours.map(tour => `⭐ "${tour.title}" - ${tour.price.toLocaleString('vi-VN')}đ (${tour.location})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: easyTours.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      }
    }
    
    if (lowerMessage.includes('khó') || lowerMessage.includes('thử thách')) {
      const hardTours = tours.filter(tour => tour.difficulty === 'Khó');
      if (hardTours.length > 0) {
        return {
          content: `Chúng tôi có ${hardTours.length} tour dành cho người có kinh nghiệm:

${hardTours.map(tour => `🔥 "${tour.title}" - ${tour.price.toLocaleString('vi-VN')}đ (${tour.location})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: hardTours.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      }
    }
    
    // Check for camping queries
    if (lowerMessage.includes('cắm trại') || lowerMessage.includes('camping')) {
      const campingTours = tours.filter(tour => 
        tour.highlights.some(highlight => highlight.toLowerCase().includes('cắm trại')) ||
        tour.included.some(item => item.toLowerCase().includes('cắm trại'))
      );
      if (campingTours.length > 0) {
        return {
          content: `Chúng tôi có ${campingTours.length} tour có cắm trại:

${campingTours.map(tour => `🏕️ "${tour.title}" - ${tour.price.toLocaleString('vi-VN')}đ (${tour.location})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: campingTours.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      }
    }
    
    // Check for guide queries
    if (lowerMessage.includes('hướng dẫn viên') || lowerMessage.includes('guide')) {
      const femaleGuides = tours.filter(tour => tour.guide.name.includes('Thị'));
      const maleGuides = tours.filter(tour => tour.guide.name.includes('Văn') || tour.guide.name.includes('Lê') || tour.guide.name.includes('Phạm'));
      
      if (lowerMessage.includes('nữ')) {
        return {
          content: `Chúng tôi có ${femaleGuides.length} tour với hướng dẫn viên nữ:

${femaleGuides.map(tour => `👩‍💼 "${tour.title}" - ${tour.guide.name} (${tour.guide.experience})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: femaleGuides.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      } else if (lowerMessage.includes('nam')) {
        return {
          content: `Chúng tôi có ${maleGuides.length} tour với hướng dẫn viên nam:

${maleGuides.map(tour => `👨‍💼 "${tour.title}" - ${tour.guide.name} (${tour.guide.experience})`).join('\n')}

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: maleGuides.map(tour => `Chi tiết tour "${tour.title}"`)
        };
      } else {
        return {
          content: `Chúng tôi có ${tours.length} tour với hướng dẫn viên chuyên nghiệp:

👩‍💼 ${femaleGuides.length} tour với hướng dẫn viên nữ
👨‍💼 ${maleGuides.length} tour với hướng dẫn viên nam

Bạn muốn biết thêm thông tin về tour nào?`,
          suggestions: [
            "Tour có hướng dẫn viên nữ",
            "Tour có hướng dẫn viên nam",
            "Tour nào rẻ nhất?"
          ]
        };
      }
    }
    
    // Check for specific tour queries with detailed questions
    for (let i = 0; i < tours.length; i++) {
      const tour = tours[i];
      console.log('Checking tour:', tour.title);
      console.log('Message contains tour title?', lowerMessage.includes(tour.title.toLowerCase()));
      console.log('Message contains location?', lowerMessage.includes(tour.location.toLowerCase()));
      
      // Check if message contains tour title or location
      const titleMatch = lowerMessage.includes(tour.title.toLowerCase());
      const locationMatch = lowerMessage.includes(tour.location.toLowerCase());
      
      // Also check for partial matches (key words from title)
      const titleWords = tour.title.toLowerCase().split(' ');
      const hasPartialMatch = titleWords.some(word => 
        word.length > 2 && lowerMessage.includes(word)
      );
      
      console.log('Title words:', titleWords);
      console.log('Has partial match?', hasPartialMatch);
      
      if (titleMatch || locationMatch || hasPartialMatch) {
        
        // Check for specific questions about this tour
        if (lowerMessage.includes('giá') || lowerMessage.includes('tiền') || lowerMessage.includes('bao nhiêu')) {
          console.log('Processing price query for specific tour:', tour.title);
          console.log('Tour data:', tour);
          
          return {
            content: `💰 Giá tour "${tour.title}":

• Giá: ${tour.price.toLocaleString('vi-VN')}đ
• Thời gian: ${tour.duration}
• Số người tối đa: ${tour.maxPeople} người

💡 Bao gồm trong giá:
${tour.included.map(item => `• ${item}`).join('\n')}

Bạn có muốn biết thêm về lịch trình hoặc yêu cầu tham gia không?`,
            suggestions: [
              `Lịch trình tour "${tour.title}"`,
              `Yêu cầu tham gia tour "${tour.title}"`,
              `Điểm nổi bật tour "${tour.title}"`,
              "Tour nào rẻ hơn?"
            ]
          };
        }
        
        if (lowerMessage.includes('lịch trình') || lowerMessage.includes('itinerary') || lowerMessage.includes('ngày')) {
          return {
            content: `📅 Lịch trình tour "${tour.title}":

${Object.entries(tour.itinerary).map(([day, data]) => `
${data.title}
${data.activities.map(activity => `• ${activity}`).join('\n')}
`).join('\n')}

Bạn có muốn biết thêm về yêu cầu tham gia hoặc điểm nổi bật không?`,
            suggestions: [
              `Yêu cầu tham gia tour "${tour.title}"`,
              `Điểm nổi bật tour "${tour.title}"`,
              `Giá tour "${tour.title}"`,
              "Tour nào tương tự?"
            ]
          };
        }
        
        if (lowerMessage.includes('yêu cầu') || lowerMessage.includes('chuẩn bị') || lowerMessage.includes('requirements')) {
          return {
            content: `📋 Yêu cầu tham gia tour "${tour.title}":

💪 Thể lực: ${tour.requirements.fitness}

👥 Độ tuổi: ${tour.requirements.ageRange}

🎒 Chuẩn bị: ${tour.requirements.preparation}

⭐ Độ khó: ${tour.difficulty}

Bạn có muốn biết thêm về lịch trình hoặc điểm nổi bật không?`,
            suggestions: [
              `Lịch trình tour "${tour.title}"`,
              `Điểm nổi bật tour "${tour.title}"`,
              `Giá tour "${tour.title}"`,
              "Tour nào dễ hơn?"
            ]
          };
        }
        
        if (lowerMessage.includes('điểm nổi bật') || lowerMessage.includes('highlights') || lowerMessage.includes('đặc biệt')) {
          return {
            content: `🎯 Điểm nổi bật tour "${tour.title}":

${tour.highlights.map(highlight => `• ${highlight}`).join('\n')}

📍 Địa điểm: ${tour.location}
⏱️ Thời gian: ${tour.duration}
💰 Giá: ${tour.price.toLocaleString('vi-VN')}đ

Bạn có muốn biết thêm về lịch trình hoặc yêu cầu tham gia không?`,
            suggestions: [
              `Lịch trình tour "${tour.title}"`,
              `Yêu cầu tham gia tour "${tour.title}"`,
              `Giá tour "${tour.title}"`,
              "Tour nào tương tự?"
            ]
          };
        }
        
        if (lowerMessage.includes('hướng dẫn viên') || lowerMessage.includes('guide')) {
          return {
            content: `👨‍💼 Hướng dẫn viên tour "${tour.title}":

Tên: ${tour.guide.name}
Kinh nghiệm: ${tour.guide.experience}
Tuổi: ${tour.guide.age} tuổi
Đánh giá: ${tour.guide.rating}/5
Tours đã hoàn thành: ${tour.guide.toursCompleted}
Ngôn ngữ: ${tour.guide.languages.join(', ')}

Chuyên môn: ${tour.guide.specialties.join(', ')}

Chứng chỉ:
${tour.guide.certificates.map(cert => `• ${cert.name} (${cert.year})`).join('\n')}

Bạn có muốn biết thêm về lịch trình hoặc yêu cầu tham gia không?`,
            suggestions: [
              `Lịch trình tour "${tour.title}"`,
              `Yêu cầu tham gia tour "${tour.title}"`,
              `Giá tour "${tour.title}"`,
              "Tour nào có hướng dẫn viên khác?"
            ]
          };
        }
        
        // Default tour information
        return {
          content: `"${tour.title}" là một tour tuyệt vời! Đây là thông tin chi tiết:

📍 Địa điểm: ${tour.location}
⏱️ Thời gian: ${tour.duration}
💰 Giá: ${tour.price.toLocaleString('vi-VN')}đ
⭐ Độ khó: ${tour.difficulty}
👥 Số người tối đa: ${tour.maxPeople}
👨‍💼 Hướng dẫn viên: ${tour.guide.name} (${tour.guide.experience})
⭐ Đánh giá: ${tour.rating}/5 (${tour.reviewCount} đánh giá)

${tour.description}

🎯 Điểm nổi bật:
${tour.highlights.map(highlight => `• ${highlight}`).join('\n')}

✅ Bao gồm:
${tour.included.map(item => `• ${item}`).join('\n')}

Bạn có muốn biết thêm về lịch trình, thông tin hướng dẫn viên hoặc yêu cầu tham gia không?`,
          suggestions: [
            `Giá tour "${tour.title}"`,
            `Lịch trình tour "${tour.title}"`,
            `Yêu cầu tham gia tour "${tour.title}"`,
            `Điểm nổi bật tour "${tour.title}"`
          ]
        };
      }
    }
    
    // Check for itinerary queries
    if (lowerMessage.includes('lịch trình') || lowerMessage.includes('itinerary')) {
      return {
        content: `📅 Lịch trình các tour:

Tôi có thể cung cấp lịch trình chi tiết cho từng tour. Bạn muốn biết lịch trình của tour nào?

${tours.map(tour => `• "${tour.title}" (${tour.duration})`).join('\n')}

Mỗi tour có lịch trình riêng với các hoạt động thú vị khác nhau.`,
        suggestions: tours.map(tour => `Lịch trình tour "${tour.title}"`)
      };
    }
    
    // Check for highlights queries
    if (lowerMessage.includes('điểm nổi bật') || lowerMessage.includes('highlights')) {
      return {
        content: `🎯 Điểm nổi bật các tour:

Mỗi tour đều có những điểm nổi bật riêng biệt. Bạn muốn biết điểm nổi bật của tour nào?

${tours.map(tour => `• "${tour.title}" - ${tour.highlights.slice(0, 2).join(', ')}...`).join('\n')}

Mỗi tour có những trải nghiệm độc đáo khác nhau.`,
        suggestions: tours.map(tour => `Điểm nổi bật tour "${tour.title}"`)
      };
    }
    
    // Check for requirements queries
    if (lowerMessage.includes('yêu cầu') || lowerMessage.includes('chuẩn bị') || lowerMessage.includes('requirements')) {
      return {
        content: `📋 Yêu cầu tham gia các tour:

Mỗi tour có những yêu cầu khác nhau về thể lực và chuẩn bị. Bạn muốn biết yêu cầu của tour nào?

${tours.map(tour => `• "${tour.title}" (${tour.difficulty}) - ${tour.requirements.ageRange}`).join('\n')}

Từ tour dễ cho người mới bắt đầu đến tour khó cho người có kinh nghiệm.`,
        suggestions: tours.map(tour => `Yêu cầu tour "${tour.title}"`)
      };
    }
    
    // Default response
    console.log('No specific match found, returning default response');
    return {
      content: `Tôi hiểu bạn đang tìm kiếm thông tin về tour du lịch. Hiện tại chúng tôi có ${tours.length} tour khác nhau với giá từ ${Math.min(...tours.map(t => t.price)).toLocaleString('vi-VN')}đ đến ${Math.max(...tours.map(t => t.price)).toLocaleString('vi-VN')}đ.

Bạn có thể hỏi tôi về:
• Giá cả các tour
• Địa điểm cụ thể (Kon Tum, Gia Lai, Bảo Lộc, Đắk Lắk)
• Thời gian tour (2 ngày, 3 ngày)
• Độ khó của tour (Dễ - Mức độ cho người bắt đầu, Trung bình, Khó)
• Hướng dẫn viên (nam/nữ)
• Lịch trình chi tiết
• Điểm nổi bật
• Yêu cầu tham gia
• Hoặc bất kỳ thông tin nào khác!`,
      suggestions: [
        "Tour nào rẻ nhất?",
        "Tour nào phù hợp cho người mới bắt đầu?",
        "Có tour nào ở Kon Tum không?",
        "Tour nào có cắm trại?"
      ]
    };
  };

  const handleSendMessage = async (message = inputValue) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
    
    // Close chat when pressing Escape
    if (e.key === 'Escape') {
      dispatch(toggleChatbot());
    }
  };

  const handleOverlayClick = (e) => {
    // Close chat when clicking on overlay
    console.log('Overlay clicked');
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleChatbot());
  };

  const handleContainerClick = (e) => {
    // Prevent closing when clicking inside the chat container
    e.stopPropagation();
  };

  return (
    <div className={`${styles.chatbotWidget} ${chatbotOpen ? styles.open : ''}`}>
      {chatbotOpen && (
        <>
          <div 
            className={styles.chatbotOverlay} 
            onClick={handleOverlayClick}
            onMouseDown={handleOverlayClick}
            style={{ pointerEvents: 'auto' }}
          ></div>
          <div 
            ref={containerRef}
            className={styles.chatbotContainer}
            onClick={handleContainerClick}
          >
            <div className={styles.chatbotHeader}>
              <div className={styles.chatbotTitle}>
                <div className={styles.aiAvatar}>
                  <span>🤖</span>
                </div>
                <div>
                  <h3>Wandolo AI</h3>
                  {/* <p>Trợ lý du lịch thông minh</p> */}
                </div>
              </div>
              <div className={styles.headerButtons}>
                <button 
                  className={styles.minimizeButton}
                  onClick={() => dispatch(toggleChatbot())}
                  title="Thu nhỏ"
                >
                  −
                </button>
                <button 
                  className={styles.closeButton}
                  onClick={() => dispatch(toggleChatbot())}
                  title="Đóng"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className={styles.chatbotBody}>
              <div className={styles.messagesContainer}>
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`${styles.message} ${styles[message.type]}`}
                  >
                    <div className={styles.messageContent}>
                      {message.content}
                    </div>
                    {message.type === 'ai' && message.suggestions && (
                      <div className={styles.messageSuggestions}>
                        <div className={styles.suggestionGrid}>
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              className={styles.suggestionButton}
                              onClick={() => handleSuggestedQuestion(suggestion)}
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className={styles.messageTime}>
                      {message.timestamp.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className={`${styles.message} ${styles.ai}`}>
                    <div className={styles.typingIndicator}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>


            </div>

            <div className={styles.chatbotFooter}>
              <div className={styles.inputContainer}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập câu hỏi của bạn..."
                  className={styles.messageInput}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className={styles.sendButton}
                >
                  <span>➤</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChat; 
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleChatbot } from '../../store/slices/uiSlice';
import styles from './AIChatButton.module.scss';

const AIChatButton = () => {
  const dispatch = useDispatch();
  const { chatbotOpen } = useSelector((state) => state.ui);

  const handleClick = () => {
    dispatch(toggleChatbot());
  };

  // Không hiển thị button khi chat đã mở
  if (chatbotOpen) return null;

  return (
    <button className={styles.aiChatButton} onClick={handleClick}>
      <div className={styles.buttonContent}>
        <div className={styles.aiIcon}>
          <span>🤖</span>
        </div>
        <div className={styles.buttonText}>
          <span className={styles.title}>Wandolo AI</span>
          <span className={styles.subtitle}>Hỏi tôi về tour</span>
        </div>
      </div>
      <div className={styles.pulse}></div>
    </button>
  );
};

export default AIChatButton; 
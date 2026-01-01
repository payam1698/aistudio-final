
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  contentId: string;
  contentType: 'course' | 'blog';
  text: string;
  rating?: number;
  status: 'pending' | 'approved';
  createdAt: string;
}

interface CommentContextType {
  addComment: (comment: Omit<Comment, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  approveComment: (id: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  getCommentsByContentId: (contentId: string) => Promise<Comment[]>;
  getPendingComments: () => Promise<Comment[]>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const addComment = async (data: Omit<Comment, 'id' | 'status' | 'createdAt'>) => {
    await api.comments.add(data);
  };

  const approveComment = async (id: string) => {
    await api.comments.moderate(id, 'approve');
  };

  const deleteComment = async (id: string) => {
    await api.comments.moderate(id, 'delete');
  };

  const getCommentsByContentId = async (contentId: string) => {
    return await api.comments.getByContent(contentId);
  };

  const getPendingComments = async () => {
    return await api.comments.getPending();
  };

  return (
    <CommentContext.Provider value={{ 
      addComment, approveComment, deleteComment, 
      getCommentsByContentId, getPendingComments 
    }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};

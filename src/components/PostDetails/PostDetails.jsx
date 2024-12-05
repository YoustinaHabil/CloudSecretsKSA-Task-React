import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { postSchema } from '../../validations/postSchema';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import Toast from '../Toast/Toast';
import './PostDetails.css';
import { useTranslation } from 'react-i18next';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(postSchema)
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await response.json();
        setPost(data);
        reset(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: post.id,
          ...data,
          userId: post.userId
        }),
        headers: {
          'Content-type': 'application/json'
        }
      });

      if (response.status === 200) {
        setIsEditing(false);
        setToast({ show: true, message: 'Post updated successfully!', type: 'success' });
      }
    } catch (error) {
      setToast({ show: true, message: 'Error updating post', type: 'error' });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
      });

      if (response.status === 200) {
        setToast({ show: true, message: 'product deleted successfully!', type: 'success' });
        setTimeout(() => navigate('/products'), 2000);
      }
    } catch (error) {
      setToast({ show: true, message: 'Error deleting product', type: 'error' });
    }
    setShowDeleteModal(false);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div className="post-details-container">
      <button className="back-button" onClick={() => navigate('/products')}>
        {t('productsDetails.backToproducts')}
      </button>
      <div className="post-details-card">
        <h2>{t('productsDetails.title')}</h2>
        <div className="post-header">
          <span className="post-id">#{post.id}</span>
          <div className="button-group">
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              {t('productsDetails.editPost')}
            </button>
            <button 
              className="delete-button"
              onClick={() => setShowDeleteModal(true)}
            >
              {t('productsDetails.deletePost')}
            </button>
          </div>
        </div>

        {!isEditing ? (
          <>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                {...register('title')}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && (
                <span className="error-message">{errors.title.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="body">Description</label>
              <textarea
                id="body"
                {...register('body')}
                className={errors.body ? 'error' : ''}
              />
              {errors.body && (
                <span className="error-message">{errors.body.message}</span>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                {t('productsDetails.saveChanges')}
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setIsEditing(false);
                  reset(post);
                }}
              >
                {t('postDetails.cancelEdit')}
              </button>
            </div>
          </form>
        )}
      </div>

      {showDeleteModal && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default PostDetails; 
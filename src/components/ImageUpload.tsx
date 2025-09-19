'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  placeholder?: string;
  className?: string;
}

export default function ImageUpload({ 
  onUpload, 
  currentImage, 
  placeholder = "Bild hochladen",
  className = "" 
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    // Sofortige Vorschau
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        // Cleanup object URL
        URL.revokeObjectURL(objectUrl);
        setPreviewUrl(result.url);
        onUpload(result.url);
      } else {
        // Fehler - Vorschau zurücksetzen
        URL.revokeObjectURL(objectUrl);
        setPreviewUrl(currentImage || '');
        alert(result.error || 'Upload fehlgeschlagen');
      }
    } catch (error) {
      // Fehler - Vorschau zurücksetzen
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl(currentImage || '');
      console.error('Upload error:', error);
      alert('Upload fehlgeschlagen');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const removeImage = () => {
    setPreviewUrl('');
    onUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {previewUrl ? (
        // Bildvorschau mit Entfernen-Button
        <div className="relative group">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-600">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="text-white">Wird hochgeladen...</div>
            </div>
          )}
        </div>
      ) : (
        // Upload-Bereich
        <div
          className={`
            relative w-full h-48 border-2 border-dashed rounded-lg
            flex flex-col items-center justify-center
            cursor-pointer transition-colors
            ${dragActive 
              ? 'border-purple-400 bg-purple-50/10' 
              : 'border-gray-600 hover:border-gray-400'
            }
            ${isUploading ? 'pointer-events-none opacity-50' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-2 text-gray-400">
            {isUploading ? (
              <>
                <Upload className="animate-bounce" size={24} />
                <span>Wird hochgeladen...</span>
              </>
            ) : (
              <>
                <ImageIcon size={24} />
                <span className="text-sm text-center">
                  {placeholder}<br />
                  <span className="text-xs">oder per Drag & Drop</span>
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
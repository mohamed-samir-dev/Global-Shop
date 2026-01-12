import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageModal({ isOpen, images, currentIndex, onClose, onNavigate }: ImageModalProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const minSwipeDistance = 50;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < (images?.length || 0) - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setDragStart(e.clientX);
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    e.preventDefault();
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    const distance = dragStart - e.clientX;
    const isLeftDrag = distance > minSwipeDistance;
    const isRightDrag = distance < -minSwipeDistance;

    if (isLeftDrag) goToNext();
    if (isRightDrag) goToPrevious();
    
    setIsDragging(false);
    setDragStart(null);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, currentIndex, onClose]);

  if (!isOpen || !images?.length) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="relative max-w-2xl max-h-[80vh] w-full animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 z-10 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        {(images?.length || 0) > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === (images?.length || 0) - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 backdrop-blur-sm disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        
        <div 
          className={`relative bg-white rounded-2xl overflow-hidden shadow-2xl ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => {
            setIsDragging(false);
            setDragStart(null);
          }}
        >
          <Image
            src={images?.[currentIndex] || ''}
            alt={`Image ${currentIndex + 1} of ${images?.length || 0}`}
            width={1200}
            height={800}
            className={`w-full h-auto max-h-[80vh] object-contain select-none ${isDragging ? 'pointer-events-none' : ''}`}
            priority
            draggable={false}
          />
          {(images?.length || 0) > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {currentIndex + 1} / {images?.length || 0}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import { listCeltaTrainers, CeltaTrainer } from "@/lib/firebase/celtaTrainers";

const BIO_PREVIEW_LENGTH = 300; // Characters for preview

export default function Trainers() {
  const [trainers, setTrainers] = useState<CeltaTrainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        setLoading(true);
        const data = await listCeltaTrainers(true); // activeOnly = true
        setTrainers(data);
        setError(null);
      } catch (err: any) {
        console.error("Error loading trainers:", err);
        setError("Failed to load trainers");
        setTrainers([]);
      } finally {
        setLoading(false);
      }
    };

    loadTrainers();
  }, []);

  if (loading) {
    return (
      <section className="mb-16">
        <SectionHeading>Meet the Trainers</SectionHeading>
        <p className="text-gray-600 text-center">Loading trainers...</p>
      </section>
    );
  }

  if (error || trainers.length === 0) {
    return null; // Don't show section if no trainers
  }

  const toggleExpand = (trainerId: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(trainerId)) {
        newSet.delete(trainerId);
      } else {
        newSet.add(trainerId);
      }
      return newSet;
    });
  };

  const getBioPreview = (bio: string): string => {
    if (bio.length <= BIO_PREVIEW_LENGTH) {
      return bio;
    }
    // Find a good breaking point (end of sentence or word)
    const preview = bio.substring(0, BIO_PREVIEW_LENGTH);
    const lastPeriod = preview.lastIndexOf(".");
    const lastSpace = preview.lastIndexOf(" ");
    
    if (lastPeriod > BIO_PREVIEW_LENGTH * 0.7) {
      return preview.substring(0, lastPeriod + 1);
    }
    if (lastSpace > BIO_PREVIEW_LENGTH * 0.7) {
      return preview.substring(0, lastSpace);
    }
    return preview + "...";
  };

  return (
    <section className="mb-16">
      <SectionHeading>Meet the Trainers</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {trainers.map((trainer) => {
          const isExpanded = expandedIds.has(trainer.id || "");
          const bioPreview = getBioPreview(trainer.bio);
          const showReadMore = trainer.bio.length > BIO_PREVIEW_LENGTH;

          return (
            <div key={trainer.id} className="bg-white border border-gray-200 rounded-lg p-6">
              {/* Photo */}
              <div className="mb-4 flex justify-center">
                {trainer.photoUrl ? (
                  <img
                    src={trainer.photoUrl}
                    alt={trainer.name}
                    className="w-32 h-32 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No photo</span>
                  </div>
                )}
              </div>

              {/* Name and Title */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{trainer.name}</h3>
                <p className="text-gray-600">{trainer.titleLine}</p>
              </div>

              {/* Bio */}
              <div className="text-gray-700">
                <div className="whitespace-pre-line text-sm leading-relaxed">
                  {isExpanded ? trainer.bio : bioPreview}
                </div>
                {showReadMore && (
                  <button
                    onClick={() => toggleExpand(trainer.id || "")}
                    className="mt-3 text-sm text-primary hover:text-primary-800 font-medium"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


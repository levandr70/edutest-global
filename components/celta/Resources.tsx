"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import { listActiveCeltaResources, CeltaResource, CeltaResourceCategory } from "@/lib/firebase/celtaResources";

export default function Resources() {
  const [resources, setResources] = useState<CeltaResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        const data = await listActiveCeltaResources();
        setResources(data);
        setError(null);
      } catch (err: any) {
        console.error("Error loading resources:", err);
        setError("Failed to load resources");
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  if (loading) {
    return (
      <section className="mb-16">
        <SectionHeading>Application Documents</SectionHeading>
        <p className="text-gray-600 text-center">Loading documents...</p>
      </section>
    );
  }

  if (error || resources.length === 0) {
    return (
      <section className="mb-16">
        <SectionHeading>Application Documents</SectionHeading>
        <p className="text-gray-600 text-center">
          Application documents will be published here. Please contact us to apply.
        </p>
      </section>
    );
  }

  // Group resources by category
  const groupedResources = {
    application_form: resources.filter((r) => r.category === "application_form"),
    pre_interview_task: resources.filter((r) => r.category === "pre_interview_task"),
    other: resources.filter((r) => r.category === "other"),
  };

  const getCategoryTitle = (category: CeltaResourceCategory): string => {
    switch (category) {
      case "application_form":
        return "Application Form";
      case "pre_interview_task":
        return "Pre-interview Task";
      case "other":
        return "Other Documents";
      default:
        return category;
    }
  };

  return (
    <section className="mb-16">
      <SectionHeading>Application Documents</SectionHeading>
      <div className="space-y-8">
        {/* Application Form Section */}
        {groupedResources.application_form.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {getCategoryTitle("application_form")}
            </h3>
            <div className="space-y-4">
              {groupedResources.application_form.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      {resource.fileUrl ? (
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-primary hover:text-primary-800 transition-colors"
                        >
                          {resource.title}
                        </a>
                      ) : (
                        <h4 className="text-lg font-semibold text-gray-900">
                          {resource.title}
                        </h4>
                      )}
                      {resource.description && (
                        <p className="text-gray-600 text-sm mt-2">
                          {resource.description}
                        </p>
                      )}
                    </div>
                    {resource.fileUrl && (
                      <div className="flex-shrink-0">
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 bg-neutral-700 text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                        >
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pre-interview Task Section */}
        {groupedResources.pre_interview_task.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {getCategoryTitle("pre_interview_task")}
            </h3>
            <div className="space-y-4">
              {groupedResources.pre_interview_task.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      {resource.fileUrl ? (
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-primary hover:text-primary-800 transition-colors"
                        >
                          {resource.title}
                        </a>
                      ) : (
                        <h4 className="text-lg font-semibold text-gray-900">
                          {resource.title}
                        </h4>
                      )}
                      {resource.description && (
                        <p className="text-gray-600 text-sm mt-2">
                          {resource.description}
                        </p>
                      )}
                    </div>
                    {resource.fileUrl && (
                      <div className="flex-shrink-0">
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 bg-neutral-700 text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                        >
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Documents Section */}
        {groupedResources.other.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {getCategoryTitle("other")}
            </h3>
            <div className="space-y-4">
              {groupedResources.other.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white border border-gray-200 rounded-lg p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      {resource.fileUrl ? (
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-primary hover:text-primary-800 transition-colors"
                        >
                          {resource.title}
                        </a>
                      ) : (
                        <h4 className="text-lg font-semibold text-gray-900">
                          {resource.title}
                        </h4>
                      )}
                      {resource.description && (
                        <p className="text-gray-600 text-sm mt-2">
                          {resource.description}
                        </p>
                      )}
                    </div>
                    {resource.fileUrl && (
                      <div className="flex-shrink-0">
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 bg-neutral-700 text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
                        >
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


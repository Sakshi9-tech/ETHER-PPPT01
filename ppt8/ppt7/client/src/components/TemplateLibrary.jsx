import React, { useState } from 'react';
import { usePresentation } from '../contexts/PresentationContext';

const TemplateLibrary = ({ onClose }) => {
  const { setSlides, setCurrentSlide, setPresentationMeta } = usePresentation();
  const [selectedCategory, setSelectedCategory] = useState('business');

  const templates = {
    business: [
      {
        id: 'business-pitch',
        name: 'Business Pitch',
        description: 'Professional presentation for business proposals',
        slides: [
          {
            id: 1,
            title: 'Company Overview',
            content: 'Present your company vision and mission',
            background: '#1E40AF',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Problem Statement',
            content: 'Define the problem you are solving',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          },
          {
            id: 3,
            title: 'Our Solution',
            content: 'Present your innovative solution',
            background: '#F3F4F6',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      },
      {
        id: 'quarterly-report',
        name: 'Quarterly Report',
        description: 'Professional quarterly business report template',
        slides: [
          {
            id: 1,
            title: 'Q4 2024 Report',
            content: 'Quarterly Performance Overview',
            background: '#059669',
            textColor: '#FFFFFF',
            layout: 'title-only',
            elements: []
          },
          {
            id: 2,
            title: 'Key Metrics',
            content: 'Revenue, Growth, and Performance Indicators',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      },
      {
        id: 'product-launch',
        name: 'Product Launch',
        description: 'Exciting presentation for new product announcements',
        slides: [
          {
            id: 1,
            title: 'Product Launch',
            content: 'Introducing our latest innovation',
            background: '#DC2626',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Features & Benefits',
            content: 'What makes this product special',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          },
          {
            id: 3,
            title: 'Market Impact',
            content: 'How this changes the industry',
            background: '#F3F4F6',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      },
      {
        id: 'team-meeting',
        name: 'Team Meeting',
        description: 'Structured agenda for team meetings and updates',
        slides: [
          {
            id: 1,
            title: 'Team Meeting Agenda',
            content: 'Weekly team updates and discussions',
            background: '#2563EB',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Progress Updates',
            content: 'Current project status and milestones',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      }
    ],
    education: [
      {
        id: 'lecture-slides',
        name: 'Lecture Slides',
        description: 'Educational presentation template',
        slides: [
          {
            id: 1,
            title: 'Course Introduction',
            content: 'Welcome to the course',
            background: '#7C3AED',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Learning Objectives',
            content: 'What you will learn in this session',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      },
      {
        id: 'workshop',
        name: 'Workshop Presentation',
        description: 'Interactive workshop session template',
        slides: [
          {
            id: 1,
            title: 'Workshop Overview',
            content: 'Hands-on learning session',
            background: '#10B981',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Activities',
            content: 'Interactive exercises and discussions',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          },
          {
            id: 3,
            title: 'Key Takeaways',
            content: 'What participants will learn',
            background: '#F3F4F6',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      },
      {
        id: 'research-presentation',
        name: 'Research Presentation',
        description: 'Academic research findings template',
        slides: [
          {
            id: 1,
            title: 'Research Title',
            content: 'Presenting our findings',
            background: '#6366F1',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Methodology',
            content: 'Research approach and methods used',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          },
          {
            id: 3,
            title: 'Results',
            content: 'Key findings and conclusions',
            background: '#F3F4F6',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      }
    ],
    creative: [
      {
        id: 'portfolio',
        name: 'Portfolio Showcase',
        description: 'Creative portfolio presentation',
        slides: [
          {
            id: 1,
            title: 'My Portfolio',
            content: 'Showcasing my best work',
            background: '#EC4899',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'About Me',
            content: 'Professional background and skills',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      },
      {
        id: 'art-showcase',
        name: 'Art Showcase',
        description: 'Gallery-style presentation for artistic works',
        slides: [
          {
            id: 1,
            title: 'Art Exhibition',
            content: 'Exploring creative expressions',
            background: '#8B5CF6',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Featured Pieces',
            content: 'Highlights from the collection',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          },
          {
            id: 3,
            title: 'Artist Statement',
            content: 'The inspiration behind the work',
            background: '#F3F4F6',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      },
      {
        id: 'design-pitch',
        name: 'Design Pitch',
        description: 'Creative design proposal presentation',
        slides: [
          {
            id: 1,
            title: 'Design Concept',
            content: 'Innovative design solutions',
            background: '#F59E0B',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Design Process',
            content: 'From concept to creation',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          },
          {
            id: 3,
            title: 'Final Design',
            content: 'The complete creative vision',
            background: '#F3F4F6',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      }
    ],
    marketing: [
      {
        id: 'social-media-campaign',
        name: 'Social Media Campaign',
        description: 'Engaging social media strategy presentation',
        slides: [
          {
            id: 1,
            title: 'Campaign Overview',
            content: 'Building brand awareness online',
            background: '#3B82F6',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Target Audience',
            content: 'Who we want to reach',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          },
          {
            id: 3,
            title: 'Content Strategy',
            content: 'Planning engaging posts and stories',
            background: '#F3F4F6',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      },
      {
        id: 'brand-identity',
        name: 'Brand Identity',
        description: 'Comprehensive brand identity presentation',
        slides: [
          {
            id: 1,
            title: 'Brand Story',
            content: 'The heart of our brand',
            background: '#EF4444',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Visual Identity',
            content: 'Colors, fonts, and imagery',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          },
          {
            id: 3,
            title: 'Brand Guidelines',
            content: 'How to use our brand elements',
            background: '#F3F4F6',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      }
    ],
    personal: [
      {
        id: 'personal-resume',
        name: 'Personal Resume',
        description: 'Professional personal resume presentation',
        slides: [
          {
            id: 1,
            title: 'Professional Profile',
            content: 'My career journey',
            background: '#10B981',
            textColor: '#FFFFFF',
            layout: 'title-content',
            elements: []
          },
          {
            id: 2,
            title: 'Experience',
            content: 'Key roles and achievements',
            background: '#FFFFFF',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          },
          {
            id: 3,
            title: 'Skills & Education',
            content: 'What I bring to the table',
            background: '#F3F4F6',
            textColor: '#1F2937',
            layout: 'title-content',
            elements: []
          }
        ]
      }
    ]
  };

  const categories = [
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'creative', name: 'Creative', icon: '🎨' },
    { id: 'marketing', name: 'Marketing', icon: '📢' },
    { id: 'personal', name: 'Personal', icon: '👤' }
  ];

  const handleUseTemplate = (template) => {
    // Generate unique IDs for slides to avoid conflicts
    const baseId = Date.now();
    const slidesWithUniqueIds = template.slides.map((slide, index) => ({
      ...slide,
      id: baseId + index
    }));

    // Create a cover slide and prepend it to the template slides
    const cover = {
      id: baseId - 1,
      title: template.name || 'Cover',
      content: template.description || '',
      background: template.slides?.[0]?.background || '#1E40AF',
      textColor: template.slides?.[0]?.textColor || '#FFFFFF',
      layout: 'title-only',
      elements: []
    };

    const slidesWithCover = [cover, ...slidesWithUniqueIds];

    setSlides(slidesWithCover);
    setCurrentSlide(0);
    // Update presentation meta with template name
    setPresentationMeta(prev => ({
      ...prev,
      title: template.name || 'Untitled',
      updatedAt: new Date().toISOString()
    }));
    // Save to localStorage for persistence
    localStorage.setItem('undoHistory', JSON.stringify([slidesWithCover]));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="panel w-4/5 max-w-5xl h-4/5 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b gold-border-light">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold nav-title">Template Library</h2>
            <button onClick={onClose} className="toolbar-btn">✕</button>
          </div>
          
          {/* Categories */}
          <div className="flex space-x-4 mt-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates[selectedCategory]?.map(template => (
              <div key={template.id} className="panel overflow-hidden hover:glow transition-shadow">
                {/* Preview: render first slide as cover */}
                {(() => {
                  const cover = template.slides?.[0] || {};
                  const bg = cover.background || '#4F46E5';
                  const text = cover.textColor || '#FFFFFF';
                  return (
                    <div className="h-40 overflow-hidden" style={{ background: `linear-gradient(135deg, ${bg}, ${bg}dd)` }}>
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                        <div className="text-lg font-bold mb-2" style={{ color: text }}>{cover.title || template.name}</div>
                        <div className="text-sm" style={{ color: text, opacity: 0.9 }}>{cover.content || template.description}</div>
                        <div className="text-xs mt-3" style={{ color: text, opacity: 0.85 }}>{template.slides?.length || 1} slides</div>
                      </div>
                    </div>
                  );
                })()}

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">{template.name}</h3>
                  <p className="text-sm text-neutral-300 mb-4">{template.description}</p>

                  {/* Slide Preview */}
                  <div className="mb-4">
                    <div className="text-xs text-neutral-400 mb-2">Slide Themes:</div>
                    <div className="flex space-x-2">
                      {template.slides.slice(0, 3).map((slide, index) => (
                        <div key={index} className="w-8 h-6 rounded border" style={{ backgroundColor: slide.background }} title={slide.title} />
                      ))}
                    </div>
                  </div>

                  <button onClick={() => handleUseTemplate(template)} className="w-full btn-primary">Use Template</button>
                </div>
              </div>
            ))}
          </div>
          
          {(!templates[selectedCategory] || templates[selectedCategory].length === 0) && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🎨</div>
              <div className="text-gray-500 dark:text-gray-400">
                No templates available in this category yet.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateLibrary;
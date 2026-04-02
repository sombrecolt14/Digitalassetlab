import { Link } from "react-router-dom";

const tutorials = [
  {
    category: "Getting Started",
    color: "#9FE870",
    textColor: "#163300",
    videos: [
      {
        title: "Download & Installation Guide",
        duration: "5 min",
        description: "Learn how to download and install your template bundle in CapCut, Premiere Pro, or After Effects.",
        image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXRvcmlhbCUyMHZpZGVvfGVufDF8fHx8MTc2NDg0NzY4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "Template Basics: First Edit",
        duration: "8 min",
        description: "Complete walkthrough of editing your first template from start to finish.",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmd8ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "Understanding Template Structure",
        duration: "6 min",
        description: "Learn how templates are organized and how to navigate different elements.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwdHV0b3JpYWx8ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  },
  {
    category: "CapCut Tutorials",
    color: "#FFD7EF",
    textColor: "#320707",
    videos: [
      {
        title: "CapCut Mobile: Quick Edit Guide",
        duration: "7 min",
        description: "Edit templates on your phone using CapCut mobile app. Perfect for on-the-go creators.",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBlZGl0aW5nfGVufDF8fHx8MTc2NDg0NzY4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "CapCut Desktop: Advanced Editing",
        duration: "12 min",
        description: "Master advanced editing features in CapCut desktop for professional results.",
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrdG9wJTIwZWRpdGluZ3xlbnwxfHx8fDE3NjQ4NDc2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "Customizing Colors & Fonts",
        duration: "9 min",
        description: "How to change colors, fonts, and styles to match your brand in CapCut.",
        image: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcnMlMjBkZXNpZ258ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  },
  {
    category: "Premiere Pro & After Effects",
    color: "#A0E1F1",
    textColor: "#21231D",
    videos: [
      {
        title: "Importing Templates to Premiere Pro",
        duration: "6 min",
        description: "Step-by-step guide to importing and setting up templates in Adobe Premiere Pro.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG9iZSUyMHByZW1pZXJlfGVufDF8fHx8MTc2NDg0NzY4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "After Effects: Motion Graphics",
        duration: "15 min",
        description: "Advanced tutorial for customizing motion graphics templates in After Effects.",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3Rpb24lMjBncmFwaGljc3xlbnwxfHx8fDE3NjQ4NDc2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "Rendering & Export Settings",
        duration: "8 min",
        description: "Optimize your export settings for Instagram Reels quality and file size.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleHBvcnQlMjB2aWRlb3xlbnwxfHx8fDE3NjQ4NDc2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  },
  {
    category: "Advanced Tips",
    color: "#FFEB69",
    textColor: "#3A341C",
    videos: [
      {
        title: "Adding Trending Audio to Templates",
        duration: "10 min",
        description: "How to find and add viral audio to your templates for maximum engagement.",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGF1ZGlvfGVufDF8fHx8MTc2NDg0NzY4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "Creating Custom Transitions",
        duration: "14 min",
        description: "Learn to create your own unique transitions to stand out from the crowd.",
        image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFuc2l0aW9ucyUyMHZpZGVvfGVufDF8fHx8MTc2NDg0NzY4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "Batch Editing: Create 7 Reels in 1 Hour",
        duration: "18 min",
        description: "Pro workflow for creating multiple reels quickly using templates efficiently.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0aXZpdHl8ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  },
  {
    category: "Instagram Strategy",
    color: "#FFC091",
    textColor: "#163300",
    videos: [
      {
        title: "Best Times to Post Reels",
        duration: "7 min",
        description: "Data-driven guide to posting times for maximum reach and engagement.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YWdyYW0lMjBzdHJhdGVneXxlbnwxfHx8fDE3NjQ4NDc2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "Hook Strategies That Work",
        duration: "11 min",
        description: "Proven hook formulas to stop the scroll and keep viewers watching.",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb258ZW58MXx8fHwxNzY0ODQ3Njg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        title: "Hashtag & Caption Optimization",
        duration: "9 min",
        description: "Master hashtags and captions to boost discoverability and algorithm ranking.",
        image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1hcmtldGluZ3xlbnwxfHx8fDE3NjQ4NDc2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
    ]
  },
];

export default function Tutorials() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-[#163300] px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link to="/">
            <h1 className="font-['Inter:Black',sans-serif] font-black text-white text-2xl">
              DIGITALASSETLAB
            </h1>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/templates" className="font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870] transition-colors">
              Templates
            </Link>
            <Link to="/bundles" className="font-['Inter:Bold',sans-serif] font-bold text-white text-sm hover:text-[#9FE870] transition-colors">
              Bundles
            </Link>
            <Link to="/tutorials" className="font-['Inter:Bold',sans-serif] font-bold text-[#9FE870] text-sm transition-colors">
              Tutorials
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-5xl md:text-7xl mb-6">
              VIDEO <span className="text-[#9FE870]">TUTORIALS</span>
            </h1>
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[#4a5565] text-xl md:text-2xl max-w-[900px] mx-auto">
              Learn everything from basic editing to advanced strategies with our step-by-step video guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#9FE870] rounded-2xl p-6 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-4xl mb-1">
                50+
              </p>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm">
                Video Tutorials
              </p>
            </div>
            <div className="bg-[#FFD7EF] rounded-2xl p-6 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#320707] text-4xl mb-1">
                FREE
              </p>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#320707] text-sm">
                For All Customers
              </p>
            </div>
            <div className="bg-[#A0E1F1] rounded-2xl p-6 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#21231D] text-4xl mb-1">
                HD
              </p>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#21231D] text-sm">
                1080p Quality
              </p>
            </div>
            <div className="bg-[#FFEB69] rounded-2xl p-6 text-center border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-['Inter:Black',sans-serif] font-black text-[#3A341C] text-4xl mb-1">
                NEW
              </p>
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[#3A341C] text-sm">
                Weekly Updates
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Categories */}
      {tutorials.map((category, categoryIndex) => (
        <section
          key={categoryIndex}
          className={categoryIndex % 2 === 0 ? "bg-[#f5f5f5] px-6 py-16" : "bg-white px-6 py-16"}
        >
          <div className="max-w-[1200px] mx-auto">
            <h2
              className="font-['Inter:Black',sans-serif] font-black text-4xl md:text-5xl mb-8"
              style={{ color: category.color }}
            >
              {category.category.toUpperCase()}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.videos.map((video, videoIndex) => (
                <div
                  key={videoIndex}
                  className="bg-white rounded-2xl overflow-hidden border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden group">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-white rounded-full p-4 border-3 border-black">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-[#163300] border-b-8 border-b-transparent ml-1"></div>
                      </div>
                    </div>
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full border-2 border-white"
                      style={{ backgroundColor: category.color }}
                    >
                      <p
                        className="font-['Inter:Black',sans-serif] font-black text-xs"
                        style={{ color: category.textColor }}
                      >
                        {video.duration}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Inter:Black',sans-serif] font-black text-[#163300] text-xl mb-2">
                      {video.title}
                    </h3>
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#4a5565] text-sm">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Access Note */}
      <section className="bg-[#163300] px-6 py-16 md:py-24">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-['Inter:Black',sans-serif] font-black text-white text-3xl md:text-5xl mb-6">
            ACCESS ALL TUTORIALS
          </h2>
          <p className="font-['Inter:Bold',sans-serif] font-bold text-[#9FE870] text-xl mb-8">
            Purchase any template bundle to get instant access to our complete tutorial library
          </p>
          <div className="bg-white rounded-2xl p-8 border-4 border-black mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm">
                  50+ Video Lessons
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⬇️</div>
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm">
                  Downloadable Files
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💬</div>
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm">
                  Community Support
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔄</div>
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[#163300] text-sm">
                  Lifetime Updates
                </p>
              </div>
            </div>
          </div>
          <Link to="/checkout">
            <button className="bg-[#9FE870] text-[#163300] font-['Inter:Black',sans-serif] font-black text-xl px-12 py-6 rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              GET TEMPLATES + TUTORIALS - ₹497
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#21231D] px-6 py-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">
                PRODUCTS
              </h4>
              <ul className="space-y-2">
                <li><Link to="/templates" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Instagram Reels</Link></li>
                <li><Link to="/bundles" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Template Bundles</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">
                SUPPORT
              </h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Contact Us</Link></li>
                <li><Link to="/faq" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">FAQ</Link></li>
                <li><Link to="/tutorials" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Tutorials</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">
                LEGAL
              </h4>
              <ul className="space-y-2">
                <li><Link to="/privacy-policy" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Terms of Service</Link></li>
                <li><Link to="/refund-policy" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-['Inter:Black',sans-serif] font-black text-[#9FE870] text-sm mb-4 tracking-wider">
                CONNECT
              </h4>
              <ul className="space-y-2">
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Instagram</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">YouTube</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm hover:text-[#9FE870] transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-white text-sm">
              © 2025 DigitalAssetLab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

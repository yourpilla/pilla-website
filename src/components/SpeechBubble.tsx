import Image from 'next/image';

interface SpeechBubbleProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function SpeechBubble({ title, children, className = "" }: SpeechBubbleProps) {
  return (
    <div className={`flex items-end gap-4 ${className}`}>
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <Image
          src="/liam circle small.png"
          alt="Liam, Pilla Founder"
          width={60}
          height={60}
          className="rounded-full object-cover"
        />
      </div>
      
      {/* Speech Bubble */}
      <div 
        className="flex-1 p-6 rounded-3xl text-left"
        style={{ 
          backgroundColor: '#C2E0FF',
          borderBottomLeftRadius: '0px',
          fontSize: '18px'
        }}
      >
        {/* Title */}
        <h3 className="mb-4" style={{ fontSize: '18px' }}>{title}</h3>
        
        {/* Body Content */}
        <div className="mb-4" style={{ fontSize: '18px' }}>
          {children}
        </div>
        
        {/* Footer */}
        <div style={{ fontSize: '18px' }}>
          Liam, Pilla Founder. <a 
            href="mailto:liam@yourpilla.com" 
            className="text-blue-600 hover:underline"
            style={{ fontSize: '18px' }}
          >
            Email me
          </a>
        </div>
      </div>
    </div>
  );
}
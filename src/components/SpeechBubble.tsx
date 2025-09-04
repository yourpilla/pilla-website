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
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
      </div>
      
      {/* Speech Bubble */}
      <div 
        className="flex-1 p-6 rounded-3xl text-left"
        style={{ 
          backgroundColor: '#C2E0FF',
          borderBottomLeftRadius: '0px'
        }}
      >
        {/* Title */}
        <h3 className="h6 mb-4">{title}</h3>
        
        {/* Body Content */}
        <div className="small-blue mb-4">
          {children}
        </div>
        
        {/* Footer */}
        <div className="small-blue">
          Liam, Pilla Founder. <a 
            href="mailto:liam@yourpilla.com" 
            className="text-blue-600 hover:underline"
          >
            Email me
          </a>
        </div>
      </div>
    </div>
  );
}
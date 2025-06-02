
import { 
  QrCode, 
  Palette, 
  Download, 
  LineChart, 
  RefreshCw, 
  Shield,
  Smartphone,
  Database,
  Code,
  Zap,
  Globe,
  MessageSquare
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <QrCode className="h-8 w-8 text-qrito-purple" />,
      title: "Multiple QR Code Types",
      description: "Generate QR codes for URLs, text, contacts, WiFi, email, phone numbers, and much more."
    },
    {
      icon: <Palette className="h-8 w-8 text-qrito-purple" />,
      title: "Customization Options",
      description: "Customize your QR codes with colors, logos, and designs to match your brand identity."
    },
    {
      icon: <Download className="h-8 w-8 text-qrito-purple" />,
      title: "Multiple Download Formats",
      description: "Download your QR codes in PNG, JPG, or SVG formats for use in any application."
    },
    {
      icon: <LineChart className="h-8 w-8 text-qrito-purple" />,
      title: "Advanced Analytics",
      description: "Track scans and user engagement with detailed analytics and insights for your business needs."
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-qrito-purple" />,
      title: "Dynamic QR Codes",
      description: "Edit your QR code content anytime without changing the code itself and maintain all scans history points."
    },
    {
      icon: <Shield className="h-8 w-8 text-qrito-purple" />,
      title: "High Security",
      description: "Secure QR codes with access control and data encryption for sensitive information."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-qrito-purple" />,
      title: "Mobile Responsive",
      description: "QR codes optimized for mobile scanning with perfect readability on all devices."
    },
    {
      icon: <Database className="h-8 w-8 text-qrito-purple" />,
      title: "Cloud Storage",
      description: "All your QR codes securely stored in the cloud for access anytime, anywhere."
    },
    {
      icon: <Code className="h-8 w-8 text-qrito-purple" />,
      title: "API Access",
      description: "Integrate QR code generation into your own applications with our developer-friendly API."
    },
    {
      icon: <Zap className="h-8 w-8 text-qrito-purple" />,
      title: "Fast Generation",
      description: "Create multiple QR codes in seconds with our high-performance cloud infrastructure."
    },
    {
      icon: <Globe className="h-8 w-8 text-qrito-purple" />,
      title: "Global Support",
      description: "24/7 support for all your QR code needs, no matter where you are in the world."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-qrito-purple" />,
      title: "Bulk Creation",
      description: "Generate thousands of unique QR codes at once for large-scale marketing campaigns."
    },
  ];

  // Group the features into rows of 6
  const featuresFirstRow = features.slice(0, 6);
  const featuresSecondRow = features.slice(6, 12);

  return (
    <div className="container mx-auto py-16" id="features">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Features That Make a Difference</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          QRito offers powerful tools to create, customize, and manage your QR codes efficiently.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuresFirstRow.map((feature, index) => (
            <FeatureCard key={`row1-${index}`} feature={feature} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuresSecondRow.map((feature, index) => (
            <FeatureCard key={`row2-${index}`} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center">
    <div className="bg-qrito-background rounded-full w-12 h-12 flex items-center justify-center mb-3">
      {feature.icon}
    </div>
    <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
    <p className="text-gray-600 text-sm">{feature.description}</p>
  </div>
);

export default Features;

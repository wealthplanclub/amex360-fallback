
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Accept any credentials and redirect to dashboard with state
    console.log("Auth attempt:", { email, password, isLogin });
    navigate("/dashboard", { state: { fromLogin: true } });
  };

  return (
    <div 
      className="min-h-screen p-6 flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Card className="bg-gradient-to-b from-white to-gray-100 animate-fade-in">
        <CardHeader className="text-center px-12">
          <div className="mb-4 mt-6">
            <img 
              src="https://i.imgur.com/1fFddP4.png" 
              alt="Amex Logo" 
              className="mx-auto"
              style={{ width: '276px' }}
            />
          </div>
        </CardHeader>
        <CardContent className="px-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">User ID</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your user ID"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

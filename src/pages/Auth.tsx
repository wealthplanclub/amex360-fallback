

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    // Accept any credentials and redirect to home
    console.log("Auth attempt:", { email, password, isLogin });
    navigate("/");
  };

  return (
    <div 
      className="min-h-screen p-6 flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
        backgroundRepeat: 'repeat'
      }}
    >
      <Card className="bg-gradient-to-b from-white to-gray-100 animate-fade-in transform hover:scale-105 transition-all duration-300 ease-out">
        <CardHeader className="text-center px-12">
          <div className="mb-4 mt-6 animate-scale-in">
            <img 
              src="https://i.imgur.com/1fFddP4.png" 
              alt="Amex Logo" 
              className="mx-auto transition-transform duration-300 hover:scale-110"
              style={{ width: '276px' }}
            />
          </div>
        </CardHeader>
        <CardContent className="px-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Label htmlFor="email">User ID</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your user ID"
                className="transition-all duration-200 focus:scale-105"
                required
              />
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="transition-all duration-200 focus:scale-105"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full animate-fade-in transition-all duration-200 hover:scale-105 active:scale-95" 
              style={{ animationDelay: '0.3s' }}
            >
              Log In
            </Button>
          </form>
          <div className="mt-4 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
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


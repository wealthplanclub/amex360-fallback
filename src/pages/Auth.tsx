
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth logic would go here
    console.log("Auth attempt:", { email, password, isLogin });
  };

  return (
    <div 
      className="min-h-screen p-6 flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://i.imgur.com/MsHNAik.png)',
        backgroundRepeat: 'repeat'
      }}
    >
      <Card className="w-full max-w-md bg-gradient-to-b from-white to-gray-100">
        <CardHeader className="text-center">
          <div className="mb-4 mt-6">
            <img 
              src="https://i.imgur.com/1fFddP4.png" 
              alt="Amex Logo" 
              className="mx-auto"
              style={{ width: '276px' }}
            />
          </div>
          <CardTitle className="text-2xl font-semibold">
            {isLogin ? "Sign In" : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
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
              {isLogin ? "Sign In" : "Sign Up"}
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

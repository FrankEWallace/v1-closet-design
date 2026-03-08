import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { LogOut, Save, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  if (!user) {
    navigate('/auth');
    return null;
  }

  const initials = user.displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleSave = () => {
    updateProfile({ displayName });
    toast({ title: 'Profile updated' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({ title: 'Signed out' });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8 max-w-lg">
        <h1 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-8">
          Profile
        </h1>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <Avatar className="w-24 h-24 border-2 border-border">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-secondary text-foreground text-xl font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <Separator className="mb-8" />

        {/* Edit form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">
              Display Name
            </Label>
            <Input
              id="name"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="h-12 bg-secondary/30 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">
              Email
            </Label>
            <div className="flex items-center gap-3 h-12 px-4 rounded-md bg-secondary/20 border border-border/50">
              <User size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{user.email}</span>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full h-12 text-sm tracking-widest uppercase font-medium">
            <Save size={14} className="mr-2" />
            Save Changes
          </Button>
        </div>

        <Separator className="my-8" />

        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full h-12 text-sm tracking-wide border-destructive/30 text-destructive hover:bg-destructive/5"
        >
          <LogOut size={14} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </Layout>
  );
};

export default Profile;

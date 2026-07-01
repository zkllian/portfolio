import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { InfoIcon, ZapIcon, CheckCircleIcon, LayoutIcon } from "lucide-react";

function ComponentShowcase() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-medium tracking-tight">UI Component Library</h1>
            <p className="text-muted-foreground">
              A collection of Shadcn UI components built with Radix UI and Tailwind CSS.
            </p>
          </div>

          <Separator />

          <Tabs defaultValue="buttons" className="w-full">
            <TabsList>
              <TabsTrigger value="buttons">Buttons & Badges</TabsTrigger>
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="buttons" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Various button variants and sizes</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button disabled>Disabled</Button>
                  <Button size="sm">Small</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><ZapIcon /></Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Status indicators and labels</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avatars</CardTitle>
                  <CardDescription>User profile images with fallbacks</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inputs" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Text Input</CardTitle>
                  <CardDescription>Various input states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input placeholder="Default input" />
                  <Input placeholder="Disabled input" disabled />
                  <Input type="password" placeholder="Password input" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Toggle Controls</CardTitle>
                  <CardDescription>Switches and sliders</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Switch id="airplane-mode" />
                    <label htmlFor="airplane-mode" className="text-sm">Airplane Mode</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch id="notifications" defaultChecked />
                    <label htmlFor="notifications" className="text-sm">Notifications</label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Volume</label>
                    <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                  <CardDescription>Contextual feedback messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Alert>
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>This is an informational alert message.</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress</CardTitle>
                  <CardDescription>Progress indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Complete</span>
                      <span className="text-green-600">100%</span>
                    </div>
                    <Progress value={100} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tooltips</CardTitle>
                  <CardDescription>Hover for additional context</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon"><CheckCircleIcon className="h-4 w-4" /></Button>
                    </TooltipTrigger>
                    <TooltipContent>Mark as complete</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon"><LayoutIcon className="h-4 w-4" /></Button>
                    </TooltipTrigger>
                    <TooltipContent>Toggle layout</TooltipContent>
                  </Tooltip>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Skeleton Loaders</CardTitle>
                  <CardDescription>Placeholder loading states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cards</CardTitle>
                  <CardDescription>Content containers with various layouts</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Nested Card</CardTitle>
                      <CardDescription>A card inside a card</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Card content goes here.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Another Card</CardTitle>
                      <CardDescription>Side by side layout</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">More card content.</p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ComponentShowcase />
    </ThemeProvider>
  );
}

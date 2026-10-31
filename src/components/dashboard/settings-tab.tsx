import React, { useState } from "react"
import {
  User,
  Bell,
  Key,
  Shield,
  Save,
  Check,
  Building,
  Mail,
  Copy,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export function SettingsTab() {
  const [name, setName] = useState("Sarah Connor")
  const [email, setEmail] = useState("lead@nexusops.io")
  const [orgName, setOrgName] = useState("Nexus Global Systems LLC")
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [slackAlerts, setSlackAlerts] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("Workspace preferences saved successfully!")
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            General Profile & Organization
          </CardTitle>
          <CardDescription className="text-xs">
            Manage your personal profile details and legal business entity name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-medium text-foreground">Full Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-foreground">Organization Name</label>
              <Input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <Button type="submit" size="sm" className="gap-1.5 h-8 text-xs">
              <Save className="h-3.5 w-3.5" />
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* API Credentials */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Key className="h-4 w-4 text-primary" />
            API Keys & Webhooks
          </CardTitle>
          <CardDescription className="text-xs">
            Authenticate programmatic webhook ingestion with signed HMAC keys.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div className="space-y-1.5">
            <label className="text-muted-foreground font-medium">Sample Test Key (Placeholder)</label>
            <div className="flex items-center gap-2">
              <Input
                value="pk_test_sample_placeholder_XXXXXXXXXXXXXXXXXXXXXXXX"
                readOnly
                className="h-9 font-mono text-xs bg-muted/30"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText("pk_test_sample_placeholder_XXXXXXXXXXXXXXXXXXXXXXXX")
                  toast.success("Placeholder key copied to clipboard")
                }}
                className="h-9 text-xs shrink-0"
              >
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              This is a mock placeholder key for UI testing. Replace with your actual key from an environment variable when connecting to production.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Notification Channels
          </CardTitle>
          <CardDescription className="text-xs">
            Control automated critical telemetry alerts and transaction receipts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="email-alerts"
              checked={emailAlerts}
              onCheckedChange={(c) => setEmailAlerts(!!c)}
            />
            <label
              htmlFor="email-alerts"
              className="text-xs font-medium leading-none cursor-pointer"
            >
              Email alerts for high-value transactions (&gt; $1,000)
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="slack-alerts"
              checked={slackAlerts}
              onCheckedChange={(c) => setSlackAlerts(!!c)}
            />
            <label
              htmlFor="slack-alerts"
              className="text-xs font-medium leading-none cursor-pointer"
            >
              Slack notification webhook for payment failures or disputes
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sms-alerts"
              checked={smsAlerts}
              onCheckedChange={(c) => setSmsAlerts(!!c)}
            />
            <label
              htmlFor="sms-alerts"
              className="text-xs font-medium leading-none cursor-pointer"
            >
              Emergency SMS security broadcast for login from new locations
            </label>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3">
          <Button
            size="sm"
            onClick={() => toast.success("Notification preferences updated")}
            className="text-xs h-8"
          >
            Update Preferences
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


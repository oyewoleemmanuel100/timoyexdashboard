"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Camera, Shield, Edit3, Save, X, Upload, CreditCard, FileText, Users, Settings } from "lucide-react"

export function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedBank, setSelectedBank] = useState("")
  const [showCustomBank, setShowCustomBank] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    bio: "Experienced affiliate marketer with over 5 years in the industry. Passionate about building strong teams and helping others succeed.",
    joinDate: "2019-03-15",
    level: 3,
    totalEarnings: 45231,
    totalRecruits: 1234,
  })

  const [extendedProfileData, setExtendedProfileData] = useState({
    firstName: "John",
    middleName: "",
    lastName: "Doe",
    preferredUsername: "johndoe",
    alternatePhone: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    nationality: "",
    stateOfOrigin: "",
    idType: "",
    bankName: "",
    customBankName: "",
    accountNumber: "",
    bvn: "",
  })

  const [nextOfKinData, setNextOfKinData] = useState({
    fullName: "",
    relationship: "",
    phoneNumber: "",
    email: "",
    address: "",
  })

  const [accountPreferences, setAccountPreferences] = useState({
    preferredLanguage: "english",
    communicationPreferences: {
      email: true,
      sms: false,
      whatsapp: true,
      inApp: true,
    },
    timezone: "Africa/Lagos",
  })

  const [editData, setEditData] = useState(profileData)

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const handleBankChange = (value: string) => {
    setSelectedBank(value)
    setShowCustomBank(value === "others")
    setExtendedProfileData({ ...extendedProfileData, bankName: value })
  }

  const handleCommunicationChange = (type: string, checked: boolean) => {
    setAccountPreferences({
      ...accountPreferences,
      communicationPreferences: {
        ...accountPreferences.communicationPreferences,
        [type]: checked,
      },
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getLevelBadgeColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-gray-100 text-gray-800 border-gray-200"
      case 2:
        return "bg-blue-100 text-blue-800 border-blue-200"
      case 3:
        return "bg-green-100 text-green-800 border-green-200"
      case 4:
        return "bg-purple-100 text-purple-800 border-purple-200"
      case 5:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const nigerianBanks = [
    "Access Bank",
    "Citibank Nigeria",
    "Ecobank Nigeria",
    "Fidelity Bank",
    "First Bank of Nigeria",
    "First City Monument Bank (FCMB)",
    "Globus Bank",
    "Guaranty Trust Bank (GTB)",
    "Heritage Bank",
    "Keystone Bank",
    "Polaris Bank",
    "Providus Bank",
    "Stanbic IBTC Bank",
    "Standard Chartered Bank",
    "Sterling Bank",
    "SunTrust Bank",
    "Union Bank of Nigeria",
    "United Bank for Africa (UBA)",
    "Unity Bank",
    "Wema Bank",
    "Zenith Bank",
    "Others",
  ]

  const relationshipOptions = ["Father", "Mother", "Brother", "Sister", "Spouse", "Friend", "Guardian", "Other"]

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "arabic", label: "Arabic" },
    { value: "portuguese", label: "Portuguese" },
    { value: "russian", label: "Russian" },
    { value: "japanese", label: "Japanese" },
    { value: "hindi", label: "Hindi" },
  ]

  const timezoneOptions = [
    { value: "Africa/Lagos", label: "Africa/Lagos (WAT)" },
    { value: "America/New_York", label: "America/New_York (EST)" },
    { value: "Europe/London", label: "Europe/London (GMT)" },
    { value: "Asia/Tokyo", label: "Asia/Tokyo (JST)" },
    { value: "Australia/Sydney", label: "Australia/Sydney (AEST)" },
    { value: "America/Los_Angeles", label: "America/Los_Angeles (PST)" },
    { value: "Europe/Paris", label: "Europe/Paris (CET)" },
    { value: "Asia/Dubai", label: "Asia/Dubai (GST)" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Profile</h2>
          <p className="text-muted-foreground">Manage your personal information and account settings.</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="gap-2">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel} className="gap-2 bg-transparent">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <Card className="bg-card border-border shadow-sm lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback className="text-lg">
                  {profileData.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardTitle className="text-card-foreground">{profileData.fullName}</CardTitle>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline" className={getLevelBadgeColor(profileData.level)}>
                Level {profileData.level}
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Member since</p>
              <p className="font-medium text-card-foreground">{formatDate(profileData.joinDate)}</p>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Earnings</span>
                <span className="font-medium text-card-foreground">${profileData.totalEarnings.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Recruits</span>
                <span className="font-medium text-card-foreground">{profileData.totalRecruits.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information Card */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={extendedProfileData.firstName}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    value={extendedProfileData.middleName}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, middleName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={extendedProfileData.lastName}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredUsername">Preferred Username</Label>
                  <Input
                    id="preferredUsername"
                    value={extendedProfileData.preferredUsername}
                    onChange={(e) =>
                      setExtendedProfileData({ ...extendedProfileData, preferredUsername: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternatePhone">Alternate Phone</Label>
                  <Input
                    id="alternatePhone"
                    value={extendedProfileData.alternatePhone}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, alternatePhone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={extendedProfileData.gender}
                    onValueChange={(value) => setExtendedProfileData({ ...extendedProfileData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth (DOB)</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={extendedProfileData.dateOfBirth}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={extendedProfileData.country}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, country: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Input
                    id="nationality"
                    value={extendedProfileData.nationality}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, nationality: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stateOfOrigin">State of Origin</Label>
                  <Input
                    id="stateOfOrigin"
                    value={extendedProfileData.stateOfOrigin}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, stateOfOrigin: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  rows={2}
                  value={profileData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Identification Details Card */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <FileText className="h-5 w-5" />
                Identification Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="idType">ID Type</Label>
                <Select
                  value={extendedProfileData.idType}
                  onValueChange={(value) => setExtendedProfileData({ ...extendedProfileData, idType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nin">NIN</SelectItem>
                    <SelectItem value="voters-id">Voter's ID Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="idUpload">ID Upload</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Choose File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Details Card */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <CreditCard className="h-5 w-5" />
                Bank Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Select value={selectedBank} onValueChange={handleBankChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianBanks.map((bank) => (
                      <SelectItem
                        key={bank.toLowerCase().replace(/\s+/g, "-")}
                        value={bank.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {showCustomBank && (
                <div className="space-y-2">
                  <Label htmlFor="customBankName">Bank Name (Custom)</Label>
                  <Input
                    id="customBankName"
                    placeholder="Enter bank name"
                    value={extendedProfileData.customBankName}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, customBankName: e.target.value })}
                  />
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Bank Account Number</Label>
                  <Input
                    id="accountNumber"
                    value={extendedProfileData.accountNumber}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, accountNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bvn">BVN</Label>
                  <Input
                    id="bvn"
                    value={extendedProfileData.bvn}
                    onChange={(e) => setExtendedProfileData({ ...extendedProfileData, bvn: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next of Kin / Emergency Contact Card */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Users className="h-5 w-5" />
                Next of Kin / Emergency Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="kinFullName">Full Name</Label>
                  <Input
                    id="kinFullName"
                    value={nextOfKinData.fullName}
                    onChange={(e) => setNextOfKinData({ ...nextOfKinData, fullName: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kinRelationship">Relationship</Label>
                  <Select
                    value={nextOfKinData.relationship}
                    onValueChange={(value) => setNextOfKinData({ ...nextOfKinData, relationship: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      {relationshipOptions.map((relationship) => (
                        <SelectItem key={relationship.toLowerCase()} value={relationship.toLowerCase()}>
                          {relationship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kinPhone">Phone Number</Label>
                  <Input
                    id="kinPhone"
                    value={nextOfKinData.phoneNumber}
                    onChange={(e) => setNextOfKinData({ ...nextOfKinData, phoneNumber: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kinEmail">Email (Optional)</Label>
                  <Input
                    id="kinEmail"
                    type="email"
                    value={nextOfKinData.email}
                    onChange={(e) => setNextOfKinData({ ...nextOfKinData, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="kinAddress">Address</Label>
                <Textarea
                  id="kinAddress"
                  rows={3}
                  value={nextOfKinData.address}
                  onChange={(e) => setNextOfKinData({ ...nextOfKinData, address: e.target.value })}
                  placeholder="Enter complete address"
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Preferences Card */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <Settings className="h-5 w-5" />
                Account Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="preferredLanguage">Preferred Language</Label>
                  <Select
                    value={accountPreferences.preferredLanguage}
                    onValueChange={(value) =>
                      setAccountPreferences({ ...accountPreferences, preferredLanguage: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={accountPreferences.timezone}
                    onValueChange={(value) => setAccountPreferences({ ...accountPreferences, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezoneOptions.map((timezone) => (
                        <SelectItem key={timezone.value} value={timezone.value}>
                          {timezone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Communication Preferences</Label>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-pref"
                      checked={accountPreferences.communicationPreferences.email}
                      onCheckedChange={(checked) => handleCommunicationChange("email", checked as boolean)}
                    />
                    <Label htmlFor="email-pref" className="text-sm font-normal">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sms-pref"
                      checked={accountPreferences.communicationPreferences.sms}
                      onCheckedChange={(checked) => handleCommunicationChange("sms", checked as boolean)}
                    />
                    <Label htmlFor="sms-pref" className="text-sm font-normal">
                      SMS
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="whatsapp-pref"
                      checked={accountPreferences.communicationPreferences.whatsapp}
                      onCheckedChange={(checked) => handleCommunicationChange("whatsapp", checked as boolean)}
                    />
                    <Label htmlFor="whatsapp-pref" className="text-sm font-normal">
                      WhatsApp
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inapp-pref"
                      checked={accountPreferences.communicationPreferences.inApp}
                      onCheckedChange={(checked) => handleCommunicationChange("inApp", checked as boolean)}
                    />
                    <Label htmlFor="inapp-pref" className="text-sm font-normal">
                      In-app Notifications
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Security Section */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-card-foreground">Password</h4>
              <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-card-foreground">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-card-foreground">Login Sessions</h4>
              <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
            </div>
            <Button variant="outline">View Sessions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

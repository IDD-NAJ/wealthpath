"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { purchaseAirtime } from "@/lib/actions/transactions"
import { detectNetwork, formatCurrency, type Network } from "@/lib/networks"
import { NetworkSelector } from "@/components/network-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, CheckCircle2, Loader2, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"

const quickAmounts = [1, 2, 5, 10, 20, 50]

type Step = "form" | "confirm" | "processing" | "success" | "failed"

export default function AirtimePage() {
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null)
  const [phone, setPhone] = useState("")
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<Step>("form")
  const [error, setError] = useState("")

  useEffect(() => {
    if (phone.length >= 4) {
      const detected = detectNetwork(phone)
      if (detected && !selectedNetwork) {
        setSelectedNetwork(detected)
      }
    }
  }, [phone, selectedNetwork])

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10)
    setPhone(cleaned)
    setError("")
  }

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    setAmount(cleaned)
    setError("")
  }

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString())
    setError("")
  }

  const validateForm = (): boolean => {
    if (!selectedNetwork) {
      setError("Please select a network")
      return false
    }
    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return false
    }
    const numAmount = Number.parseInt(amount, 10)
    if (!numAmount || numAmount < 1) {
      setError("Minimum airtime amount is GH₵1")
      return false
    }
    if (!user || numAmount > user.walletBalance) {
      setError("Insufficient wallet balance")
      return false
    }
    return true
  }

  const handleProceed = () => {
    if (validateForm()) {
      setStep("confirm")
    }
  }

  const handleConfirm = async () => {
    if (!user || !selectedNetwork) return
    
    setStep("processing")
    
    const numAmount = Number.parseInt(amount, 10)
    
    const result = await purchaseAirtime(
      user.id,
      numAmount,
      phone,
      selectedNetwork.id,
      selectedNetwork.name
    )
    
    if (result.success) {
      await refreshUser()
      setStep("success")
    } else {
      setError(result.error || "Purchase failed")
      setStep("failed")
    }
  }

  const handleDone = () => {
    router.push("/dashboard")
  }

  const handleRetry = () => {
    setStep("form")
  }

  const handleReset = () => {
    setSelectedNetwork(null)
    setPhone("")
    setAmount("")
    setStep("form")
    setError("")
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 pb-20 md:pb-0">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Buy Airtime</h1>
          <p className="text-sm text-muted-foreground">
            Balance: {user ? formatCurrency(user.walletBalance) : "₦0"}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Network</CardTitle>
          <CardDescription>Choose the network provider</CardDescription>
        </CardHeader>
        <CardContent>
          <NetworkSelector selected={selectedNetwork} onSelect={setSelectedNetwork} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recipient Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                placeholder="0241234567"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="pl-10"
                maxLength={10}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (GHS)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                GH₵
              </span>
              <Input
                id="amount"
                type="text"
                inputMode="numeric"
                placeholder="Enter amount"
                value={amount ? Number(amount).toLocaleString() : ""}
                onChange={(e) => handleAmountChange(e.target.value.replace(/,/g, ""))}
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs">Quick select</Label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((value) => (
                <Button
                  key={value}
                  type="button"
                  variant={amount === value.toString() ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleQuickAmount(value)}
                >
                  {formatCurrency(value)}
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleProceed} className="w-full" disabled={!selectedNetwork || !phone || !amount}>
            Continue
          </Button>
        </CardContent>
      </Card>

      <Dialog open={step === "confirm"} onOpenChange={(open) => !open && setStep("form")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              Please verify the details below
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Network</span>
              <span className="font-medium">{selectedNetwork?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Phone Number</span>
              <span className="font-medium">{phone}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">{formatCurrency(Number.parseInt(amount, 10))}</span>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setStep("form")} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleConfirm} className="flex-1">
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={step === "processing"} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Processing Purchase</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we process your airtime purchase...
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={step === "success"} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Purchase Successful!</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {formatCurrency(Number.parseInt(amount, 10))} airtime sent to
            </p>
            <p className="font-medium text-foreground mb-6">{phone}</p>
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
                Buy Again
              </Button>
              <Button onClick={handleDone} className="flex-1">
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={step === "failed"} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Purchase Failed</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Something went wrong. Please try again.
            </p>
            <div className="flex gap-2 w-full">
              <Button variant="outline" onClick={handleDone} className="flex-1 bg-transparent">
                Go Back
              </Button>
              <Button onClick={handleRetry} className="flex-1">
                Retry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

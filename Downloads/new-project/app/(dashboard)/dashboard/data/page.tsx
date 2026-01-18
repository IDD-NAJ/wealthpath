"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { purchaseData } from "@/lib/actions/transactions"
import { dataPlans, detectNetwork, formatCurrency, type Network, type DataPlan } from "@/lib/networks"
import { NetworkSelector } from "@/components/network-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, CheckCircle2, Loader2, Phone, ArrowLeft, Wifi } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Step = "form" | "confirm" | "processing" | "success" | "failed"
type PlanType = "daily" | "weekly" | "monthly" | "mega"

export default function DataPage() {
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null)
  const [phone, setPhone] = useState("")
  const [planType, setPlanType] = useState<PlanType>("monthly")
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

  useEffect(() => {
    setSelectedPlan(null)
  }, [selectedNetwork, planType])

  const filteredPlans = useMemo(() => {
    if (!selectedNetwork) return []
    return dataPlans.filter(
      (plan) => plan.networkId === selectedNetwork.id && plan.type === planType
    )
  }, [selectedNetwork, planType])

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10)
    setPhone(cleaned)
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
    if (!selectedPlan) {
      setError("Please select a data plan")
      return false
    }
    if (!user || selectedPlan.price > user.walletBalance) {
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
    if (!user || !selectedNetwork || !selectedPlan) return
    
    setStep("processing")
    
    const result = await purchaseData(
      user.id,
      selectedPlan.price,
      phone,
      selectedNetwork.id,
      selectedNetwork.name,
      selectedPlan.name,
      selectedPlan.size
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
    setSelectedPlan(null)
    setPhone("")
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
          <h1 className="text-xl font-bold text-foreground">Buy Data</h1>
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
          <CardTitle className="text-lg">Phone Number</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 text-sm rounded-lg bg-destructive/10 text-destructive">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="tel"
              inputMode="numeric"
              placeholder="0241234567"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className="pl-10"
              maxLength={10}
            />
          </div>
        </CardContent>
      </Card>

      {selectedNetwork && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Data Plan</CardTitle>
            <CardDescription>Choose a plan for {selectedNetwork.name}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={planType} onValueChange={(v) => setPlanType(v as PlanType)}>
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="mega">Mega</TabsTrigger>
              </TabsList>

              <TabsContent value={planType} className="mt-4">
                {filteredPlans.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <Wifi className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>No {planType} plans available</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {filteredPlans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left",
                          selectedPlan?.id === plan.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 bg-card"
                        )}
                      >
                        <div>
                          <p className="font-semibold text-foreground">{plan.size}</p>
                          <p className="text-sm text-muted-foreground">{plan.validity}</p>
                        </div>
                        <p className="font-bold text-primary">{formatCurrency(plan.price)}</p>
                      </button>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <Button
              onClick={handleProceed}
              className="w-full"
              disabled={!selectedNetwork || !phone || !selectedPlan}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      )}

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
              <span className="text-muted-foreground">Data Plan</span>
              <span className="font-medium">{selectedPlan?.size}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Validity</span>
              <span className="font-medium">{selectedPlan?.validity}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">{selectedPlan ? formatCurrency(selectedPlan.price) : ""}</span>
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
              Please wait while we process your data purchase...
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
              {selectedPlan?.size} data bundle sent to
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

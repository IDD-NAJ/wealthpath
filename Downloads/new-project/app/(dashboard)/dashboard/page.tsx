"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { getTransactions } from "@/lib/actions/transactions"
import { formatCurrency } from "@/lib/networks"
import { WalletCard } from "@/components/wallet-card"
import { FundWalletModal } from "@/components/fund-wallet-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Wifi, ArrowDownRight, Clock, Loader2 } from "lucide-react"
import { Suspense } from "react"
import Loading from "./loading"

const quickActions = [
  {
    href: "/dashboard/airtime",
    label: "Buy Airtime",
    description: "Instant recharge",
    icon: Phone,
    color: "bg-chart-1/10 text-chart-1",
  },
  {
    href: "/dashboard/data",
    label: "Buy Data",
    description: "All networks",
    icon: Wifi,
    color: "bg-chart-2/10 text-chart-2",
  },
]

interface Transaction {
  id: string
  type: "deposit" | "airtime" | "data"
  amount: number
  status: string
  description: string
  created_at: string
}

export default function DashboardPage() {
  const { user, refreshUser } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [showFundModal, setShowFundModal] = useState(false)
  const [pendingReference, setPendingReference] = useState<string | null>(null)

  // Handle payment callback from Paystack
  useEffect(() => {
    const payment = searchParams.get("payment")
    const reference = searchParams.get("reference")

    if (payment === "callback" && reference) {
      setPendingReference(reference)
      setShowFundModal(true)
      // Clean up URL
      router.replace("/dashboard", { scroll: false })
    }
  }, [searchParams, router])

  // Handle modal close and cleanup
  const handleModalClose = (open: boolean) => {
    setShowFundModal(open)
    if (!open) {
      setPendingReference(null)
      // Refresh transactions after modal closes
      loadTransactions()
      refreshUser()
    }
  }

  const loadTransactions = async () => {
    if (!user) return
    setLoading(true)
    const result = await getTransactions(user.id, 5)
    if (result.success && result.transactions) {
      setTransactions(result.transactions as Transaction[])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadTransactions()
  }, [user])

  return (
    <Suspense fallback={<Loading />}>
      <div className="space-y-6 pb-20 md:pb-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            What would you like to do today?
          </p>
        </div>

        <WalletCard />

        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4">
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{action.label}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            {transactions.length > 0 && (
              <Link href="/dashboard/history">
                <Button variant="ghost" size="sm" className="text-primary">
                  View all
                </Button>
              </Link>
            )}
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="py-8 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="py-8 text-center">
                <Clock className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground">No transactions yet</p>
                <p className="text-sm text-muted-foreground">
                  Your transaction history will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === "deposit"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-chart-1/10 text-chart-1"
                        }`}
                      >
                        {tx.type === "deposit" ? (
                          <ArrowDownRight className="w-5 h-5" />
                        ) : tx.type === "airtime" ? (
                          <Phone className="w-4 h-4" />
                        ) : (
                          <Wifi className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">
                          {tx.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(tx.created_at).toLocaleDateString("en-GH", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold text-sm ${
                          tx.type === "deposit" ? "text-green-500" : "text-foreground"
                        }`}
                      >
                        {tx.type === "deposit" ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </p>
                      <p
                        className={`text-xs capitalize ${
                          tx.status === "success"
                            ? "text-green-500"
                            : tx.status === "pending"
                            ? "text-amber-500"
                            : "text-destructive"
                        }`}
                      >
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fund Wallet Modal for handling payment callbacks */}
        <FundWalletModal
          open={showFundModal}
          onOpenChange={handleModalClose}
          pendingReference={pendingReference}
        />
      </div>
    </Suspense>
  )
}

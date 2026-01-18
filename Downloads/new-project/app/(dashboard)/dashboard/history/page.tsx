"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { getTransactions } from "@/lib/actions/transactions"
import { formatCurrency } from "@/lib/networks"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, ArrowDownRight, Phone, Wifi, Clock, Receipt, Copy, Check, Loader2 } from "lucide-react"

type TransactionType = "deposit" | "airtime" | "data"
type FilterType = "all" | TransactionType

interface Transaction {
  id: string
  type: TransactionType
  amount: number
  status: string
  description: string
  reference: string
  metadata: Record<string, string> | null
  created_at: string
}

export default function HistoryPage() {
  const { user } = useAuth()
  const [filter, setFilter] = useState<FilterType>("all")
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [copied, setCopied] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadTransactions() {
      if (!user) return
      setLoading(true)
      const result = await getTransactions(user.id)
      if (result.success && result.transactions) {
        setTransactions(result.transactions as Transaction[])
      }
      setLoading(false)
    }
    loadTransactions()
  }, [user])

  const filteredTransactions = filter === "all" 
    ? transactions 
    : transactions.filter((tx) => tx.type === filter)

  const handleCopyReference = async (ref: string) => {
    await navigator.clipboard.writeText(ref)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case "deposit":
        return <ArrowDownRight className="w-5 h-5" />
      case "airtime":
        return <Phone className="w-4 h-4" />
      case "data":
        return <Wifi className="w-4 h-4" />
    }
  }

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case "deposit":
        return "bg-success/10 text-success"
      case "airtime":
        return "bg-chart-1/10 text-chart-1"
      case "data":
        return "bg-chart-2/10 text-chart-2"
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 md:pb-0">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Transaction History</h1>
          <p className="text-sm text-muted-foreground">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="deposit">Deposits</TabsTrigger>
          <TabsTrigger value="airtime">Airtime</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
              <p className="text-sm text-muted-foreground">Loading transactions...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="py-12 text-center">
              <Clock className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">No transactions found</p>
              <p className="text-sm text-muted-foreground">
                {filter === "all"
                  ? "Your transaction history will appear here"
                  : `No ${filter} transactions yet`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredTransactions.map((tx) => (
                <button
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${getTransactionColor(tx.type)}`}
                    >
                      {getTransactionIcon(tx.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground line-clamp-1">
                        {tx.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.created_at).toLocaleDateString("en-NG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold text-sm ${
                        tx.type === "deposit" ? "text-success" : "text-foreground"
                      }`}
                    >
                      {tx.type === "deposit" ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </p>
                    <p
                      className={`text-xs capitalize ${
                        tx.status === "success"
                          ? "text-success"
                          : tx.status === "pending"
                          ? "text-warning"
                          : "text-destructive"
                      }`}
                    >
                      {tx.status}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedTx} onOpenChange={(open) => !open && setSelectedTx(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5" />
              Transaction Details
            </DialogTitle>
          </DialogHeader>
          {selectedTx && (
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center py-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${getTransactionColor(selectedTx.type)}`}
                >
                  {getTransactionIcon(selectedTx.type)}
                </div>
                <p
                  className={`text-2xl font-bold ${
                    selectedTx.type === "deposit" ? "text-success" : "text-foreground"
                  }`}
                >
                  {selectedTx.type === "deposit" ? "+" : "-"}
                  {formatCurrency(selectedTx.amount)}
                </p>
                <p
                  className={`text-sm capitalize ${
                    selectedTx.status === "success"
                      ? "text-success"
                      : selectedTx.status === "pending"
                      ? "text-warning"
                      : "text-destructive"
                  }`}
                >
                  {selectedTx.status}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium capitalize">{selectedTx.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Description</span>
                  <span className="font-medium text-right max-w-[200px]">{selectedTx.description}</span>
                </div>
                {selectedTx.metadata?.phone && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Phone</span>
                    <span className="font-medium">{selectedTx.metadata.phone}</span>
                  </div>
                )}
                {selectedTx.metadata?.network && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Network</span>
                    <span className="font-medium capitalize">{selectedTx.metadata.network}</span>
                  </div>
                )}
                {selectedTx.metadata?.planSize && (
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Data Plan</span>
                    <span className="font-medium">{selectedTx.metadata.planSize}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {new Date(selectedTx.created_at).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Reference</span>
                  <button
                    onClick={() => handleCopyReference(selectedTx.reference)}
                    className="flex items-center gap-2 font-mono text-xs bg-muted px-2 py-1 rounded"
                  >
                    {selectedTx.reference.slice(0, 15)}...
                    {copied ? (
                      <Check className="w-3 h-3 text-success" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              <Button onClick={() => setSelectedTx(null)} className="w-full">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

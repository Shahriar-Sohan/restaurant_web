"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  MapPin,
  Clock,
  Star,
} from "lucide-react"
import { useRouter } from "next/navigation"


export function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [orders, setOrders] = useState<Order[]>([]);
  interface Order {
  order_id: number;
  user_id: number;
  total_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  customer: string;
  items: string[];
  time: string;
  location: string;
}

interface MenuItem {
  food_id: number;
  food_name: string;
  category_id: number;
  description: string;
  price: number;
  image: string;
  rating: number;
  prep_time: number;
  calories: number;
  ingredients: string[];
  availability: boolean;
  discount: number;
  orders: number;
}


  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("Failed to fetch menu");
        const data: MenuItem[] = await res.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    router.push("/login")
  }

  const updateOrderStatus = (orderId: number, newStatus: string) => {
    setOrders(orders.map((order) => (order.order_id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "ready":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Zeus Street Admin
              </h1>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Dashboard</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Menu
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">$12,450</p>
                      <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +12% from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">1,247</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +8% from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Customers</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">892</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +15% from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">4.9</p>
                      <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        Excellent rating
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Recent Orders</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Latest customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order) => (
                      <div
                        key={order.order_id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Order ID: {order.order_id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 dark:text-white">${order.total_price.toFixed(2)}</p>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Top Menu Items</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Most popular dishes today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {menuItems.map((item) => (
                      <div
                        key={item.food_id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{item.food_name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.category_id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 dark:text-white">{item.orders} orders</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Order Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Manage and track all customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.order_id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{order.order_id}</h3>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          {new Date(order.created_at).toLocaleString()}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Customer</p>
                          <p className="font-medium text-gray-900 dark:text-white">{order.customer}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Items</p>
                          <p className="font-medium text-gray-900 dark:text-white">{order.items.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                          <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {order.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                          <p className="font-bold text-gray-900 dark:text-white">${order.total_price.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.order_id, value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Tab */}
          <TabsContent value="menu" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">Menu Management</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Add, edit, and manage menu items
                  </CardDescription>
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  onClick={() => router.push("/admin/add-item")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div
                      key={item.food_id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{item.food_name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.category_id}</p>
                            <p className="font-bold text-gray-900 dark:text-white">${item.price}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              item.availability ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }
                          >
                            {item.availability ? "Available" : "out of stock" }
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Customer Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  View and manage customer information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customer Management</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Customer management features will be available here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Restaurant Settings</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Configure restaurant information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-name" className="text-gray-700 dark:text-gray-300">
                      Restaurant Name
                    </Label>
                    <Input
                      id="restaurant-name"
                      defaultValue="Zeus Street Greek"
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="(555) 123-ZEUS"
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700 dark:text-gray-300">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    defaultValue="123 Main Street, Downtown"
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="opening-time" className="text-gray-700 dark:text-gray-300">
                      Opening Time
                    </Label>
                    <Input
                      id="opening-time"
                      type="time"
                      defaultValue="11:00"
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closing-time" className="text-gray-700 dark:text-gray-300">
                      Closing Time
                    </Label>
                    <Input
                      id="closing-time"
                      type="time"
                      defaultValue="22:00"
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    />
                  </div>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

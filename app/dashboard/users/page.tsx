"use client";

import React, { useEffect, useState } from "react";
import { Download, Search, Mail, Phone, Calendar, BadgeCheck, XCircle, Building2, CreditCard, Server, Shield, FileText, MoreHorizontal, Pencil } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/app/components/ui/table";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ProductMetricCard } from "@/app/components/admin/ProductMetricCard";
import { ExportModal } from "@/app/components/admin/ExportModal";

// Static Customer Data
const STATIC_CUSTOMERS = [
    {
        id: "cust_001",
        name: "Jenny Wilson",
        email: "michael.mitc@example.com",
        phone: "+91 98765 43210",
        createdAt: "2025-10-24",
        emailVerified: true,
        _count: { orders: 12 },
        totalSpent: 32150,
        companyLogo: "https://ui-avatars.com/api/?name=Tech+Corp&background=4a439a&color=fff",
        companyName: "Tech Corp Solutions",
        customerRole: "CEO",
        plan: "Business",
        planType: "yearly",
        planStartDate: "2025-01-15",
        planEndDate: "2026-01-15",
        isActivated: true,
        paymentStatus: "paid",
        invoiceUrl: "/invoices/inv-001.pdf",
        vpsCredentials: {
            host: "vps1.techcorp.com",
            username: "admin_techcorp",
            password: "••••••••"
        },
        adminCredentials: {
            username: "jenny.wilson@techcorp.com",
            password: "••••••••"
        }
    },
    {
        id: "cust_002",
        name: "Cameron Williamson",
        email: "bill.sanders@example.com",
        phone: "+91 98765 43211",
        createdAt: "2025-10-22",
        emailVerified: true,
        _count: { orders: 8 },
        totalSpent: 54250,
        companyLogo: "https://ui-avatars.com/api/?name=Digital+Wave&background=059669&color=fff",
        companyName: "Digital Wave Agency",
        customerRole: "CTO",
        plan: "Growth+",
        planType: "monthly",
        planStartDate: "2025-02-01",
        planEndDate: "2025-03-01",
        isActivated: true,
        paymentStatus: "paid",
        invoiceUrl: "/invoices/inv-002.pdf",
        vpsCredentials: {
            host: "vps2.digitalwave.com",
            username: "admin_digitalwave",
            password: "••••••••"
        },
        adminCredentials: {
            username: "cameron.w@digitalwave.com",
            password: "••••••••"
        }
    },
    {
        id: "cust_003",
        name: "Guy Hawkins",
        email: "debra.holt@example.com",
        phone: "+91 98765 43212",
        createdAt: "2025-10-22",
        emailVerified: false,
        _count: { orders: 15 },
        totalSpent: 54450,
        companyLogo: "https://ui-avatars.com/api/?name=Innovate+Labs&background=dc2626&color=fff",
        companyName: "Innovate Labs Inc",
        customerRole: "Founder",
        plan: "Starter",
        planType: "yearly",
        planStartDate: "2025-01-20",
        planEndDate: "2026-01-20",
        isActivated: true,
        paymentStatus: "paid",
        invoiceUrl: "/invoices/inv-003.pdf",
        vpsCredentials: {
            host: "vps3.innovatelabs.com",
            username: "admin_innovate",
            password: "••••••••"
        },
        adminCredentials: {
            username: "guy.hawkins@innovatelabs.com",
            password: "••••••••"
        }
    },
    {
        id: "cust_004",
        name: "Kathryn Murphy",
        email: "felicia.reid@example.com",
        phone: "+91 98765 43213",
        createdAt: "2025-10-21",
        emailVerified: true,
        _count: { orders: 5 },
        totalSpent: 14580,
        companyLogo: "https://ui-avatars.com/api/?name=Cloud+Systems&background=2563eb&color=fff",
        companyName: "Cloud Systems Ltd",
        customerRole: "Product Manager",
        plan: "Business",
        planType: "monthly",
        planStartDate: "2025-02-05",
        planEndDate: "2025-03-05",
        isActivated: true,
        paymentStatus: "pending",
        invoiceUrl: "/invoices/inv-004.pdf",
        vpsCredentials: {
            host: "vps4.cloudsystems.com",
            username: "admin_cloud",
            password: "••••••••"
        },
        adminCredentials: {
            username: "kathryn.m@cloudsystems.com",
            password: "••••••••"
        }
    },
    {
        id: "cust_005",
        name: "Leslie Alexander",
        email: "tim.jennings@example.com",
        phone: "+91 98765 43214",
        createdAt: "2025-10-19",
        emailVerified: true,
        _count: { orders: 20 },
        totalSpent: 14570,
        companyLogo: "https://ui-avatars.com/api/?name=Smart+Solutions&background=7c3aed&color=fff",
        companyName: "Smart Solutions Group",
        customerRole: "Director",
        plan: "Enterprise",
        planType: "yearly",
        planStartDate: "2025-01-10",
        planEndDate: "2026-01-10",
        isActivated: false,
        paymentStatus: "paid",
        invoiceUrl: "/invoices/inv-005.pdf",
        vpsCredentials: {
            host: "vps5.smartsolutions.com",
            username: "admin_smart",
            password: "••••••••"
        },
        adminCredentials: {
            username: "leslie.a@smartsolutions.com",
            password: "••••••••"
        }
    },
    {
        id: "cust_006",
        name: "Dianne Russell",
        email: "willie.jennings@example.com",
        phone: "+91 98765 43215",
        createdAt: "2025-10-18",
        emailVerified: true,
        _count: { orders: 9 },
        totalSpent: 54450,
        companyLogo: "https://ui-avatars.com/api/?name=Next+Gen&background=ea580c&color=fff",
        companyName: "Next Gen Enterprises",
        customerRole: "VP Operations",
        plan: "Growth+",
        planType: "monthly",
        planStartDate: "2025-02-15",
        planEndDate: "2025-03-15",
        isActivated: true,
        paymentStatus: "paid",
        invoiceUrl: "/invoices/inv-006.pdf",
        vpsCredentials: {
            host: "vps6.nextgen.com",
            username: "admin_nextgen",
            password: "••••••••"
        },
        adminCredentials: {
            username: "dianne.r@nextgen.com",
            password: "••••••••"
        }
    }
];

export default function CustomersPage() {
    // State
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [verifiedFilter, setVerifiedFilter] = useState("all");
    const [sortFilter, setSortFilter] = useState("newest");
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [userdata, setUserdata] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingCard, setEditingCard] = useState<string | null>(null);
    const [vpsForm, setVpsForm] = useState({
        host: "",
        username: "",
        password: ""
    });

    const [companyForm, setCompanyForm] = useState({
        email: "",
        phone: "",
    });

    const [adminForm, setAdminForm] = useState({
        username: "",
        password: "",
    });

    // Use static data
    const users = STATIC_CUSTOMERS.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.companyName.toLowerCase().includes(search.toLowerCase());
        const matchesVerified = verifiedFilter === "all" ||
            (verifiedFilter === "verified" && user.emailVerified) ||
            (verifiedFilter === "unverified" && !user.emailVerified);
        return matchesSearch && matchesVerified;
    });

    const pagination = { totalPages: 1, total: users.length };
    // const metrics = {
    //     totalCustomers: STATIC_CUSTOMERS.length,
    //     verifiedCustomers: STATIC_CUSTOMERS.filter(u => u.emailVerified).length,
    //     unverifiedCustomers: STATIC_CUSTOMERS.filter(u => !u.emailVerified).length
    // };

    // Helpers
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const getInitials = (name: string) => {
        if (!name) return "US";
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    const formatDMY = (dateStr: string) => {
        if (!dateStr) return "—";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB");
    };

    const saveVps = async (userId: string, existing: any) => {
        try {
            const endpoint = existing
                ? "/api/vpsdetails"
                : "/api/vpsdetails";

            const method = existing ? "PUT" : "POST";

            const res = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    ...vpsForm
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed");
            }

            setEditingCard(null);

        } catch (err) {
            console.error(err);
        }
    };

    const saveCompany = async (userId: string, existing: any) => {
        console.log(existing, "exiting");
        console.log(userId, "userID");

        const endpoint = existing ? "/api/companydetails" : "/api/companydetails";
        const method = existing ? "PUT" : "POST";

        const res = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, ...companyForm }),
        });

        if (res.ok) setEditingCard(null);
    };

    const saveAdmin = async (userId: string, existing: any) => {
        console.log(existing, "exiting");

        const endpoint = existing ? "/api/admindetails" : "/api/admindetails";
        const method = existing ? "PUT" : "POST";

        const res = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, ...adminForm }),
        });

        if (res.ok) setEditingCard(null);
    };

    useEffect(() => {
        const loadUsers = async () => {
            const res = await fetch("/api/user");
            const data = await res.json();

            console.log("API RESPONSE:", data);

            setUserdata(Array.isArray(data) ? data : data.users || data.data || []);
            setLoading(false);
        };

        loadUsers();
    }, []);

    const normalizedUsers = userdata.map((u: any) => {
        const pkg = u.userPackages?.[0];
        const system = u.system?.[0];
        const admin = u.adminDetails?.[0];
        const company = u.userCompany?.[0];

        // return {
        //     id: u.id,
        //     name: u.name,
        //     email: u.email,
        //     customerRole: u.position,

        //     companyName: u.userCompany?.[0]?.name || "N/A",

        //     plan: pkg?.package?.name || "—",
        //     planType: pkg?.autoRenew ? "monthly" : "yearly",

        //     planStartDate: pkg?.startDate || pkg?.purchasedAt,
        //     planEndDate: pkg?.expiresAt,

        //     emailVerified: pkg?.status === "ACTIVE",

        //     totalSpent: Number(pkg?.paymentAmount || 0),

        //     _count: {
        //         orders: u.userPackages?.length || 0
        //     },

        //     phone: u.userCompany?.[0]?.phone || "—",
        //     createdAt: u.createdAt,

        //     paymentStatus: pkg?.paymentAmount ? "paid" : "pending",

        //     companyLogo: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        //         u.userCompany?.[0]?.name || u.name
        //     )}&background=4a439a&color=fff`,

        //     // VPS
        //     vpsCredentials: system
        //         ? {
        //             host: system.host,
        //             username: system.username,
        //             password: system.password
        //         }
        //         : null,

        //     // Admin
        //     adminCredentials: admin
        //         ? {
        //             username: admin.username,
        //             password: admin.password
        //         }
        //         : null
        // };

        return {
            id: u.id,
            name: u.name,
            email: u.email,
            customerRole: u.position,

            companyName: company?.name || "N/A",
            companyEmail: company?.email || null,

            plan: pkg?.package?.name || "—",
            planType: pkg?.autoRenew ? "monthly" : "yearly",

            planStartDate: pkg?.startDate || pkg?.purchasedAt,
            planEndDate: pkg?.expiresAt,

            emailVerified: pkg?.status === "ACTIVE",
            isActivated: pkg?.status === "ACTIVE",   // ADD THIS

            totalSpent: Number(pkg?.paymentAmount || 0),

            _count: {
                orders: u.userPackages?.length || 0
            },

            phone: company?.phone || null,
            createdAt: u.createdAt,

            paymentStatus: pkg?.paymentAmount ? "paid" : "pending",

            companyLogo: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                u.userCompany?.[0]?.name || u.name
            )}&background=4a439a&color=fff`,

            vpsCredentials: system
                ? {
                    host: system.host,
                    username: system.username,
                    password: system.password
                }
                : null,

            adminCredentials: admin
                ? {
                    username: admin.username,
                    password: admin.password
                }
                : null
        };
    });

    const userslist = normalizedUsers.filter((user: any) => {
        const matchesSearch =
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase()) ||
            user.companyName?.toLowerCase().includes(search.toLowerCase());

        const matchesVerified =
            verifiedFilter === "all" ||
            (verifiedFilter === "verified" && user.emailVerified) ||
            (verifiedFilter === "unverified" && !user.emailVerified);

        return matchesSearch && matchesVerified;
    });

    const metrics = {
        totalCustomers: normalizedUsers.length,
        verifiedCustomers: normalizedUsers.filter(u => u.emailVerified).length,
        unverifiedCustomers: normalizedUsers.filter(u => !u.emailVerified).length
    };

    return (
        <div className="flex-1 max-w-7xl mx-auto w-full p-10">
            <header className="mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Customers</h1>

                        <div className="relative w-full sm:max-w-md mt-2 sm:mt-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <Input
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 h-11 rounded-full border-slate-200 bg-white text-slate-900 focus:ring-[#4a439a]/20"
                            />
                        </div>
                    </div>

                    {/* <div className="flex items-center gap-3 w-full md:w-auto">
                        <button onClick={() => setIsExportModalOpen(true)} className="bg-[#ebe9f1] text-[#5c4da5] px-5 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-[#e2dcf0] transition-colors font-medium flex-1 md:flex-none shadow-sm">
                            <Download size={20} />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                    </div> */}
                </div>
            </header>

            {/* METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full">
                <ProductMetricCard
                    title="Total Customers"
                    value={metrics.totalCustomers}
                    percent={100} isUp={true} data={[5, 10, 15, 20, Math.max(5, metrics.totalCustomers)]}
                />
                <ProductMetricCard
                    title="Activated Accounts"
                    value={metrics.verifiedCustomers}
                    percent={metrics.totalCustomers > 0 ? Math.round((metrics.verifiedCustomers / metrics.totalCustomers) * 100) : 0}
                    isUp={true} data={[2, 4, 8, 12, Math.max(2, metrics.verifiedCustomers)]}
                />
                <ProductMetricCard
                    title="Pending Activations"
                    value={metrics.unverifiedCustomers}
                    percent={metrics.totalCustomers > 0 ? Math.round((metrics.unverifiedCustomers / metrics.totalCustomers) * 100) : 0}
                    isUp={false} data={[10, 8, 6, 4, Math.max(1, metrics.unverifiedCustomers)]}
                />
            </div>

            <Card className="border-slate-200 shadow-sm bg-white rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                    {/* FILTERS & LIMIT */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-5 border-b border-slate-100 gap-4">
                        <p className="text-xl font-semibold text-slate-800">Customer Directory</p>

                        <div className="flex flex-wrap gap-3 w-full md:w-auto">
                            <select value={sortFilter} onChange={(e) => setSortFilter(e.target.value)} className="flex-1 md:flex-none border border-slate-200 bg-white text-slate-700 rounded-lg px-3 py-2 outline-none font-medium text-sm">
                                <option value="newest">Sort: Newest First</option>
                                <option value="orders">Sort: Most Orders</option>
                                <option value="alphabetical">Sort: A-Z</option>
                            </select>

                            <select value={verifiedFilter} onChange={(e) => setVerifiedFilter(e.target.value)} className="flex-1 md:flex-none border border-slate-200 bg-white text-slate-700 rounded-lg px-3 py-2 outline-none font-medium text-sm">
                                <option value="all">All Statuses</option>
                                <option value="verified">Activated Only</option>
                                <option value="unverified">Pending Only</option>
                            </select>

                            <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="border border-slate-200 bg-white text-slate-700 rounded-lg px-3 py-2 outline-none font-medium text-sm">
                                <option value={10}>10 per page</option>
                                <option value={20}>20 per page</option>
                                <option value={50}>50 per page</option>
                            </select>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-slate-50/80 border border-slate-200">
                                <TableRow>
                                    <TableHead className="text-gray-600">Company Name</TableHead>
                                    <TableHead className="text-gray-600">Customer Name</TableHead>
                                    <TableHead className="text-gray-600">Email</TableHead>
                                    <TableHead className="text-gray-600">Plan</TableHead>
                                    <TableHead className="text-gray-600">Plan Type</TableHead>
                                    <TableHead className="text-gray-600">Start Date</TableHead>
                                    <TableHead className="text-gray-600">End Date</TableHead>
                                    <TableHead className="text-gray-600">Status</TableHead>
                                    <TableHead className="text-gray-600">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-12 text-slate-500 font-medium">
                                            Loading customers...
                                        </TableCell>
                                    </TableRow>
                                ) : userslist.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-12 text-slate-500 font-medium">
                                            No customers found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    userslist.map((user: any) => (
                                        <React.Fragment key={user.id}>
                                            <TableRow
                                                key={user.id}
                                                className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                                                onClick={() => setSelectedCustomer(selectedCustomer === user.id ? null : user.id)}
                                            >
                                                {/* Company Logo & Name */}
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            src={user.companyLogo}
                                                            alt={user.companyName}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        <div>
                                                            <p className="font-semibold text-slate-800">{user.companyName}</p>
                                                            <p className="text-xs text-slate-500 font-mono">
                                                                ID: {user.id.substring(user.id.length - 6)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                {/* Customer Name & Role */}
                                                <TableCell>
                                                    <div>
                                                        <p className="font-semibold text-slate-800">{user.name}</p>
                                                        <p className="text-xs text-slate-500">{user.customerRole}</p>
                                                    </div>
                                                </TableCell>

                                                {/* Email */}
                                                <TableCell>
                                                    <span className="text-slate-600 text-sm">{user.email}</span>
                                                </TableCell>

                                                {/* Plan */}
                                                <TableCell>
                                                    <Badge className="bg-purple-100 text-purple-700 border-purple-200 font-medium">
                                                        {user.plan}
                                                    </Badge>
                                                </TableCell>

                                                {/* Plan Type */}
                                                <TableCell>
                                                    <Badge
                                                        className={`${user.planType === "yearly"
                                                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                                            : "bg-blue-100 text-blue-700 border-blue-200"
                                                            } font-medium capitalize`}
                                                    >
                                                        {user.planType}
                                                    </Badge>
                                                </TableCell>

                                                {/* Start Date */}
                                                <TableCell>
                                                    <span className="text-slate-600 text-sm font-medium">
                                                        {formatDMY(user.planStartDate)}
                                                    </span>
                                                </TableCell>

                                                {/* End Date */}
                                                <TableCell>
                                                    <span className="text-slate-600 text-sm font-medium">
                                                        {formatDMY(user.planEndDate)}
                                                    </span>
                                                </TableCell>

                                                {/* Status */}
                                                <TableCell>
                                                    {user.emailVerified ? (
                                                        <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md w-max border border-emerald-100 text-xs font-semibold">
                                                            <BadgeCheck size={14} /> Activated
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md w-max border border-rose-100 text-xs font-semibold">
                                                            <XCircle size={14} /> Pending
                                                        </div>
                                                    )}
                                                </TableCell>

                                                {/* Action */}
                                                <TableCell>
                                                    <Button variant="ghost" size="sm" className="hover:bg-slate-100">
                                                        <MoreHorizontal size={18} className="text-slate-400" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>

                                            {/* Expanded Details Row */}
                                            {selectedCustomer === user.id && (
                                                <TableRow className="bg-slate-50/50">
                                                    <TableCell colSpan={9} className="p-6">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                            {/* Company & Contact Details */}
                                                            <div className="bg-white p-5 rounded-xl border border-slate-200 relative">

                                                                <button
                                                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
                                                                    onClick={() => {
                                                                        if (editingCard === `company-${user.id}`) {
                                                                            setEditingCard(null)
                                                                        } else {
                                                                            setCompanyForm({
                                                                                email: user.email || "",
                                                                                phone: user.phone || ""
                                                                            })
                                                                            setEditingCard(`company-${user.id}`)
                                                                        }
                                                                    }}
                                                                >
                                                                    <Pencil size={16} />
                                                                </button>

                                                                <div className="flex items-center gap-2 mb-4">
                                                                    <Building2 className="text-[#5b4da3]" size={20} />
                                                                    <h3 className="font-bold text-slate-800">Company & Contact</h3>
                                                                </div>

                                                                <div className="space-y-3 text-sm">

                                                                    {/* Email */}
                                                                    <div className="flex items-center gap-2 text-slate-600">
                                                                        <Mail size={14} className="text-slate-400" />

                                                                        {editingCard === `company-${user.id}` ? (
                                                                            <Input
                                                                                className="h-7 text-sm focus-visible:ring-0 focus:ring-0"
                                                                                value={companyForm.email}
                                                                                onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                                                                            />
                                                                        ) : (
                                                                            <span>{user.companyEmail || "—"}</span>
                                                                        )}

                                                                    </div>

                                                                    {/* Phone */}
                                                                    <div className="flex items-center gap-2 text-slate-600">
                                                                        <Phone size={14} className="text-slate-400" />

                                                                        {editingCard === `company-${user.id}` ? (
                                                                            <Input
                                                                                className="h-7 text-sm focus-visible:ring-0 focus:ring-0"
                                                                                value={companyForm.phone}
                                                                                onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                                                                            />
                                                                        ) : (
                                                                            <span>{user.phone || "—"}</span>
                                                                        )}

                                                                    </div>

                                                                    {/* Joined date (read-only) */}
                                                                    <div className="flex items-center gap-2 text-slate-600">
                                                                        <Calendar size={14} className="text-slate-400" />
                                                                        Joined: {formatDate(user.createdAt)}
                                                                    </div>

                                                                    {/* Save button */}
                                                                    {editingCard === `company-${user.id}` && (
                                                                        <div className="flex justify-center w-full">
                                                                            <Button
                                                                                size="sm"
                                                                                className="mt-3 bg-blue-500 "
                                                                                onClick={() => saveCompany(user.id, user.phone || user.companyEmail || null)}
                                                                            >
                                                                                Save
                                                                            </Button>
                                                                        </div>
                                                                    )}

                                                                </div>
                                                            </div>

                                                            {/* Plan Details */}
                                                            <div className="bg-white p-5 rounded-xl border border-slate-200">
                                                                <div className="flex items-center gap-2 mb-4">
                                                                    <CreditCard className="text-emerald-600" size={20} />
                                                                    <h3 className="font-bold text-slate-800">Plan Details</h3>
                                                                </div>
                                                                <div className="space-y-2 text-sm">
                                                                    <div className="flex justify-between">
                                                                        <span className="text-slate-500">Total Spent:</span>
                                                                        <span className="font-semibold text-slate-800">
                                                                            {formatCurrency(user.totalSpent)}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="text-slate-500">Orders:</span>
                                                                        <Badge className="bg-blue-50 text-blue-700 border-blue-100">
                                                                            {user._count.orders} Orders
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-slate-500">Activated:</span>
                                                                        <Badge
                                                                            className={
                                                                                user.isActivated
                                                                                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                                                                    : "bg-red-100 text-red-700 border-red-200"
                                                                            }
                                                                        >
                                                                            {user.isActivated ? "Yes" : "No"}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Payment Details */}
                                                            <div className="bg-white p-5 rounded-xl border border-slate-200">
                                                                <div className="flex items-center gap-2 mb-4">
                                                                    <FileText className="text-amber-600" size={20} />
                                                                    <h3 className="font-bold text-slate-800">
                                                                        Payment Details
                                                                    </h3>
                                                                </div>
                                                                <div className="space-y-2 text-sm">
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-slate-500">Status:</span>
                                                                        <Badge
                                                                            className={
                                                                                user.paymentStatus === "paid"
                                                                                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                                                                    : "bg-amber-100 text-amber-700 border-amber-200"
                                                                            }
                                                                        >
                                                                            {user.paymentStatus}
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-slate-500">Invoice:</span>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            className="h-7 text-xs border-slate-300"
                                                                        >
                                                                            <Download size={14} className="mr-1" />
                                                                            Download
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* VPS Credentials */}
                                                            <div className="bg-white p-5 rounded-xl border border-slate-200 relative">

                                                                {/* Edit Icon */}
                                                                <button
                                                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
                                                                    onClick={() =>
                                                                        setEditingCard(editingCard === `vps-${user.id}` ? null : `vps-${user.id}`)
                                                                    }
                                                                >
                                                                    <Pencil size={16} />
                                                                </button>

                                                                <div className="flex items-center gap-2 mb-4">
                                                                    <Server className="text-blue-600" size={20} />
                                                                    <h3 className="font-bold text-slate-800">VPS Credentials</h3>
                                                                </div>

                                                                <div className="space-y-2 text-sm">

                                                                    <div>
                                                                        <span className="text-slate-500 block mb-1">Host:</span>

                                                                        {editingCard === `vps-${user.id}` ? (
                                                                            <Input onChange={(e) =>
                                                                                setVpsForm({ ...vpsForm, host: e.target.value })
                                                                            } className="text-gray-800 focus:ring-0 focus-visible:ring-0 focus:outline-none" defaultValue={user.vpsCredentials?.host || ""} />
                                                                        ) : (
                                                                            <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono block text-gray-800">
                                                                                {user.vpsCredentials?.host || "—"}
                                                                            </code>
                                                                        )}

                                                                    </div>

                                                                    <div>
                                                                        <span className="text-slate-500 block mb-1">Username:</span>

                                                                        {editingCard === `vps-${user.id}` ? (
                                                                            <Input onChange={(e) =>
                                                                                setVpsForm({ ...vpsForm, username: e.target.value })
                                                                            } className="text-gray-800 focus:ring-0 focus-visible:ring-0 focus:outline-none" defaultValue={user.vpsCredentials?.username || ""} />
                                                                        ) : (
                                                                            <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono block text-gray-800">
                                                                                {user.vpsCredentials?.username || "—"}
                                                                            </code>
                                                                        )}

                                                                    </div>

                                                                    <div>
                                                                        <span className="text-slate-500 block mb-1">Password:</span>

                                                                        {editingCard === `vps-${user.id}` ? (
                                                                            <Input onChange={(e) =>
                                                                                setVpsForm({ ...vpsForm, password: e.target.value })
                                                                            } className="text-gray-800 focus:ring-0 focus-visible:ring-0 focus:outline-none" defaultValue={user.vpsCredentials?.password || ""} />
                                                                        ) : (
                                                                            <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono block text-gray-800">
                                                                                {user.vpsCredentials?.password || "—"}
                                                                            </code>
                                                                        )}

                                                                    </div>
                                                                    {editingCard === `vps-${user.id}` && (
                                                                        <div className="flex justify-center w-full">
                                                                            <Button
                                                                                className="mt-3 bg-blue-500 "
                                                                                size="sm"
                                                                                onClick={() => saveVps(user.id, user.vpsCredentials.username || user.vpsCredentials.password || null)}
                                                                            >
                                                                                Save
                                                                            </Button>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                            </div>

                                                            {/* Admin Credentials */}
                                                            <div className="bg-white p-5 rounded-xl border border-slate-200 relative">

                                                                <button
                                                                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
                                                                    onClick={() => {
                                                                        if (editingCard === `admin-${user.id}`) {
                                                                            setEditingCard(null)
                                                                        } else {
                                                                            setAdminForm({
                                                                                username: user.adminCredentials?.username || "",
                                                                                password: user.adminCredentials?.password || ""
                                                                            })
                                                                            setEditingCard(`admin-${user.id}`)
                                                                        }
                                                                    }}
                                                                >
                                                                    <Pencil size={16} />
                                                                </button>

                                                                <div className="flex items-center gap-2 mb-4">
                                                                    <Shield className="text-purple-600" size={20} />
                                                                    <h3 className="font-bold text-slate-800">Admin Credentials</h3>
                                                                </div>

                                                                <div className="space-y-3 text-sm">

                                                                    {/* Username */}
                                                                    <div>
                                                                        <span className="text-slate-500 block mb-1">
                                                                            Username:
                                                                        </span>

                                                                        {editingCard === `admin-${user.id}` ? (
                                                                            <Input
                                                                                className="h-7 text-sm focus-visible:ring-0 focus:ring-0 text-gray-800"
                                                                                value={adminForm.username}
                                                                                onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                                                                            />
                                                                        ) : (
                                                                            <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono block text-gray-800">
                                                                                {user.adminCredentials?.username || "—"}
                                                                            </code>
                                                                        )}

                                                                    </div>

                                                                    {/* Password */}
                                                                    <div>
                                                                        <span className="text-slate-500 block mb-1">
                                                                            Password:
                                                                        </span>

                                                                        {editingCard === `admin-${user.id}` ? (
                                                                            <Input
                                                                                className="h-7 text-sm focus-visible:ring-0 focus:ring-0 text-gray-800"
                                                                                value={adminForm.password}
                                                                                onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                                                                            />
                                                                        ) : (
                                                                            <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono block text-gray-800">
                                                                                {user.adminCredentials?.password || "—"}
                                                                            </code>
                                                                        )}

                                                                    </div>

                                                                    {/* Save */}
                                                                    {editingCard === `admin-${user.id}` && (
                                                                        <div className="flex justify-center w-full">
                                                                            <Button
                                                                                size="sm"
                                                                                className="mt-3 bg-blue-500 "
                                                                                onClick={() => saveAdmin(user.id, user.adminCredentials?.username || user.adminCredentials?.password || null)}
                                                                            >
                                                                                Save
                                                                            </Button>
                                                                        </div>
                                                                    )}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </React.Fragment>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* PAGINATION */}
                    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50 gap-4">
                        <p className="text-sm text-slate-500 font-medium">
                            Showing page <span className="text-slate-800 font-bold">{page}</span> of <span className="text-slate-800 font-bold">{pagination.totalPages}</span>
                            <span className="hidden sm:inline"> ({pagination.total} total customers)</span>
                        </p>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button variant="outline" className="flex-1 sm:flex-none bg-white border-slate-200 text-slate-700 hover:bg-slate-100 font-medium" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
                                Previous
                            </Button>
                            <Button variant="outline" className="flex-1 sm:flex-none bg-white border-slate-200 text-slate-700 hover:bg-slate-100 font-medium" disabled={page >= pagination.totalPages} onClick={() => setPage(p => p + 1)}>
                                Next
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                type="customers"
            />
        </div>
    );
}
import { useState, useEffect } from 'react';
import './adminDashboard.css'
import { LuBell, LuPlus, LuRefreshCcw } from 'react-icons/lu';
import { MdOutlineLocalShipping, MdOutlinePeopleAlt } from 'react-icons/md';
import { GrView } from "react-icons/gr";
import { FiAlertTriangle } from "react-icons/fi";
import stackGrowArrow from '../assets/wwwwww.webp'
import { FaRegCheckCircle } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import { LuBox } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { LuFactory } from "react-icons/lu";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaXmark } from "react-icons/fa6";


const dummyData = {
    overviewStats: [
        {
            id: 1,
            title: 'Total Orders',
            value: '1,250',
            change: '24% last month',
            icon: <AiOutlineShoppingCart className="text-red-500 text-2xl" />,
        },
        {
            id: 2,
            title: 'Total Shipped',
            value: '986',
            change: '15% last month',
            icon: <MdOutlineLocalShipping className="text-red-500 text-2xl" />,
        },
        {
            id: 3,
            title: 'Total Complete',
            value: '923',
            change: '10% last month',
            icon: <FaRegCheckCircle className="text-red-500 text-2xl" />,
        },
        {
            id: 4,
            title: 'Total Customers',
            value: '156',
            change: '5% last month',
            icon: <MdOutlinePeopleAlt className="text-red-500 text-2xl" />,
        },
    ],
    recentOrders: [
        {
            id: 'ORD-001',
            customer: 'ABC Construction',
            product: 'PVC Pipes 100mm x 5m',
            date: '2024-01-15',
            status: 'Processing',
            color: 'High',
        },
        {
            id: 'ORD-002',
            customer: 'XYZ Supplies',
            product: 'Steel Pipes 50mm x 10m',
            date: '2024-01-14',
            status: 'Shipped',
            color: 'Medium',
        },
        {
            id: 'ORD-003',
            customer: 'BuildTech LLC',
            product: 'Copper Pipes 75mm x 7m',
            date: '2024-01-13',
            status: 'Completed',
            color: 'Low',
        },
        {
            id: 'ORD-004',
            customer: 'Metro Pipes Co.',
            product: 'Steel Pipes 100mm x 300m',
            date: '2024-01-12',
            status: 'Processing',
            color: 'High',
        },
    ],
    newOrders: [
        {
            id: 'ORD-021',
            customer: 'Customer 722',
            product: 'Mixed Pipes Order',
            time: '1 min ago',
            amount: '$10521',
            color: 'Low',
        },
        {
            id: 'ORD-022',
            customer: 'Customer 742',
            product: 'Mixed Pipes Order',
            time: '2 min ago',
            amount: '$46817',
            color: 'Medium',
        },
        {
            id: 'ORD-023',
            customer: 'Customer 765',
            product: 'Mixed Pipes Order',
            time: '3 min ago',
            amount: '$22317',
            color: 'Urgent',
        },
        {
            id: 'ORD-024',
            customer: 'Techbuild Solutions',
            product: 'Mixed Pipes Order',
            time: '2 minutes ago',
            amount: '$18,500',
            color: 'High',
        },
        {
            id: 'ORD-025',
            customer: 'Modern Construction',
            product: 'Mixed Pipes Order',
            time: '15 minutes ago',
            amount: '$9,200',
            color: 'Medium',
        },
    ],
    LowStockItems: [
        {
            id: 'ITM-001',
            name: 'Steel Pipes 6mm',
            stock: '1 / Max 20',
            item: 'steel',
            stage: 'critical'
        },
        {
            id: 'ITM-002',
            name: 'PVC Pipes 10mm',
            stock: '5 / Max 25',
            item: 'pvc',
            stage: 'critical'
        },
        {
            id: 'ITM-003',
            name: 'Copper Pipes 8mm',
            stock: '10 / Max 30',
            item: 'copper',
            stage: 'critical'
        },
        {
            id: 'ITM-004',
            name: 'Aluminium Pipes 10mm',
            stock: '12 / Max 40',
            item: 'aluminum',
            stage: 'critical'
        },
    ],
    recentDeliveries: [
        {
            id: 'DEL-001',
            customer: 'Platinum Construction',
            product: 'Steel Pipes Bundle',
            date: '2024-01-15',
            amount: '$15,400',
            status: 'Delivered',
        },
        {
            id: 'DEL-002',
            customer: 'Urban Developers',
            product: 'PVC Pipes Lot',
            date: '2024-01-15',
            amount: '$8,750',
            status: 'Delivered',
        },
        {
            id: 'DEL-003',
            customer: 'Industrial Works',
            product: 'Copper Pipes',
            date: '2024-01-15',
            amount: '$12,300',
            status: 'Delivered',
        },
    ],
};


const AdminDashboard = () => {

    const [sideBar, setSideBar] = useState(true)
    const [listColor, setListColor] = useState(0)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 900) {
                setSideBar(false)
            } else {
                setSideBar(true)
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    return (
        <>
            <div className="admin-dashboard-main-container">        
                <div className={`${sideBar ? "sidebar" : 'reduce-sidebar'}`} style={{ display: sideBar ? "block" : "none" }} >
                    <div className="sidebar-header">
                        <LuFactory className="factory-icon" />
                        <div style={{ display: sideBar ? "block" : "none" }}>
                            <h3>Admin Dashboard</h3>
                            <p>Pipes Manufacturing</p>
                        </div>
                        {/*   <div className="open-close-arrow">
                                <FaAnglesLeft
                                    style={{ display: sideBar ? "block" : "none" }}
                                    onClick={() => setSideBar(false)}
                                />
                                <FaAnglesRight
                                    style={{ display: !sideBar ? "block" : "none" }}
                                    onClick={() => setSideBar(true)}
                                />
                            </div>   */}
                        <FaXmark onClick={() => setSideBar(false)} className="close-sidebar" />
                    </div>
                    <ul className="nav-menu">
                        <li className={`nav-item ${listColor === 0 ? 'redbg' : ''}`}
                            onClick={() => setListColor(0)}
                        >
                            <MdOutlineDashboard className="dashboard-icon" />
                            <span style={{ display: sideBar ? "block" : "none" }}>Dashboard</span>
                        </li>
                        <li className={`nav-item ${listColor === 1 ? 'redbg' : ''}`}
                            onClick={() => setListColor(1)}
                        >
                            <BsBoxSeam className="items-icon" />
                            <span style={{ display: sideBar ? "block" : "none" }}>Items Management</span>
                        </li>
                        <li className={`nav-item ${listColor === 2 ? 'redbg' : ''}`}
                            onClick={() => setListColor(2)}
                        >
                            <CiDeliveryTruck className="order-tracking-icon" />
                            <span style={{ display: sideBar ? "block" : "none" }}>Order Tracking</span>
                        </li>
                        <li className={`nav-item ${listColor === 3 ? 'redbg' : ''}`}
                            onClick={() => setListColor(3)}
                        >
                            <GoPeople className="staff-manage-icon" />
                            <span style={{ display: sideBar ? "block" : "none" }}> Staff Management</span>
                        </li>
                    </ul>

                </div>

                <div className="admin-dashboard-container">

                    <header className="admin-dashboard-header">
                        <div className="header-left-section">
                            <div className="header-title">
                                <BiMenuAltLeft onClick={() => setSideBar(true)} className="open-sidebar" />
                                Admin Dashboard
                            </div>
                            <p className="header-description">Overview of your pipes manufacturing operations</p>
                        </div>
                        <div className="header-right-section">
                            <button className="header-button-add">
                                <LuPlus className="mr-2" /> Add Item
                            </button>
                            <button className="header-button-secondary">
                                <GrView />
                                View Orders
                            </button>
                            <button className="header-button-refresh">
                                <LuRefreshCcw />
                                Refresh
                            </button>
                        </div>
                    </header>

                    <main className="main-content">
                        
                        <div className="alert-box alert-yelLow">
                            <div className="alert-box-content">
                                <FiAlertTriangle className="alert-box-icon" />
                                <div>
                                    <p className="alert-box-title">Critical Stock Alert</p>
                                    <div className="alert-box-text">4 item(s) are critically Low on stock and need immediate restocking.
                                        <span className="alert-box-link">Manage Inventory →<div></div></span></div>
                                </div>
                            </div>
                        </div>

                        
                        <div className="alert-box alert-blue">
                            <div className="alert-box-content">
                                <LuBell className="alert-box-icon" />
                                <div>
                                    <p className="alert-box-title">New Orders (5)</p>
                                    <div className="alert-box-text">You have 5 new order(s) in the last 24 hours that require attention.
                                        <span className="alert-box-link">View Orders →<div></div></span></div>
                                </div>
                            </div>
                        </div>
                        <div className="alert-blue-last-updated"><span>Last updated: 5:43:05 PM</span><p></p></div>

                        
                        <div className="overview-stats-grid">
                            {dummyData.overviewStats.map((stat) => (
                                <div key={stat.id} className="stat-card">
                                    <div>
                                        <p className="stat-card-title">{stat.title}</p>
                                        <p className="stat-card-value">{stat.value}</p>
                                        <p className="stat-card-change">
                                            <img src={stackGrowArrow} />
                                            {stat.change}
                                        </p>
                                    </div>
                                    <div className="stat-card-icon">{stat.icon}</div>
                                </div>
                            ))}
                        </div>

                        
                        <div className="section-grid">
                            
                            <div className="section-card recent-orders-section">
                                <div className="section-header">
                                    <div className="section-title-container">
                                        <LuBox className="left-section-icon " style={{ color: "red" }} />
                                        <h2 className="section-title">Recent Orders</h2>
                                    </div>
                                    <FiArrowRight className="right-section-icon" />
                                </div>
                                <div>
                                    {dummyData.recentOrders.map((order) => (
                                        <div key={order.id} className="item-list-entry recent-orders-lists">
                                            <div>
                                                <div className="item-id">{order.id} <span className={`item-color-indicator ${order.color === 'Medium' ? 'color-Medium' :
                                                    order.color === 'Low' ? 'color-Low' : 'color-High'
                                                    }`}>{order.color}</span></div>
                                                <p className="item-customer">{order.customer}</p>
                                                <p className="item-detail-extra">{order.product}</p>
                                                <p className="item-detail-extra date-time"><FaRegClock />{order.date}</p>
                                            </div>
                                            <div className="status-badge-for-recent-orders">
                                                <span className={`status-badge ${order.status === 'Processing' ? 'status-processing' :
                                                    order.status === 'Shipped' ? 'status-shipped' :
                                                        'status-completed'
                                                    }`}>
                                                    {order.status}

                                                </span>
                                                <FaArrowUpRightFromSquare />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="section-card new-orders-section">
                                <div className="section-header">
                                    <div className="section-title-container">
                                        <LuBell className="left-section-icon" style={{ color: "blue" }} />
                                        <h2 className="section-title">New Orders (24h)</h2>
                                    </div>
                                    <div className="no-of-items" style={{ background: "#6489f092" }}>
                                        5
                                    </div>
                                </div>
                                <div>
                                    {dummyData.newOrders.map((order) => (
                                        <div key={order.id} className="item-list-entry new-orders-lists">
                                            <div>
                                                <div className="item-id">{order.id} <span className={`item-color-indicator ${order.color === 'Medium' ? 'color-Medium' :
                                                    order.color === 'Urgent' ? 'color-Urgent' : order.color === "Low" ? "color-Low" :
                                                        'color-High' 
                                                    }`}>{order.color}</span></div>
                                                <p className="item-customer">{order.customer}</p>
                                                <p className="item-detail-extra">{order.product}</p>
                                                <p className="item-detail-extra date-time"><FaRegClock />{order.time}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="new-order-amount">{order.amount}</p>
                                                <button className="new-order-view-button"><GrView />View</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-1 lg:col-span-1 flex flex-col gap-6">
                                <div className="section-card flex-grow Low-stock-section">
                                    <div className="section-header">
                                        <div className="section-title-container">
                                            <FiAlertTriangle className="left-section-icon" style={{ color: "#facc15" }} />
                                            <h2 className="section-title">Low Stock Items</h2>
                                        </div>

                                        <div className="no-of-items" style={{ background: "#fedc5589" }}>
                                            4
                                        </div>
                                    </div>
                                    <div>
                                        {dummyData.LowStockItems.map((item) => (
                                            <div key={item.id} className="item-list-entry Low-stock-lists">
                                                <div>
                                                    <div className="item-id">{item.id} <span className="item-color-indicator item-color"
                                                    >{item.item}</span></div>
                                                    <p className="item-customer">{item.name}</p>
                                                    <p className="item-detail-extra">{item.stock}</p>
                                                </div>
                                                <div>
                                                    <span className="low-stock-stage">{item.stage}</span>
                                                    <button className="Low-stock-restock-button">
                                                        <LuPlus className="mr-1" /> Restock
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="section-card flex-grow recent-deliveries-section">
                                    <div className="section-header">
                                        <div className="section-title-container">
                                            <FaRegCheckCircle className="left-section-icon" style={{ color: "green" }} />
                                            <h2 className="section-title">Recent Deliveries</h2>
                                        </div>
                                        <FiArrowRight className="section-icon" />
                                    </div>
                                    <div>
                                        {dummyData.recentDeliveries.map((delivery) => (
                                            <div key={delivery.id} className="item-list-entry recent-deliveries-lists">
                                                <div>
                                                    <p className="item-id">{delivery.id}<span className="item-color-indicator delivery-status"
                                                    >{delivery.status}</span></p>
                                                    <p className="item-customer">{delivery.customer}</p>
                                                    <p className="item-detail-extra">{delivery.product}</p>
                                                    <p className="item-detail-extra date-time"><FaRegClock />{delivery.date}</p>
                                                </div>
                                                <div className="text-right-for-delivery">
                                                    <p className="delivery-amount">{delivery.amount}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
